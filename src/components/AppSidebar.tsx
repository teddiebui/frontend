import { ChevronRight } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
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
    const sidebarShellClassName = "[&_[data-slot=sidebar-inner]]:relative [&_[data-slot=sidebar-inner]]:overflow-hidden [&_[data-slot=sidebar-inner]]:[background:var(--app-sidebar-shell-bg)]"
    const sidebarOverlayClassName = "pointer-events-none absolute inset-0 [background:var(--app-sidebar-overlay-bg)]"
    const sidebarBrandClassName = "relative z-10 flex items-start gap-3 overflow-hidden rounded-[calc(var(--radius-4xl)+0.15rem)] p-3 [background:var(--app-sidebar-brand-bg)] shadow-[inset_0_0_0_1px_var(--app-sidebar-brand-border)]"
    // const sidebarBrandMarkClassName = "flex size-11 shrink-0 items-center rounded-[calc(var(--radius-3xl)+0.1rem)] [background:var(--app-sidebar-brand-mark-bg)] text-sidebar-primary-foreground shadow-[var(--app-sidebar-brand-mark-shadow)]"
    const sidebarBrandMarkClassName = ""
    const sidebarNavClassNames = {
        icon: {
            base: "flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--radius-2xl)+0.05rem)] bg-[var(--app-sidebar-nav-icon-bg)] text-sidebar-primary transition-[background-color,color,transform] duration-180 ease-linear",
            // hover: "group-hover:bg-[var(--app-sidebar-nav-icon-active-bg)] group-hover:text-[var(--app-sidebar-nav-icon-active-text)] group-hover:-translate-y-px",
            hover: "",
            active: "group-data-[active=true]:bg-[var(--app-sidebar-nav-icon-active-bg)] group-data-[active=true]:text-[var(--app-sidebar-nav-icon-active-text)] group-data-[active=true]:-translate-y-px",
        },
        arrow: {
            base: "ml-auto size-3.5 shrink-0 translate-x-[-2px] text-[var(--app-sidebar-nav-arrow)] opacity-0 transition-[opacity,transform] duration-180 ease-linear",
            hover: "group-hover:translate-x-0 group-hover:opacity-100",
            active: "group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100",
        },
    }

    return (
        <Sidebar collapsible="icon" className={sidebarShellClassName}>
            <div aria-hidden="true" className={sidebarOverlayClassName} />
            <SidebarHeader className="px-3 pb-2 pt-4">
                <Link to="/today-staff" className={sidebarBrandClassName}>
                    <span className={sidebarBrandMarkClassName}>
                        <img src="/img/favicon.ico" alt="Logo" className="size-9 rounded-[calc(var(--radius-3xl)+0.1rem)] object-cover" />
                    </span>
                    <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--app-sidebar-eyebrow)]">Thiên An Phú</span>
                        <span className="mt-1 block text-sm font-semibold text-sidebar-foreground [font-family:var(--font-heading)]">Help Desk Ops</span>

                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-2 pb-2 pt-1">
                {adminNavigationSections.map((section) => (
                    <SidebarGroup key={section.title} className="relative z-10 py-0">
                        {/* <SidebarGroupLabel className="mb-0 h-auto flex-col items-start gap-0 px-2">
                            <span className="text-[10px] font-semibold uppercase text-[var(--app-sidebar-section-title)]">{section.title}</span>
                            <span className="text-[10px] leading-5 text-[var(--app-sidebar-section-subtitle)]">{section.label}</span>
                        </SidebarGroupLabel> */}

                        <SidebarMenu className="">
                            {section.items.map((item) => {
                                const Icon = item.icon

                                return (
                                    <SidebarMenuItem key={item.to}>
                                        <SidebarMenuButton
                                            asChild
                                            className="h-11 gap-3 rounded-[calc(var(--radius-3xl)+0.1rem)] px-3 py-2 text-sm text-[var(--app-sidebar-nav-text)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:[background:var(--app-sidebar-nav-active-bg)] data-[active=true]:text-[var(--app-sidebar-nav-active-text)] data-[active=true]:shadow-[var(--app-sidebar-nav-active-shadow)]"
                                            isActive={isAdminNavigationItemActive(location.pathname, item.to)}
                                            tooltip={item.label}
                                        >
                                            <Link to={item.to} className="group flex w-full items-center gap-3">
                                                <span className={`${sidebarNavClassNames.icon.base} ${sidebarNavClassNames.icon.hover} ${sidebarNavClassNames.icon.active}`}>
                                                    <Icon />
                                                </span>
                                                <span className="truncate">{item.label}</span>
                                                <ChevronRight className={`${sidebarNavClassNames.arrow.base} ${sidebarNavClassNames.arrow.hover} ${sidebarNavClassNames.arrow.active}`} />
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="relative z-10 px-3 pb-4 pt-2">
                {/* <div className={sidebarStatusCardClassName}>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[calc(var(--radius-3xl)+0.1rem)] bg-[oklch(0.724_0.079_188/0.2)] text-[oklch(0.964_0.007_95)]">
                        <Activity className="size-4" />
                    </span>
                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium text-sidebar-foreground">System Watch</p>
                        <p className="text-xs leading-5 text-sidebar-foreground/70">
                            Primary support channels are stable.
                        </p>
                    </div>
                </div> */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
