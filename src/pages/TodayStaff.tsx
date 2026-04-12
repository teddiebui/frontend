
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEmployee } from '@/hooks/useEmployee';
import { toast } from 'sonner';
import { formatElapsed, useNow } from '@/hooks/useNow';



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
        <div className="dashboard-content page-main-content d-flex flex-column">
            <div className="mb-4" id="employeeSection">
                <Card className="employee-card">
                    <CardHeader className="card-header">
                        <CardTitle className="card-title d-flex align-items-center gap-2">
                            <i className="bi bi-people-fill"></i>
                            Danh Sách Nhân Viên
                        </CardTitle>
                        <Badge className="badge bg-primary employee-count">
                            {data ? data.length : 0}
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
                            <Table className="table table-hover">
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

                                                    <TableCell style={{ textTransform: 'capitalize' }}>
                                                        <span
                                                            className={`status-indicator ${emp.statusLog?.status?.name}`}
                                                        />
                                                        {emp.statusLog?.status?.name || ''}
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