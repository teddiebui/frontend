
export default function TodayTicket() {
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
                                <p className="metric-value" id="totalTickets">- -</p>
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
                                <p className="metric-value" id="inProgressTickets">- -</p>
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
                                <p className="metric-value" id="onHoldTickets">- -</p>
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
                                <p className="metric-value" id="resolvedTickets">- -</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="metric-card refresh-container">
                            <button className="btn-refresh" id="refreshDashboardTicket">
                                <i className="bi bi-arrow-clockwise"></i>
                                <span>Làm Mới</span>
                            </button>
                            <p className="last-updated">
                                <small>Cập nhật lúc: <span id="lastUpdated">13:13</span></small>
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
                </div>
            </div>

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