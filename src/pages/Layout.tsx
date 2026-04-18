import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { LayoutHeader } from "@/components/LayoutHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/AppSidebar";

export default function Layout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="ui-page-shell min-h-screen">
          <LayoutHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="footer mt-auto py-3 text-center">
            <span>&copy; 2025 Thiên An Phú - Customer Help Desk</span>
          </footer>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}