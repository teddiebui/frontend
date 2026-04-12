import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { Toaster } from "sonner";
import { useAuth } from "@/auth/AuthContext";

interface SidebarItem {
  to: string;
  label: string;
  iconClassName: string;
}

interface SidebarSection {
  title: string;
  label: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'BẢNG ĐIỀU KHIỂN',
    label: 'Theo dõi thời gian thực',
    items: [
      { to: '/today-staff', label: 'Bảng Điều Khiển', iconClassName: 'bi bi-speedometer2' },
      { to: '/today-ticket', label: 'Ticket hôm nay', iconClassName: 'bi bi-ticket-perforated' },
    ],
  },
  {
    title: 'DỮ LIỆU',
    label: 'Quản lý & tra cứu dữ liệu',
    items: [
      { to: '/ticket', label: 'Quản Lý Ticket', iconClassName: 'bi bi-ticket-perforated' },
      { to: '/customer', label: 'Người Dùng', iconClassName: 'bi bi-people' },
    ],
  },
  {
    title: 'BÁO CÁO',
    label: 'Phân tích xu hướng & dữ liệu',
    items: [
      { to: '/performance', label: 'Hiệu Suất', iconClassName: 'bi bi-graph-up' },
      { to: '/report', label: 'Báo Cáo', iconClassName: 'bi bi-bar-chart' },
    ],
  },
  {
    title: 'CÀI ĐẶT',
    label: 'Cấu hình hệ thống',
    items: [
      { to: '/setting', label: 'Nhân viên', iconClassName: 'bi bi-person-badge' },
    ],
  },
];

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

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPageTitle = getPageTitle(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="page-content">
      {/* <!-- Sidebar --> */}
      <div className="sidebar" id="sidebar">

        <div className="sidebar-header">
          <div className="logo">
            <i className="bi bi-shield-plus"></i>
            <span>Help Desk</span>
          </div>
          <button className="btn-toggle-sidebar d-lg-none" id="toggleSidebar">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <ul className="sidebar-menu">
          {sidebarSections.map((section) => (
            <li key={section.title}>
              <div className="sidebar-heading">
                <div className="title">{section.title}</div>
                <div className="label">{section.label}</div>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                      <i className={item.iconClassName}></i>
                      <span>{item.label}</span>
                      <i className="bi bi-arrow-right-short"></i>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* <!-- Header --> */}
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
            <span id="currentDate">--/--/----</span>
          </div>

          <div className="status-dropdown dropdown">
            <button className="dropdown-toggle" type="button" id="statusDropdown" aria-expanded="false" data-bs-toggle="dropdown">
              <span className="status-indicator online"></span>
              <span id="currentStatusText">Online</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="statusDropdown">
              <li><button className="dropdown-item" type="button" data-status-id="1">Online</button></li>
              <li><button className="dropdown-item" type="button" data-status-id="2">Away</button></li>
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


      {/* <!-- Main Content --> */}
      <Outlet />

      {/* <!-- Footer --> */}
      <footer className="footer mt-auto py-3 text-center">
        <span>&copy; 2025 Thiên An Phú - Customer Help Desk</span>
      </footer>


      <Toaster />

    </div>
  );
}