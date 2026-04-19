import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Languages } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type LanguageCode = "vi" | "en";

const languageOptions: Array<{ value: LanguageCode; label: string }> = [
    { value: "vi", label: "Tiếng Việt" },
    { value: "en", label: "English" },
];

const toolbarButtonClassName = "h-auto min-w-0 justify-between gap-2 rounded-[calc(var(--radius-3xl)+0.1rem)] px-3 py-2 text-left text-foreground hover:bg-[var(--surface-elevated)] hover:shadow-[inset_0_0_0_1px_var(--border-soft)] aria-expanded:bg-[var(--surface-elevated)] aria-expanded:shadow-[inset_0_0_0_1px_var(--border-soft)]";
const menuClassName = "rounded-[calc(var(--radius-4xl)+0.1rem)] border-[var(--border-soft)] bg-[var(--surface-panel)] shadow-[var(--shadow-panel)] backdrop-blur-[18px]";

export function LanguagePicker() {
    const [language, setLanguage] = useState<LanguageCode>("vi");

    const currentLanguageLabel = languageOptions.find(({ value }) => value === language)?.label ?? "Tiếng Việt";

    const handleLanguageChange = (nextLanguage: string) => {
        const parsedLanguage = nextLanguage as LanguageCode;
        setLanguage(parsedLanguage);
        toast.info(`Ngôn ngữ ${parsedLanguage === "vi" ? "Tiếng Việt" : "English"} sẽ được tích hợp sau.`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={toolbarButtonClassName}>
                    <span className="flex min-w-0 items-center gap-2">
                        <Languages className="size-4" />
                    </span>
                    <span className="hidden text-muted-foreground md:inline">{currentLanguageLabel}</span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${menuClassName} w-56`}>
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                    {languageOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}