import { MyDialog } from "@/components/MyDialog";
import { useTicket } from "@/hooks/useTicket";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function TodayTicket() {
    const { dashboardQuery } = useTicket();
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    // ✅ derive data trực tiếp
    const data = dashboardQuery.data?.slice(0, 10) ?? [];

    const metrics = useMemo(() => {
        return {
            total: data.length,
            inProgress: data.filter(t => t.progressStatus.code === 'pending').length,
            onHold: data.filter(t => t.progressStatus.code === 'on-hold').length,
            resolved: data.filter(t => t.progressStatus.code === 'resolved').length,
        };
    }, [data]);

    useEffect(() => {
        console.log("selectedTicketId changed:", selectedTicketId);

    }, [selectedTicketId]);

    // ✅ chỉ handle error
    useEffect(() => {
        if (dashboardQuery.isError) {
            toast.error(
                dashboardQuery.error?.message ||
                'Không thể tải dữ liệu ticket hôm nay'
            );
        }
    }, [dashboardQuery.isError]);


    const handleRefreshDashboard = useCallback(() => {
        console.log('Refreshing dashboard...');
        dashboardQuery.refetch();
        setLastUpdated(new Date().toLocaleTimeString());
    }, [dashboardQuery]);

    const handleDialogOpenChange = useCallback((nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            setSelectedTicketId(null);
        }
    }, []);

    const [now, setNow] = useState<number>(new Date().getTime());
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date().getTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const startElapsedTimer = (now: number, createdAt: number) => {
        let ms = now - createdAt;
        ms = ms < 0 ? 0 : ms;

        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="dashboard-content page-main-content d-flex flex-column">
            {/* Ticket Section */}
            <div className="h-100 flex-grow-1 d-flex flex-column" id="ticketSection">
                {/* Ticket Metrics */}
                <div id="ticket-metrics" className="row">
                    <div className="col">
                        <div className="metric-card total-tickets">
                            <div className="metric-icon">
                                <i className="bi bi-ticket-perforated-fill"></i>
                            </div>
                            <div className="metric-info">
                                <h4 className="metric-title">Tổng Ticket</h4>
                                <p className="metric-value" id="totalTickets">{metrics.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="metric-card in-progress">
                            <div className="metric-icon">
                                <i className="bi bi-hourglass-split"></i>
                            </div>
                            <div className="metric-info">
                                <h4 className="metric-title">Đang Xử Lý</h4>
                                <p className="metric-value" id="inProgressTickets">{metrics.inProgress}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="metric-card on-hold">
                            <div className="metric-icon">
                                <i className="bi bi-pause-circle-fill"></i>
                            </div>
                            <div className="metric-info">
                                <h4 className="metric-title">Đang Chờ</h4>
                                <p className="metric-value" id="onHoldTickets">{metrics.onHold}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="metric-card resolved">
                            <div className="metric-icon">
                                <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="metric-info">
                                <h4 className="metric-title">Đã Xử Lý</h4>
                                <p className="metric-value" id="resolvedTickets">{metrics.resolved}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="metric-card refresh-container">
                            <button className="btn-refresh" id="refreshDashboardTicket" onClick={handleRefreshDashboard}>
                                <i className="bi bi-arrow-clockwise"></i>
                                <span>Làm Mới</span>
                            </button>
                            <p className="last-updated">
                                <small>Cập nhật lúc: <span id="lastUpdated">{lastUpdated}</span></small>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ticket List */}
                <div className="ticket-header">
                    <div className="card">
                        <div className="card-header d-flex flex-row justify-content-between align-items-center">
                            <h3>
                                <i className="bi bi-list-ul me-1"></i>
                                Danh Sách Ticket Trong Ngày
                            </h3>
                            <div className="input-group">
                                <input type="text" className="form-control form-control-sm" placeholder="Tìm kiếm..." id="ticketSearch" />
                                <button className="btn btn-sm btn-primary" type="button">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow-1" id="ticketList">
                    {dashboardQuery.isLoading ? (
                        <><i className="bi bi-arrow-repeat"></i> <span>Đang tải...</span></>
                    ) : dashboardQuery.isError ? (
                        <p className="text-danger">Không thể tải dữ liệu ticket hôm nay</p>
                    ) : data.length === 0 ? (
                        <div id="no-ticket-result" className="text-center text-muted py-3" style={{ display: 'block' }}>
                            <i className="bi bi-inbox me-1"></i> Hiện chưa có ticket mới.
                        </div>
                    ) : (
                        data.map(ticket => (
                            <div className="item mb-2" 
                            data-ticket-id={ticket.id} 
                            key={ticket.id} 
                            onClick={() => {console.log("clicked"); setSelectedTicketId(ticket.id); setOpen(true);}}>
                                <div className="d-flex flex-row">
                                    <div className=" w-100 d-flex flex-column me-2">
                                        <div className="messages mb-1"></div>
                                        <div className="title mb-1">
                                            <span className="ticket-id me-2">#{ticket.id}</span> - {ticket.title || "Chưa có tiêu đề"}
                                            <span className={`ms-2 text-white new-message bg-danger rounded br-sm py-1 px-2 ${ticket.hasNewMessage ? "" : "d-none"}`} style={{
                                                fontSize: '13px'
                                            }}> Có tin nhắn</span>
                                        </div>
                                        <div className="user">
                                            <span className="avatar me-2 text-center">
                                            <img src={ticket.facebookUser.facebookProfilePic} alt="Avatar" />
                                            </span><i className="bi bi-messenger me-2"></i>{ticket.facebookUser.facebookName || "- -"}

                                        </div>
                                    </div>
                                    <div className="w-25 d-flex flex-column justify-content-between me-2">
                                        <div className="mb-1">
                                            <i className="bi bi-activity me-2"></i><span className={`badge progress-status ${ticket.progressStatus.code}`}>{ticket.progressStatus.name}</span>
                                        </div>
                                        <div className="assignee mb-1"><i className="bi bi-person-check me-2"></i>{ticket.assignee?.name || "Chưa có"}</div>
                                        <div className="">
                                        <i className="bi bi-hourglass me-2"></i><span className={`duration ${ticket.progressStatus.id != 3 ? "time-elapse" : ""}`} data-timestamp={ticket.createdAt}>{ticket.progressStatus.id != 3 ? startElapsedTimer(now, ticket.createdAt) : "- -"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <MyDialog 
                open={open} 
                onOpenChange={handleDialogOpenChange} 
                selectedTicketId={selectedTicketId == null ? undefined : selectedTicketId}
                />
            {/* Ticket Detail Modal */}
            <div id="ticketFullDetailModal" className="modal fade ticket-detail-modal" tabIndex={-1} aria-labelledby="ticketFullDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ticketFullDetailModalLabel">Chi Tiết Toàn Bộ Ticket</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="container-fluid p-0">
                                <div className="row g-0" style={{ height: '80vh' }}>
                                    <div className="col-3 border-end d-flex flex-column overflow-auto p-3" id="ticketInfoColumn">
                                        <h6 className="mb-3">Thông tin Ticket</h6>
                                        <div className="field-group ticketId mb-2">
                                            <label htmlFor="editTicketId">#ID</label>
                                            <input type="text" id="editTicketId" name="ticketId" disabled />
                                        </div>
                                        <div className="field-group title mb-2">
                                            <label htmlFor="editTitle">Tiêu Đề</label>
                                            <input type="text" id="editTitle" name="editTitle" placeholder="Nhập tiêu đề..." />
                                        </div>
                                        <div className="field-group facebookuser mb-2">
                                            <label htmlFor="editFacebookUser">Facebook User</label>
                                            <input type="text" id="editFacebookUser" name="facebookuser" disabled />
                                        </div>
                                        <div className="field-group assignee mb-2">
                                            <label htmlFor="editAssignee">Nhân viên</label>
                                            <input type="text" id="editAssignee" name="assignee" disabled />
                                        </div>
                                        <div className="field-group createdAt mb-2">
                                            <label htmlFor="editCreatedAt">Ngày tạo</label>
                                            <div className="dropdown-input">
                                                <input type="text" id="editCreatedAt" name="assignee" disabled />
                                            </div>
                                        </div>
                                        <div className="field-group category mb-2">
                                            <label htmlFor="editCategory">Phân loại</label>
                                            <div className="dropdown-input">
                                                <input type="text" id="editCategory" name="category" placeholder="Chọn danh mục..." />
                                                <i className="bi bi-chevron-down dropdown-button"></i>
                                                <ul className="dropdown-menu"></ul>
                                            </div>
                                        </div>
                                        <div className="field-group progress-status mb-2">
                                            <label htmlFor="editProgressStatus">Tình trạng xử lý</label>
                                            <div className="dropdown-input">
                                                <input type="text" id="editProgressStatus" name="progress-status" placeholder="Chọn trạng thái..." />
                                                <i className="bi bi-chevron-down dropdown-button"></i>
                                                <ul className="dropdown-menu"></ul>
                                            </div>
                                        </div>
                                        <div className="field-group emotion mb-2">
                                            <label htmlFor="editEmotion">Cảm xúc</label>
                                            <input type="text" id="editEmotion" name="emotion" disabled />
                                        </div>
                                        <div className="field-group satisfaction mb-2">
                                            <label htmlFor="satisfaction">Mức hài lòng</label>
                                            <input type="text" id="editSatisfaction" name="satisfaction" disabled />
                                        </div>
                                        <div className="field-group tag mb-2">
                                            <label className="form-label">Tag</label>
                                            <select className="form-select" id="editTags" multiple></select>
                                        </div>
                                        <div className="field-group note mb-2">
                                            <label className="form-label" htmlFor="editNote">Ghi chú</label>
                                            <textarea className="form-control" id="editNote" rows={4}></textarea>
                                        </div>
                                        <div className="mt-3 d-flex justify-content-end gap-2" id="ticketEditFooter">
                                            <button type="button" className="btn btn-secondary btn-sm" id="cancelEdit">Hủy</button>
                                            <button type="button" className="btn btn-primary btn-sm" id="saveEdit">Cập nhật</button>
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex flex-column overflow-auto p-3" id="chatBox">
                                        <h6 className="mb-3">Tin nhắn</h6>
                                        <div className="flex-grow-1 d-flex flex-column" id="messageList"></div>
                                    </div>
                                    <div className="col-3 border-start d-flex flex-column overflow-auto p-3" id="ticketHistory">
                                        <h6 className="mb-3">Lịch sử Ticket</h6>
                                        <ul className="list-group" id="historyList"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}