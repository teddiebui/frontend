import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { LayoutHeader } from "@/components/LayoutHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/AppSidebar";

export default function Layout() {
  const insetClassName = "min-h-screen bg-[linear-gradient(180deg,oklch(1_0_0/0.3)_0%,transparent_16%),linear-gradient(180deg,var(--surface-canvas)_0%,var(--background)_100%)]";
  const footerClassName = "mt-auto flex flex-col gap-1 border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,oklch(1_0_0/0.22)_0%,var(--surface-panel)_100%)] px-4 py-4 text-center text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:text-left";

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className={insetClassName}>
          <LayoutHeader />
          <main className="flex-1 px-4 py-5 lg:px-6 lg:py-6">
            <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6">
              <Outlet />
            </div>
          </main>
          <footer className={footerClassName}>
            <span>&copy; 2025 Thiên An Phú - Customer Help Desk</span>
          </footer>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}