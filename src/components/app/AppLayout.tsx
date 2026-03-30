import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Outlet } from "react-router-dom";
import { Search, Plus, Sparkles, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Buscar conversas, contatos..."
                  className="pl-9 pr-4 py-2 w-72 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl hidden sm:flex">
                <Plus className="h-3.5 w-3.5 mr-1" /> Nova conversa
              </Button>
              <Button variant="gradient" size="sm" className="rounded-xl hidden sm:flex">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Sugerir com IA
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-bg text-[10px] text-primary-foreground flex items-center justify-center font-bold">3</span>
              </Button>
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold ml-1 cursor-pointer">
                J
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
