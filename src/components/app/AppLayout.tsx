import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { Outlet } from "react-router-dom";
import { Search, Plus, Sparkles, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#FAFAFA] dark:bg-background/95 selection:bg-primary/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-[70px] flex items-center justify-between border-b border-border/40 px-6 bg-background/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors h-9 w-9 rounded-full hover:bg-muted/50" />
              <div className="relative hidden md:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Buscar conversas, contatos ou ajuda..."
                  className="pl-10 pr-4 py-2 w-80 rounded-full bg-muted/40 border-[1.5px] border-transparent text-[13px] font-medium transition-all duration-300 hover:bg-muted/60 focus:bg-background focus:outline-none focus:border-ring/30 focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground/60 shadow-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full hidden sm:flex h-9 px-4 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/40 font-semibold text-[13px] transition-all">
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Nova Conversa
              </Button>
              <Button variant="gradient" className="rounded-full hidden sm:flex h-9 px-4 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all font-semibold text-[13px]">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary-foreground" /> IA
              </Button>
              <div className="h-6 w-[1px] bg-border/60 mx-1 hidden sm:block"></div>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/60 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-pink-500 border border-card"></span>
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-primary text-sm font-bold cursor-pointer ring-2 ring-background shadow-sm hover:ring-primary/20 transition-all ml-1">
                J
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 xl:p-8 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border/50 [&::-webkit-scrollbar-thumb]:rounded-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
