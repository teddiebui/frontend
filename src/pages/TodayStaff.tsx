import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEmployee } from '@/hooks/useEmployee';
import { toast } from 'sonner';
import { formatElapsed, useNow } from '@/hooks/useNow';
import { Users } from 'lucide-react';



export default function TodayStaff() {
    const {
        employeeDashboard: { data, isLoading, error, refetch },
    } = useEmployee();

    const now = useNow(); // 🔥 chỉ 1 timer cho toàn bộ table

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (!isLoading && !error) {
            toast.success('Dashboard tải thành công!', {
                description: 'Dữ liệu nhân viên đã được cập nhật',
                action: {
                    label: 'Reload',
                    onClick: () => refetch(),
                },
            });
        }
    }, [isLoading, error]);

    useEffect(() => {
        if (error) {
            toast.error('Dashboard tải thất bại!');
        }
    }, [error]);

    return (
        <div className="ui-page-container min-h-full">
            <div className="mb-4" id="employeeSection">
                <Card className="ui-surface">
                    <CardHeader className="ui-section-header">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Users className="size-5" />
                                Danh Sách Nhân Viên
                            </CardTitle>
                        </div>
                        <Badge variant="outline" className="h-10 rounded-2xl border-[var(--border-soft)] bg-[var(--surface-subtle)] px-4 text-sm text-slate-700">
                            {data ? data.length : 0} nhân viên
                        </Badge>
                    </CardHeader>

                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-48 w-full" />
                        ) : error ? (
                            <Alert variant="destructive">
                                <AlertDescription>{error.message}</AlertDescription>
                            </Alert>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên nhân viên</TableHead>
                                        <TableHead>Vai trò</TableHead>
                                        <TableHead>Số lượng ticket</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead>Thời gian trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {data && data.length > 0 ? (
                                        data.map((emp) => {
                                            const startTs = emp.statusLog?.from
                                                ? new Date(emp.statusLog.from).getTime()
                                                : undefined;

                                            return (
                                                <TableRow key={emp.username}>
                                                    <TableCell>{emp.name}</TableCell>
                                                    <TableCell>{emp.userGroup?.name || ''}</TableCell>
                                                    <TableCell>{emp.ticketCount}</TableCell>

                                                    <TableCell className="capitalize">
                                                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-medium">
                                                            <span
                                                                className={`status-indicator ${emp.statusLog?.status?.name}`}
                                                            />
                                                            {emp.statusLog?.status?.name || ''}
                                                        </span>
                                                    </TableCell>

                                                    <TableCell>
                                                        {emp.statusLog?.status.name != 'offline' ? formatElapsed(startTs, now) : '- -'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                Không có nhân viên nào.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}