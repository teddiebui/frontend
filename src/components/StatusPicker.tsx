import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmployee } from "@/hooks/useEmployee";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PresenceStatus = "online" | "away";

const statusOptions: Array<{ value: PresenceStatus; label: string }> = [
    { value: "online", label: "Online" },
    { value: "away", label: "Away" },
];

const toolbarButtonClassName = "h-auto min-w-0 justify-between gap-2 rounded-[calc(var(--radius-3xl)+0.1rem)] px-3 py-2 text-left text-foreground hover:bg-[var(--surface-elevated)] hover:shadow-[inset_0_0_0_1px_var(--border-soft)] aria-expanded:bg-[var(--surface-elevated)] aria-expanded:shadow-[inset_0_0_0_1px_var(--border-soft)]";
const menuClassName = "rounded-[calc(var(--radius-4xl)+0.1rem)] border-[var(--border-soft)] bg-[var(--surface-panel)] shadow-[var(--shadow-panel)] backdrop-blur-[18px]";

export function StatusPicker() {
    const [status, setStatus] = useState<PresenceStatus>("away");

    const currentStatusLabel = statusOptions.find(({ value }) => value === status)?.label ?? "Away";
    const currentStatusDotClassName = status === "online" ? "bg-status-online" : "bg-status-away";

    const handleStatusChange = (nextStatus: string) => {
        const parsedStatus = nextStatus as PresenceStatus;
        setStatus(parsedStatus);
        toast.success(`Trạng thái tạm thời được chuyển sang ${parsedStatus === "online" ? "Online" : "Away"}.`);
    };

    const {updateOnlineStatus} = useEmployee();
    


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={toolbarButtonClassName}>
                    <span className="flex min-w-0 items-center gap-2">
                        <span className={`inline-flex size-2.5 rounded-full ${currentStatusDotClassName}`} />
                    </span>
                    <span className="hidden text-muted-foreground md:inline">{currentStatusLabel}</span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${menuClassName} w-48`}>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={status} onValueChange={handleStatusChange}>
                    {statusOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                            <span className={`inline-flex size-2.5 rounded-full ${option.value === "online" ? "bg-status-online" : "bg-status-away"}`} />
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}