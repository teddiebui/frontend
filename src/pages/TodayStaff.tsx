
export default function TodayStaff() {
  return (
    <>
    {/* <!-- Dashboard Content --> */}
    <div className="dashboard-content page-main-content d-flex flex-column">
        {/* <!-- Employee List Section --> */}
        <div className="mb-4" id="employeeSection">
            <div className="card employee-card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="bi bi-people-fill"></i>
                        Danh Sách Nhân Viên
                    </h3>
                    <span className="badge bg-primary employee-count">2</span>
                </div>
                <table id="employeeTable" className="table table-hover">
                    <thead>
                    <tr>
                        <th data-sort="name">Tên nhân viên</th>
                        <th data-sort="userGroup">Vai trò</th>
                        <th data-sort="ticketCount">Số lượng ticket</th>
                        <th data-sort="status">Trạng thái</th>
                        <th data-sort="statusTime">Thời gian trạng thái</th>
                    </tr>
                    </thead>



                    <tbody id="employeeList2" className="position-relative">
                    <tr className="show">
                        <td>Admin</td>
                        <td>supervisor</td>
                        <td>0</td>
                        <td style={{ textTransform: "capitalize" }}>
                            <span className="status-indicator online"></span>
                            online
                        </td>
                        <td className="time-elapse" data-timestamp="1747672753420">13:17:11</td>

                    </tr>

                    <tr className="show">
                        <td>Bui Khac Binh</td>
                        <td>staff</td>
                        <td>0</td>
                        <td style={{ textTransform: "capitalize" }}>
                            <span className="status-indicator online"></span>
                            online
                        </td>
                        <td className="time-elapse" data-timestamp="1747720069057">00:08:35</td>

                    </tr>
                    </tbody>

                </table>

            </div>
        </div>
    </div>
    </>
  );
}