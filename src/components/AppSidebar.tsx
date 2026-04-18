import { Activity, ArrowUpRightFromCircle, ShieldCheck } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

import {
    adminNavigationSections,
    isAdminNavigationItemActive,
} from "../lib/admin-navigation"


export default function AppSidebar() {
    const location = useLocation()

    return (
        <Sidebar collapsible="icon" className="ui-admin-sidebar">
            <SidebarHeader className="px-3 pb-2 pt-4">
                <Link to="/today-staff" className="ui-sidebar-brand">
                    <span className="ui-sidebar-brand-mark">
                        <ShieldCheck className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                        <span className="ui-sidebar-eyebrow">Thiên An Phú</span>
                        <span className="ui-sidebar-brand-title">Help Desk Ops</span>
                        <span className="ui-sidebar-brand-subtitle">
                            Bảng điều khiển vận hành cho đội ngũ hỗ trợ khách hàng.
                        </span>
                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="gap-3 px-2 pb-2 pt-1">
                {adminNavigationSections.map((section) => (
                    <SidebarGroup key={section.title} className="px-1 py-1.5">
                        <SidebarGroupLabel className="ui-sidebar-section-label flex-col text-left">
                            <span>{section.title}</span>
                            <span>{section.label}</span>
                        </SidebarGroupLabel>
                        <SidebarMenu className="gap-1.5">
                            {section.items.map((item) => {
                                const Icon = item.icon

                                return (
                                    <SidebarMenuItem key={item.to}>
                                        <SidebarMenuButton
                                            asChild
                                            className="ui-sidebar-nav-button"
                                            isActive={isAdminNavigationItemActive(location.pathname, item.to)}
                                            tooltip={item.label}
                                        >
                                            <Link to={item.to}>
                                                <span className="ui-sidebar-nav-icon">
                                                    <Icon />
                                                </span>
                                                <span className="truncate">{item.label}</span>
                                                <ArrowUpRightFromCircle className="ui-sidebar-nav-arrow" />
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="px-3 pb-4 pt-2">
                <div className="ui-sidebar-status-card">
                    <span className="ui-sidebar-status-icon">
                        <Activity className="size-4" />
                    </span>
                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium text-sidebar-foreground">System Watch</p>
                        <p className="text-xs leading-5 text-sidebar-foreground/70">
                            Primary support channels are stable.
                        </p>
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
