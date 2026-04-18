
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEmployee } from '@/hooks/useEmployee';
import { toast } from 'sonner';

function formatTime(from: number): string {
    // from: timestamp, format to HH:mm:ss
    const date = new Date(from);
    return date.toLocaleTimeString('vi-VN', { hour12: false });
}

export default function TodayStaff() {
    const {
        employeeDashboard: { data, isLoading, error, refetch },
    } = useEmployee();

    useEffect(() => {
        refetch();
    }, [refetch]);

    // Toast khi fetch thành công
    useEffect(() => {
        if (!isLoading && !error) {
            toast.success('Dashboard tải thành công!');
        }
    }, [isLoading, error]);

    // Toast khi fetch thất bại
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
                            <Table id="employeeTable" className="table table-hover">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead data-sort="name">Tên nhân viên</TableHead>
                                        <TableHead data-sort="userGroup">Vai trò</TableHead>
                                        <TableHead data-sort="ticketCount">Số lượng ticket</TableHead>
                                        <TableHead data-sort="status">Trạng thái</TableHead>
                                        <TableHead data-sort="statusTime">Thời gian trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody id="employeeList2" className="position-relative">
                                    {data && data.length > 0 ? (
                                        data.map((emp) => (
                                            <TableRow className="show" key={emp.username}>
                                                <TableCell>{emp.name}</TableCell>
                                                <TableCell>{emp.userGroup?.code || ''}</TableCell>
                                                <TableCell>{emp.ticketCount}</TableCell>
                                                <TableCell style={{ textTransform: 'capitalize' }}>
                                                    <span
                                                        className={`status-indicator ${emp.statusLog?.status?.name === 'online' ? 'online' : 'offline'}`}
                                                    ></span>
                                                    {emp.statusLog?.status?.name || ''}
                                                </TableCell>
                                                <TableCell
                                                    className="time-elapse"
                                                    data-timestamp={emp.statusLog?.from ? new Date(emp.statusLog.from).getTime() : ''}
                                                >
                                                    {emp.statusLog?.from ? formatTime(new Date(emp.statusLog.from).getTime()) : ''}
                                                </TableCell>
                                            </TableRow>
                                        ))
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