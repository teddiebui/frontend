import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const themeButtonClassName = "size-9 rounded-[var(--radius-xl)] px-0 text-foreground hover:bg-[var(--surface-elevated)] hover:shadow-[inset_0_0_0_1px_var(--border-soft)] aria-expanded:bg-[var(--surface-elevated)] aria-expanded:shadow-[inset_0_0_0_1px_var(--border-soft)]";
const menuClassName = "bg-[var(--surface-panel)] shadow-[var(--shadow-panel)] backdrop-blur-[18px]";

export function ThemePicker() {
    const { resolvedTheme, setTheme } = useTheme();

    const currentTheme = resolvedTheme ?? "system";
    const currentThemeLabel = currentTheme === "system" ? "System" : currentTheme === "dark" ? "Dark" : "Light";
    const ThemeIcon = currentTheme === "dark" ? Moon : currentTheme === "light" ? Sun : Monitor;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={themeButtonClassName} title={`Theme: ${currentThemeLabel}`}>
                    <ThemeIcon className="size-4" />
                    <span className="sr-only">Theme: {currentThemeLabel}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${menuClassName} w-56`}>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={currentTheme} onValueChange={setTheme}>
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
    );
}