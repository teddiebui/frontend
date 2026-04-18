import { useAuth } from "@/auth/AuthContext";
import { updateTime, useNow } from "@/hooks/useNow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import {
    ChevronDown,
    Clock3,
    Globe,
    LogOut,
    Monitor,
    Moon,
    Palette,
    Settings,
    Sun,
    UserCircle2,
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import { getAdminBreadcrumbs, getAdminPageTitle } from "../lib/admin-navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";

type LanguageCode = "vi" | "en"
type PresenceStatus = "online" | "away"

const languageOptions: Array<{ value: LanguageCode; label: string }> = [
    { value: "vi", label: "Tiếng Việt" },
    { value: "en", label: "English" },
]

const statusOptions: Array<{ value: PresenceStatus; label: string }> = [
    { value: "online", label: "Online" },
    { value: "away", label: "Away" },
]


export function LayoutHeader() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { resolvedTheme, setTheme } = useTheme();
    const [language, setLanguage] = useState<LanguageCode>("vi");
    const [status, setStatus] = useState<PresenceStatus>("away");

    const currentPageTitle = getAdminPageTitle(location.pathname);
    const breadcrumbs = getAdminBreadcrumbs(location.pathname);
    const now = useNow();
    const formattedNow = updateTime(now);
    const currentTheme = resolvedTheme ?? "system";
    const currentThemeLabel = currentTheme === "system" ? "System" : currentTheme === "dark" ? "Dark" : "Light";
    const currentLanguageLabel = languageOptions.find(({ value }) => value === language)?.label ?? "Tiếng Việt";
    const currentStatusLabel = statusOptions.find(({ value }) => value === status)?.label ?? "Away";
    const currentStatusDotClassName = status === "online" ? "bg-status-online" : "bg-status-away";
    const userDisplayName = user?.name || user?.username || "Help Desk Admin";
    const userEmail = user?.email || user?.username || "admin@helpdesk.local";
    const avatarFallback = useMemo(() => {
        const parts = userDisplayName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part: string) => part[0]?.toUpperCase() ?? "");

        return parts.join("") || "HD";
    }, [userDisplayName]);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    const handleThemeChange = (theme: string) => {
        setTheme(theme);
    };

    const handleLanguageChange = (nextLanguage: LanguageCode) => {
        setLanguage(nextLanguage);
        toast.info(`Ngôn ngữ ${nextLanguage === "vi" ? "Tiếng Việt" : "English"} sẽ được tích hợp sau.`);
    };

    const handleStatusChange = (nextStatus: PresenceStatus) => {
        setStatus(nextStatus);
        toast.success(`Trạng thái tạm thời được chuyển sang ${nextStatus === "online" ? "Online" : "Away"}.`);
    };

    const handleOpenProfile = () => {
        toast.info("Hồ sơ người dùng sẽ được triển khai sau.");
    };

    return (
        <>
            <header className="ui-admin-header">
                <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                        <SidebarTrigger className="mt-1 lg:hidden" />
                        <div className="flex min-w-0 flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="ui-admin-kicker">Operations Console</span>
                                <span className="ui-admin-meta-pill">
                                    <span className={`inline-flex size-2 rounded-full ${currentStatusDotClassName}`} />
                                    {currentStatusLabel}
                                </span>
                                <span className="ui-admin-meta-pill">
                                    <Clock3 className="size-3.5" />
                                    {formattedNow}
                                </span>
                            </div>
                            <div className="flex min-w-0 flex-col gap-1.5">
                        <Breadcrumb>
                                    <BreadcrumbList className="ui-admin-breadcrumb">
                                {breadcrumbs.map((breadcrumb, index) => {
                                    const isCurrentPage = index === breadcrumbs.length - 1;

                                    return (
                                        <Fragment key={`${breadcrumb.label}-${index}`}>
                                            <BreadcrumbItem>
                                                {isCurrentPage ? (
                                                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink asChild>
                                                        <Link to={breadcrumb.to ?? "/today-staff"}>{breadcrumb.label}</Link>
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {!isCurrentPage ? <BreadcrumbSeparator /> : null}
                                        </Fragment>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                                <h2 className="ui-admin-title">{currentPageTitle}</h2>
                                <p className="ui-admin-subtitle">
                                    Theo dõi trạng thái vận hành, điều hướng nhanh và quản trị tác vụ cho đội ngũ chăm sóc khách hàng.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-3">
                        <div className="ui-admin-toolbar">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ui-admin-toolbar-button justify-between">
                                        <span className="flex min-w-0 items-center gap-2">
                                            <Palette className="size-4" />
                                            <span className="hidden sm:inline">Theme</span>
                                        </span>
                                        <span className="hidden text-muted-foreground md:inline">{currentThemeLabel}</span>
                                        <ChevronDown className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="ui-admin-menu w-56">
                                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={currentTheme} onValueChange={handleThemeChange}>
                                        <DropdownMenuRadioItem value="light">
                                            <Sun className="size-4" />
                                            Light
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="dark">
                                            <Moon className="size-4" />
                                            Dark
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="system">
                                            <Monitor className="size-4" />
                                            System
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ui-admin-toolbar-button justify-between">
                                        <span className="flex min-w-0 items-center gap-2">
                                            <Globe className="size-4" />
                                            <span className="hidden sm:inline">Language</span>
                                        </span>
                                        <span className="hidden text-muted-foreground md:inline">{currentLanguageLabel}</span>
                                        <ChevronDown className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="ui-admin-menu w-56">
                                    <DropdownMenuLabel>Language</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={language} onValueChange={(value) => handleLanguageChange(value as LanguageCode)}>
                                        {languageOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ui-admin-toolbar-button justify-between">
                                        <span className="flex min-w-0 items-center gap-2">
                                            <span className={`inline-flex size-2.5 rounded-full ${currentStatusDotClassName}`} />
                                            <span className="hidden sm:inline">Status</span>
                                        </span>
                                        <span className="hidden text-muted-foreground md:inline">{currentStatusLabel}</span>
                                        <ChevronDown className="size-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="ui-admin-menu w-48">
                                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={status} onValueChange={(value) => handleStatusChange(value as PresenceStatus)}>
                                        {statusOptions.map((option) => (
                                            <DropdownMenuRadioItem key={option.value} value={option.value}>
                                                <span className={`inline-flex size-2.5 rounded-full ${option.value === "online" ? "bg-status-online" : "bg-status-away"}`} />
                                                {option.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="ui-admin-user-trigger">
                                    <div className="flex items-center gap-3 text-left">
                                        <Avatar size="lg">
                                            <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=HelpDesk" alt={userDisplayName} />
                                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                                        </Avatar>
                                        <div className="hidden min-w-0 md:block">
                                            <div className="truncate text-sm font-semibold text-foreground">{userDisplayName}</div>
                                            <div className="truncate text-xs text-muted-foreground">Administrator</div>
                                        </div>
                                        <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="ui-admin-menu w-64">
                                <DropdownMenuLabel className="space-y-1">
                                    <div className="text-sm font-semibold text-foreground">{userDisplayName}</div>
                                    <div className="text-xs font-normal text-muted-foreground">{userEmail}</div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={handleOpenProfile}>
                                    <UserCircle2 className="size-4" />
                                    Hồ sơ
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => navigate("/setting")}>
                                    <Settings className="size-4" />
                                    Cài đặt
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
                                    <LogOut className="size-4" />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </>
    )
}