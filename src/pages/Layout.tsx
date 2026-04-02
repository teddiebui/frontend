import { Outlet } from "react-router";

export default function Layout() {
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
          <div className="sidebar-heading" >
            <div className="title">BẢNG ĐIỀU KHIỂN </div>
            <div className="label">Theo dõi thời gian thực</div>
          </div>
          <li >
            <a href="/today-staff">
              <i className="bi bi-speedometer2"></i>
              <span>Bảng Điều Khiển</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>
          <li  className="">
            <a href="/today-ticket">
              <i className="bi bi-ticket-perforated"></i>
              <span>Ticket hôm nay</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>

          <div className="sidebar-heading" >
            <div className="title">DỮ LIỆU </div>
            <div className="label">Quản lý & tra cứu dữ liệu</div>
          </div>

          <li >
            <a href="/ticket">
              <i className="bi bi-ticket-perforated"></i>
              <span>Quản Lý Ticket</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>
          <li >
            <a href="/customer">
              <i className="bi bi-people"></i>
              <span>Người Dùng</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>
          <div className="sidebar-heading" >
            <div className="title">BÁO CÁO </div>
            <div className="label">Phân tích xu hướng & dữ liệu</div>
          </div>
          <li  >
            <a href="/performance">
              <i className="bi bi-graph-up"></i>
              <span>Hiệu Suất</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>
          <li  >
            <a href="/report">
              <i className="bi bi-bar-chart"></i>
              <span>Báo Cáo</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>

          <div className="sidebar-heading" >
            <div className="title">CÀI ĐẶT</div>
            <div className="label">Cấu hình hệ thống</div>
          </div>
          <li  >
            <a href="/setting">
              <i className="bi bi-person-badge"></i>
              <span>Nhân viên</span>
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </li>
        </ul>
      </div>

      {/* <!-- Header --> */}
      <header className="page-header" >
        <div className="header-left">
          <button className="btn-toggle-sidebar d-lg-none" id="showSidebar">
            <i className="bi bi-list"></i>
          </button>
          <h2>Bảng Điều Khiển</h2>
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
              <li><a className="dropdown-item" href="#" data-status-id="1">Online</a></li>
              <li><a className="dropdown-item" href="#" data-status-id="2">Away</a></li>
            </ul>
          </div>


          <div className="language-dropdown dropdown">
            <button className="dropdown-toggle" type="button" id="languageDropdown" aria-expanded="false" data-bs-toggle="dropdown">
              <span id="currentLanguage">VI</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li><a className="dropdown-item" href="#" onClick={() => console.log('VI')}>VI</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => console.log('EN')}>EN</a></li>
            </ul>
          </div>



          <div className="user-dropdown dropdown">
            <button className="dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src="img/profile-placeholder.jpg" alt="User Avatar" className="user-avatar" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a className="dropdown-item" href="#" id="user-profile-button"><i className="bi bi-person"></i>
                Hồ sơ</a></li>
              <li><a className="dropdown-item" href="#" id="setting-button"><i className="bi bi-gear"></i> Cài
                đặt</a></li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li><a className="dropdown-item" href="/logout"><i className="bi bi-box-arrow-right"></i> Đăng
                xuất</a>
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
    </div>
  );
}