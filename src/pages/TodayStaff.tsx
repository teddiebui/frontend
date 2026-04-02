
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEmployee } from '@/hooks/useEmployee';

function formatTime(from: string): string {
    // from: ISO string, format to HH:mm:ss
    const date = new Date(from);
    return date.toLocaleTimeString('vi-VN', { hour12: false });
}

export default function TodayStaff() {
    const { dashboard, loading, error, fetchDashboard } = useEmployee();

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

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
                            {dashboard ? dashboard.length : 0}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-48 w-full" />
                        ) : error ? (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
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
                                    {dashboard && dashboard.length > 0 ? (
                                        dashboard.map((emp) => (
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
                                                    {emp.statusLog?.from ? formatTime(emp.statusLog.from) : ''}
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