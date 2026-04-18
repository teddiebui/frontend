import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings2,
  TicketCheck,
  UsersRound,
} from "lucide-react"

export interface AdminNavigationItem {
  to: string
  label: string
  icon: LucideIcon
}

export interface AdminNavigationSection {
  title: string
  breadcrumbLabel: string
  label: string
  items: AdminNavigationItem[]
}

export interface AdminBreadcrumbItem {
  label: string
  to?: string
}

const adminHomeBreadcrumb: AdminBreadcrumbItem = {
  label: "Help Desk",
  to: "/today-staff",
}

export const adminNavigationSections: AdminNavigationSection[] = [
  {
    title: "BẢNG ĐIỀU KHIỂN",
    breadcrumbLabel: "Bảng Điều Khiển",
    label: "Theo dõi thời gian thực",
    items: [
      { to: "/today-staff", label: "Bảng Điều Khiển", icon: LayoutDashboard },
      { to: "/today-ticket", label: "Ticket hôm nay", icon: TicketCheck },
    ],
  },
  {
    title: "DỮ LIỆU",
    breadcrumbLabel: "Dữ Liệu",
    label: "Quản lý & tra cứu dữ liệu",
    items: [
      { to: "/ticket", label: "Quản Lý Ticket", icon: ClipboardList },
      { to: "/customer", label: "Người Dùng", icon: UsersRound },
    ],
  },
  {
    title: "BÁO CÁO",
    breadcrumbLabel: "Báo Cáo",
    label: "Phân tích xu hướng & dữ liệu",
    items: [
      { to: "/performance", label: "Hiệu Suất", icon: BarChart3 },
      { to: "/report", label: "Báo Cáo", icon: FileText },
    ],
  },
  {
    title: "CÀI ĐẶT",
    breadcrumbLabel: "Cài Đặt",
    label: "Cấu hình hệ thống",
    items: [
      { to: "/setting", label: "Nhân viên", icon: Settings2 },
    ],
  },
]

function getAdminNavigationMatch(pathname: string): {
  section: AdminNavigationSection
  item: AdminNavigationItem
} | null {
  for (const section of adminNavigationSections) {
    const item = section.items.find(({ to }) => pathname.startsWith(to))

    if (item) {
      return { section, item }
    }
  }

  return null
}

export function getAdminPageTitle(pathname: string): string {
  const match = getAdminNavigationMatch(pathname)

  return match?.item.label ?? "Bảng Điều Khiển"
}

export function isAdminNavigationItemActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function getAdminBreadcrumbs(pathname: string): AdminBreadcrumbItem[] {
  const match = getAdminNavigationMatch(pathname)

  if (!match) {
    return [adminHomeBreadcrumb]
  }

  const breadcrumbs: AdminBreadcrumbItem[] = [adminHomeBreadcrumb]

  if (match.section.breadcrumbLabel !== match.item.label) {
    breadcrumbs.push({
      label: match.section.breadcrumbLabel,
      to: match.section.items[0]?.to,
    })
  }

  breadcrumbs.push({ label: match.item.label })

  return breadcrumbs
}