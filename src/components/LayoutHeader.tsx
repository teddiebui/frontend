import { useAuth } from "@/auth/AuthContext";
import { useEmployee } from "@/hooks/useEmployee";
import { updateTime, useNow } from "@/hooks/useNow";
import type { StatusLogDTO } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const pageTitles: Array<{ match: string; title: string }> = [
    { match: '/today-staff', title: 'Bảng Điều Khiển' },
    { match: '/today-ticket', title: 'Ticket hôm nay' },
    { match: '/ticket', title: 'Quản Lý Ticket' },
    { match: '/customer', title: 'Người Dùng' },
    { match: '/performance', title: 'Hiệu Suất' },
    { match: '/report', title: 'Báo Cáo' },
    { match: '/setting', title: 'Nhân viên' },
];

function getPageTitle(pathname: string): string {
    const matchedPage = pageTitles.find(({ match }) => pathname.startsWith(match));
    return matchedPage?.title || 'Bảng Điều Khiển';
}


export function LayoutHeader() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    const currentPageTitle = getPageTitle(location.pathname);
    const { employeeOnlineStatus, updateOnlineStatus } = useEmployee();
    const { user } = useAuth();
    const handleUpdateOnlineStatus = (status: 'online' | 'away') => {
        const statusLog: StatusLogDTO = {
            username: user?.username || '',
            status: {
                id: status === 'online' ? 1 : 2,
                name: status === 'online' ? 'Online' : 'Away',
            },
            from: new Date().toISOString(),
        }

        updateOnlineStatus.mutate(statusLog, {
            onError: (error) => toast.error(error.message || 'Cập nhật trạng thái thất bại'),
            onSuccess: (data, variables, onMutateResult, context) => toast.success(data.message || 'Cập nhật trạng thái thành công'),
        });
    }

    useEffect(() => {
        // if online status is error
        employeeOnlineStatus.isError && toast.error(employeeOnlineStatus.error?.message || 'Không thể lấy trạng thái online');
    }, [employeeOnlineStatus.isError, employeeOnlineStatus.error]);
    // add clock timer

    const now = useNow();
    // useEffect(() => {
        // const updateTime = ( ) => {
        //     const now = new Date();
        //     const currentDate = now.toLocaleDateString('vi-VN');
        //     const currentTime = now.toLocaleTimeString('vi-VN', { hour12: false });
        //     document.getElementById('currentDate')!.textContent = `${currentDate} ${currentTime}`;
        // }

    //     const intervalId = setInterval(updateTime, 1000);
    //     updateTime(); // call immediately to show time without delay

    //     return () => {
    //         clearInterval(intervalId);
    //     }
    // }, []);

    return (
        <>
            <header className="page-header" >
                <div className="header-left">
                    <button className="btn-toggle-sidebar d-lg-none" id="showSidebar">
                        <i className="bi bi-list"></i>
                    </button>
                    <h2>{currentPageTitle}</h2>
                </div>
                <div className="header-right">
                    <div className="date-time">
                        <i className="bi bi-calendar3"></i>
                        <span id="currentDate">{updateTime(now)}</span>
                    </div>

                    <div className="status-dropdown dropdown">
                        <button className="dropdown-toggle" type="button" id="statusDropdown" aria-expanded="false" data-bs-toggle="dropdown">
                            <span className={`status-indicator ${employeeOnlineStatus.data?.status.name.toLowerCase() || 'away'}`}></span>
                            <span id="currentStatusText">{employeeOnlineStatus.data?.status.name === 'online' ? 'Online' : 'Away'}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="statusDropdown">
                            <li><button className="dropdown-item" type="button" data-status-id="1"
                                onClick={() => handleUpdateOnlineStatus('online')}
                            >Online</button></li>
                            <li><button className="dropdown-item" type="button" data-status-id="2"
                                onClick={() => handleUpdateOnlineStatus('away')}
                            >Away</button></li>
                        </ul>
                    </div>


                    <div className="language-dropdown dropdown">
                        <button className="dropdown-toggle" type="button" id="languageDropdown" aria-expanded="false" data-bs-toggle="dropdown">
                            <span id="currentLanguage">VI</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                            <li><button className="dropdown-item" type="button" onClick={() => console.log('VI')}>VI</button></li>
                            <li><button className="dropdown-item" type="button" onClick={() => console.log('EN')}>EN</button></li>
                        </ul>
                    </div>



                    <div className="user-dropdown dropdown">
                        <button className="dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="img/profile-placeholder.jpg" alt="User Avatar" className="user-avatar" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><button className="dropdown-item" type="button" id="user-profile-button"><i className="bi bi-person"></i>
                                Hồ sơ</button></li>
                            <li><button className="dropdown-item" type="button" id="setting-button"><i className="bi bi-gear"></i> Cài
                                đặt</button></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><button className="dropdown-item" type="button" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Đăng
                                xuất</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}