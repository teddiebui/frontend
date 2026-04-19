import { useAuth } from "@/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, UserCircle2 } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const toolbarButtonClassName = "h-9 min-w-0 justify-between gap-2 rounded-[var(--radius-xl)] px-2.5 py-1.5 text-left text-foreground hover:bg-[var(--surface-elevated)] hover:shadow-[inset_0_0_0_1px_var(--border-soft)] aria-expanded:bg-[var(--surface-elevated)] aria-expanded:shadow-[inset_0_0_0_1px_var(--border-soft)]";
const menuClassName = "bg-[var(--surface-panel)] shadow-[var(--shadow-panel)] backdrop-blur-[18px]";

export function UserProfile() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

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
        navigate("/login", { replace: true });
    };

    const handleOpenProfile = () => {
        toast.info("Hồ sơ người dùng sẽ được triển khai sau.");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={toolbarButtonClassName}>
                    <div className="flex min-w-0 items-center gap-1.5">
                        <Avatar size="sm">
                            <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=HelpDesk" alt={userDisplayName} />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                        <span className="hidden text-muted-foreground md:inline">{userDisplayName}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${menuClassName} w-64`}>
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
    );
}