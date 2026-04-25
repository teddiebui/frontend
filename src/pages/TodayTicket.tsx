
import { useMemo } from "react";
import { useTicket } from "@/hooks/useTicket";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TodayTicket() {
    const { dashboardQuery } = useTicket();

    const tickets = dashboardQuery.data ?? [];

    const metrics = useMemo(() => {
        const normalize = (v?: string) => (v ?? "").trim().toLowerCase();
        let onHold = 0;
        let pending = 0;
        let resolved = 0;

        for (const t of tickets) {
            const key = normalize(t.progressStatus?.code) || normalize(t.progressStatus?.name);
            if (key.includes("hold")) onHold += 1;
            else if (key.includes("pending") || key.includes("in_progress") || key.includes("in progress")) pending += 1;
            else if (key.includes("resolved") || key.includes("done") || key.includes("closed")) resolved += 1;
        }

        return {
            total: tickets.length,
            onHold,
            pending,
            resolved,
        };
    }, [tickets]);

    const lastUpdated = useMemo(() => {
        if (!dashboardQuery.dataUpdatedAt) return "- -";
        const d = new Date(dashboardQuery.dataUpdatedAt);
        return new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(d);
    }, [dashboardQuery.dataUpdatedAt]);

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
                                <p className="metric-value" id="totalTickets">
                                    {dashboardQuery.isLoading ? "- -" : metrics.total}
                                </p>
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
                                <p className="metric-value" id="onHoldTickets">
                                    {dashboardQuery.isLoading ? "- -" : metrics.onHold}
                                </p>
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
                                <p className="metric-value" id="inProgressTickets">
                                    {dashboardQuery.isLoading ? "- -" : metrics.pending}
                                </p>
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
                                <p className="metric-value" id="resolvedTickets">
                                    {dashboardQuery.isLoading ? "- -" : metrics.resolved}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="metric-card refresh-container d-flex flex-column align-items-start gap-2">
                            <Button
                                className="btn-refresh d-inline-flex align-items-center gap-2"
                                id="refreshDashboardTicket"
                                variant="outline"
                                size="sm"
                                onClick={() => dashboardQuery.refetch()}
                                disabled={dashboardQuery.isFetching}
                                aria-busy={dashboardQuery.isFetching}
                            >
                                <i className="bi bi-arrow-clockwise"></i>
                                <span>{dashboardQuery.isFetching ? "Đang làm mới..." : "Làm Mới"}</span>
                            </Button>
                            <p className="last-updated m-0">
                                <small>
                                    Cập nhật lúc: <span id="lastUpdated">{lastUpdated}</span>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ticket List */}
                <div className="ticket-header">
                    <div className="card">
                        <div className="card-header d-flex flex-row justify-content-between align-items-center">
                            <h3 className="m-0 d-flex align-items-center gap-2">
                                <i className="bi bi-list-ul"></i>
                                Danh Sách Ticket Trong Ngày
                            </h3>
                            <div className="input-group" role="search">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Tìm kiếm..."
                                    id="ticketSearch"
                                    disabled
                                />
                                <button className="btn btn-sm btn-primary" type="button" disabled>
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow-1" id="ticketList">
                    {dashboardQuery.isError ? (
                        <div className="alert alert-danger my-3" role="alert">
                            {(dashboardQuery.error as Error).message}
                        </div>
                    ) : (
                        <div className="card mt-2">
                            <div className="card-body p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead style={{ width: 80 }}>#ID</TableHead>
                                            <TableHead>Tiêu đề</TableHead>
                                            <TableHead>Nhân viên</TableHead>
                                            <TableHead>Facebook User</TableHead>
                                            <TableHead>Trạng thái</TableHead>
                                            <TableHead>Ngày tạo</TableHead>
                                            <TableHead>Mới</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dashboardQuery.isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-4">
                                                    Đang tải dữ liệu...
                                                </TableCell>
                                            </TableRow>
                                        ) : tickets.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-4">
                                                    Không có ticket nào hôm nay
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            tickets.map((t) => (
                                                <TableRow key={t.id} data-state={t.hasNewMessage ? "selected" : undefined}>
                                                    <TableCell>#{t.id}</TableCell>
                                                    <TableCell>{t.title}</TableCell>
                                                    <TableCell>
                                                        {t.assignee?.name || t.assignee?.username || "-"}
                                                    </TableCell>
                                                    <TableCell>{t.facebookUser?.facebookName || t.facebookUser?.facebookId}</TableCell>
                                                    <TableCell>{t.progressStatus?.name || t.progressStatus?.code}</TableCell>
                                                    <TableCell>
                                                        {new Date(t.createdAt).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>{t.hasNewMessage ? "Có" : "Không"}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                    <TableCaption>
                                        Tổng số: {tickets.length} ticket
                                    </TableCaption>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Ticket Detail Modal (giữ nguyên cấu trúc, hiện chưa kết nối) */}
            <div
                id="ticketFullDetailModal"
                className="modal fade ticket-detail-modal"
                tabIndex={-1}
                aria-labelledby="ticketFullDetailModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ticketFullDetailModalLabel">
                                Chi Tiết Toàn Bộ Ticket
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Đóng"
                            ></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="container-fluid p-0">
                                <div className="row g-0" style={{ height: "80vh" }}>
                                    <div className="col-3 border-end d-flex flex-column overflow-auto p-3" id="ticketInfoColumn">
                                        <h6 className="mb-3">Thông tin Ticket</h6>
                                        {/* Nội dung biểu mẫu giữ nguyên để tránh thay đổi lớn */}
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