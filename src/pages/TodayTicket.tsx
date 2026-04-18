import { MyDialog } from "@/components/MyDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonGroup } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatElapsed, updateTime, useNow } from "@/hooks/useNow";
import { useTicket } from "@/hooks/useTicket";
import type { TicketDashboardDTO, TicketListDTO, TicketSearchCriteria } from "@/types";
import {
    Activity,
    ArrowUpRight,
    Clock3,
    LoaderCircle,
    MessageCircleMore,
    PauseCircle,
    RefreshCw,
    Search,
    Ticket,
    UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type DisplayTicket = {
    id: number;
    title: string;
    createdAtMs: number;
    progressStatus: {
        id: number;
        code: string;
        name: string;
    };
    assigneeName: string;
    facebookName: string;
    facebookProfilePic: string;
    hasNewMessage: boolean;
};

const ACTIVE_STATUS_CODES = ["pending", "on-hold"] as const;

const STATUS_STYLE_MAP: Record<string, string> = {
    pending: "border-amber-500/25 bg-amber-500/10 text-amber-700",
    "on-hold": "border-sky-500/25 bg-sky-500/10 text-sky-700",
    resolved: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
};

const EMPTY_SEARCH_CRITERIA: TicketSearchCriteria = {
    assignee: "",
    facebookId: "",
    title: "",
    tag: "",
    progressStatus: 0,
    fromTime: 0,
    toTime: 0,
    category: 0,
    emotion: 0,
    satisfaction: 0,
};

function normalizeDashboardTicket(ticket: TicketDashboardDTO): DisplayTicket {
    return {
        id: ticket.id,
        title: ticket.title || "Chưa có tiêu đề",
        createdAtMs: ticket.createdAt,
        progressStatus: ticket.progressStatus,
        assigneeName: ticket.assignee?.name || "Chưa phân công",
        facebookName: ticket.facebookUser?.facebookName || "Khách hàng chưa xác định",
        facebookProfilePic: ticket.facebookUser?.facebookProfilePic || "",
        hasNewMessage: ticket.hasNewMessage,
    };
}

function normalizeSearchedTicket(ticket: TicketListDTO): DisplayTicket {
    return {
        id: ticket.id,
        title: ticket.title || "Chưa có tiêu đề",
        createdAtMs: new Date(ticket.createdAt).getTime(),
        progressStatus: ticket.progressStatus,
        assigneeName: ticket.assignee?.name || "Chưa phân công",
        facebookName: ticket.facebookUser?.facebookName || "Khách hàng chưa xác định",
        facebookProfilePic: ticket.facebookUser?.facebookProfilePic || "",
        hasNewMessage: false,
    };
}

function isActiveTicket(code: string) {
    return ACTIVE_STATUS_CODES.includes(code as (typeof ACTIVE_STATUS_CODES)[number]);
}

export default function TodayTicket() {
    const { dashboardQuery, searchTickets } = useTicket();
    const [lastUpdated, setLastUpdated] = useState(() => updateTime(Date.now()));
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const now = useNow();

    const dashboardTickets = useMemo(() => {
        const items = (dashboardQuery.data ?? []).map(normalizeDashboardTicket);

        return items.sort((left, right) => right.createdAtMs - left.createdAtMs);
    }, [dashboardQuery.data]);

    const metrics = useMemo(() => {
        return {
            total: dashboardTickets.length,
            pending: dashboardTickets.filter((ticket) => ticket.progressStatus.code === "pending").length,
            onHold: dashboardTickets.filter((ticket) => ticket.progressStatus.code === "on-hold").length,
            resolved: dashboardTickets.filter((ticket) => ticket.progressStatus.code === "resolved").length,
        };
    }, [dashboardTickets]);

    const trimmedSearch = searchValue.trim();
    const normalizedSearchResults = useMemo(() => {
        const items = (searchTickets.data?.content ?? []).map(normalizeSearchedTicket);

        return items
            .filter((ticket) => isActiveTicket(ticket.progressStatus.code))
            .sort((left, right) => right.createdAtMs - left.createdAtMs);
    }, [searchTickets.data]);

    const activeDashboardTickets = useMemo(() => {
        return dashboardTickets.filter((ticket) => isActiveTicket(ticket.progressStatus.code));
    }, [dashboardTickets]);

    const displayTickets = trimmedSearch ? normalizedSearchResults : activeDashboardTickets;
    const isListLoading = dashboardQuery.isLoading || searchTickets.isPending;

    useEffect(() => {
        if (!dashboardQuery.isError) {
            return;
        }

        toast.error(dashboardQuery.error?.message || "Không thể tải dữ liệu ticket hôm nay");
    }, [dashboardQuery.error, dashboardQuery.isError]);

    useEffect(() => {
        if (!searchTickets.isError) {
            return;
        }

        toast.error(searchTickets.error?.message || "Không thể tìm kiếm ticket");
    }, [searchTickets.error, searchTickets.isError]);

    useEffect(() => {
        if (!trimmedSearch) {
            searchTickets.reset();
            return;
        }

        const timeoutId = window.setTimeout(() => {
            searchTickets.mutate({
                criteria: {
                    ...EMPTY_SEARCH_CRITERIA,
                    title: trimmedSearch,
                },
                page: 0,
                size: 50,
            });
        }, 500);

        return () => window.clearTimeout(timeoutId);
    }, [searchTickets, trimmedSearch]);

    const handleRefreshDashboard = useCallback(async () => {
        try {
            await dashboardQuery.refetch();

            if (trimmedSearch) {
                await searchTickets.mutateAsync({
                    criteria: {
                        ...EMPTY_SEARCH_CRITERIA,
                        title: trimmedSearch,
                    },
                    page: 0,
                    size: 50,
                });
            }

            setLastUpdated(updateTime(Date.now()));
            toast.success("Dashboard ticket đã được làm mới");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Không thể làm mới dashboard ticket";
            toast.error(message);
        }
    }, [dashboardQuery, searchTickets, trimmedSearch]);

    const handleDialogOpenChange = useCallback((nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            setSelectedTicketId(null);
        }
    }, []);

    const handleOpenTicket = useCallback((ticketId: number) => {
        setSelectedTicketId(ticketId);
        setOpen(true);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchValue("");
        searchTickets.reset();
    }, [searchTickets]);

    return (
        <div className="ui-page-container min-h-full">
            <div className="flex w-full flex-col gap-6">
                <section className="ui-surface">
                    <div className="ui-section-header lg:items-end">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl space-y-3">
                                <Badge variant="outline" className="rounded-full border-teal-600/20 bg-teal-600/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-teal-700">
                                    Ticket Dashboard Today
                                </Badge>
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                        Theo dõi ticket đang xử lý theo thời gian thực
                                    </h1>
                                    <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                                        Metrics luôn lấy từ dashboard API. Danh sách tập trung vào ticket pending và on-hold, có tìm kiếm debounce qua search API để lọc nhanh các case đang cần xử lý.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="ui-panel-meta">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                        Last sync
                                    </div>
                                    <div className="mt-1 font-medium text-slate-900">{lastUpdated}</div>
                                </div>
                                <ButtonGroup>
                                    {trimmedSearch ? (
                                        <Button type="button" variant="outline" className="h-11 px-4" onClick={handleClearSearch}>
                                            Xóa tìm kiếm
                                        </Button>
                                    ) : null}
                                    <Button
                                        type="button"
                                        onClick={handleRefreshDashboard}
                                        className="h-11 bg-slate-900 px-4 text-sm text-white hover:bg-slate-800"
                                        disabled={dashboardQuery.isFetching || searchTickets.isPending}
                                    >
                                        <RefreshCw className={`size-4 ${(dashboardQuery.isFetching || searchTickets.isPending) ? "animate-spin" : ""}`} />
                                        Làm mới dashboard
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>

                    <div className="ui-metrics-grid">
                        <Card className="ui-metric">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="ui-metric-label">Tổng ticket</p>
                                        <p className="ui-metric-value text-slate-950 dark:text-slate-50">{metrics.total}</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-900 p-3 text-white">
                                        <Ticket className="size-5" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                    <ArrowUpRight className="size-4 text-emerald-600" />
                                    Tổng quan toàn bộ dashboard hôm nay
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="ui-metric ui-metric--pending">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="ui-metric-label">Pending</p>
                                        <p className="ui-metric-value text-amber-950 dark:text-amber-50">{metrics.pending}</p>
                                    </div>
                                    <div className="rounded-2xl bg-amber-500/15 p-3 text-amber-700">
                                        <Activity className="size-5" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-amber-800/70">Ticket đang chờ xử lý tiếp theo</div>
                            </CardContent>
                        </Card>

                        <Card className="ui-metric ui-metric--on-hold">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="ui-metric-label">On hold</p>
                                        <p className="ui-metric-value text-sky-950 dark:text-sky-50">{metrics.onHold}</p>
                                    </div>
                                    <div className="rounded-2xl bg-sky-500/15 p-3 text-sky-700">
                                        <PauseCircle className="size-5" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-sky-800/70">Ticket đang tạm dừng hoặc chờ phản hồi</div>
                            </CardContent>
                        </Card>

                        <Card className="ui-metric ui-metric--resolved">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="ui-metric-label">Resolved</p>
                                        <p className="ui-metric-value text-emerald-950 dark:text-emerald-50">{metrics.resolved}</p>
                                    </div>
                                    <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-700">
                                        <MessageCircleMore className="size-5" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-emerald-800/70">Ticket đã hoàn tất trong dashboard</div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="ui-surface">
                    <div className="ui-section-header">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-950">Danh sách ticket đang resolve</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Chỉ hiển thị ticket pending và on-hold, sắp xếp theo thời gian mới nhất.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                            <div className="relative min-w-0 flex-1 sm:min-w-80">
                                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={searchValue}
                                    onChange={(event) => setSearchValue(event.target.value)}
                                    placeholder="Tìm theo tiêu đề ticket..."
                                    className="h-11 bg-[var(--surface-subtle)] pl-9 text-sm shadow-none"
                                />
                            </div>
                            <Badge variant="outline" className="h-11 rounded-2xl border-[var(--border-soft)] bg-[var(--surface-subtle)] px-4 text-sm text-slate-600">
                                {trimmedSearch ? `${displayTickets.length} kết quả` : `${activeDashboardTickets.length} ticket active`}
                            </Badge>
                        </div>
                    </div>

                    <div className="p-5 sm:p-7">
                        {dashboardQuery.isError ? (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {dashboardQuery.error?.message || "Không thể tải dữ liệu ticket hôm nay"}
                                </AlertDescription>
                            </Alert>
                        ) : isListLoading ? (
                            <div className="grid gap-4 lg:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton key={index} className="h-40 rounded-[1.5rem]" />
                                ))}
                            </div>
                        ) : displayTickets.length === 0 ? (
                            <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center">
                                <div className="rounded-full bg-slate-900 p-3 text-white">
                                    <Search className="size-5" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-slate-900">
                                    {trimmedSearch ? "Không tìm thấy ticket phù hợp" : "Hiện chưa có ticket active"}
                                </h3>
                                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    {trimmedSearch
                                        ? "Thử thay đổi từ khóa để tìm theo tiêu đề ticket. Kết quả tìm kiếm đang lấy từ search API trong hook."
                                        : "Khi dashboard có ticket pending hoặc on-hold, danh sách này sẽ hiển thị tự động."}
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4 xl:grid-cols-2">
                                {displayTickets.map((ticket) => {
                                    const avatarFallback = ticket.facebookName.charAt(0).toUpperCase() || "?";
                                    const isSearching = trimmedSearch.length > 0;

                                    return (
                                        <button
                                            key={ticket.id}
                                            type="button"
                                            onClick={() => handleOpenTicket(ticket.id)}
                                            className="ui-card-shell group flex w-full flex-col p-5 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="outline" className="rounded-full border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-500">
                                                            #{ticket.id}
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE_MAP[ticket.progressStatus.code] ?? "border-slate-200 bg-slate-100 text-slate-700"}`}
                                                        >
                                                            {ticket.progressStatus.name}
                                                        </Badge>
                                                        {ticket.hasNewMessage ? (
                                                            <Badge className="rounded-full bg-rose-600 px-2.5 py-1 text-xs text-white">
                                                                Có tin nhắn mới
                                                            </Badge>
                                                        ) : null}
                                                        {isSearching ? (
                                                            <Badge variant="outline" className="rounded-full border-teal-200 bg-teal-50 px-2.5 py-1 text-xs text-teal-700">
                                                                Search API
                                                            </Badge>
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-slate-950 transition group-hover:text-slate-700">
                                                            {ticket.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Khách hàng: {ticket.facebookName}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition group-hover:border-slate-300 group-hover:text-slate-900">
                                                    <ArrowUpRight className="size-4" />
                                                </div>
                                            </div>

                                            <div className="mt-5 grid gap-3 border-t border-slate-200/80 pt-4 sm:grid-cols-3">
                                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
                                                    <div className="flex size-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm">
                                                        {ticket.facebookProfilePic ? (
                                                            <img
                                                                src={ticket.facebookProfilePic}
                                                                alt={ticket.facebookName}
                                                                className="size-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-sm font-semibold">{avatarFallback}</span>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Facebook user</div>
                                                        <div className="truncate text-sm font-medium text-slate-900">{ticket.facebookName}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
                                                    <div className="rounded-full bg-white p-2 text-slate-700 shadow-sm">
                                                        <UserRound className="size-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Assignee</div>
                                                        <div className="text-sm font-medium text-slate-900">{ticket.assigneeName}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
                                                    <div className="rounded-full bg-white p-2 text-slate-700 shadow-sm">
                                                        {ticket.progressStatus.code === "resolved" ? (
                                                            <Clock3 className="size-4" />
                                                        ) : (
                                                            <LoaderCircle className="size-4" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Elapsed</div>
                                                        <div className="text-sm font-medium text-slate-900">
                                                            {ticket.progressStatus.code === "resolved"
                                                                ? updateTime(ticket.createdAtMs)
                                                                : formatElapsed(ticket.createdAtMs, now)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <MyDialog
                open={open}
                onOpenChange={handleDialogOpenChange}
                selectedTicketId={selectedTicketId ?? undefined}
            />
        </div>
    );
}