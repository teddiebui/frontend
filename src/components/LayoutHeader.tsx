import { updateTime, useNow } from "@/hooks/useNow";
import { HeaderBreadcrumbs } from "@/components/HeaderBreadcrumbs";
import { Clock3 } from "lucide-react";

import { LanguagePicker } from "./LanguagePicker";
import { StatusPicker } from "./StatusPicker";
import { ThemePicker } from "./ThemePicker";
import { UserProfile } from "./UserProfile";
import { SidebarTrigger } from "./ui/sidebar";

function HeaderTime() {
    const now = useNow(60_000);
    const formattedNow = updateTime(now);

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Clock3 className="size-3.5" />
            {formattedNow}
        </span>
    );
}

export function LayoutHeader() {
    const headerClassName = "sticky top-0 z-30 border-b border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-panel)_0%,var(--surface-elevated)_100%)] px-4 py-4 shadow-[var(--shadow-soft)] backdrop-blur-[18px] lg:px-6";

    return (
        <>
            <header className={headerClassName}>
                <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                        <SidebarTrigger className="mt-1 lg:hidden" />
                        <div className="flex min-w-0 flex-col gap-2">
                            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                                    Operations Console</span>
                            <HeaderBreadcrumbs />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-3">
                            <HeaderTime />
                            <ThemePicker />
                            <LanguagePicker />
                            <StatusPicker />
                            <UserProfile />
                    </div>
                </div>
            </header>
        </>
    )
}