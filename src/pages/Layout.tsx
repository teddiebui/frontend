import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { Toaster } from "sonner";
import { useAuth } from "@/auth/AuthContext";
import { useEffect } from "react";
import { useEmployee } from "@/hooks/useEmployee";
import type { StatusLogDTO } from "@/types";
import { toast } from "sonner";
import { LayoutHeader } from "@/components/LayoutHeader";

interface SidebarItem {
  to: string;
  label: string;
  iconClassName: string;
}

interface SidebarSection {
  title: string;
  label: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'BẢNG ĐIỀU KHIỂN',
    label: 'Theo dõi thời gian thực',
    items: [
      { to: '/today-staff', label: 'Bảng Điều Khiển', iconClassName: 'bi bi-speedometer2' },
      { to: '/today-ticket', label: 'Ticket hôm nay', iconClassName: 'bi bi-ticket-perforated' },
    ],
  },
  {
    title: 'DỮ LIỆU',
    label: 'Quản lý & tra cứu dữ liệu',
    items: [
      { to: '/ticket', label: 'Quản Lý Ticket', iconClassName: 'bi bi-ticket-perforated' },
      { to: '/customer', label: 'Người Dùng', iconClassName: 'bi bi-people' },
    ],
  },
  {
    title: 'BÁO CÁO',
    label: 'Phân tích xu hướng & dữ liệu',
    items: [
      { to: '/performance', label: 'Hiệu Suất', iconClassName: 'bi bi-graph-up' },
      { to: '/report', label: 'Báo Cáo', iconClassName: 'bi bi-bar-chart' },
    ],
  },
  {
    title: 'CÀI ĐẶT',
    label: 'Cấu hình hệ thống',
    items: [
      { to: '/setting', label: 'Nhân viên', iconClassName: 'bi bi-person-badge' },
    ],
  },
];




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
          {sidebarSections.map((section) => (
            <li key={section.title}>
              <div className="sidebar-heading">
                <div className="title">{section.title}</div>
                <div className="label">{section.label}</div>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                      <i className={item.iconClassName}></i>
                      <span>{item.label}</span>
                      <i className="bi bi-arrow-right-short"></i>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* <!-- Header --> */}
      <LayoutHeader />


      {/* <!-- Main Content --> */}
      <Outlet />

      {/* <!-- Footer --> */}
      <footer className="footer mt-auto py-3 text-center">
        <span>&copy; 2025 Thiên An Phú - Customer Help Desk</span>
      </footer>


      <Toaster />

    </div>
  );
}