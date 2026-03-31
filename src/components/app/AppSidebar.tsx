import {
  LayoutDashboard,
  MessageSquare,
  Tag,
  Zap,
  Bell,
  Users,
  Settings,
  Sparkles,
  Contact,
  BarChart3,
  Crown,
  Bot
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Conversas", url: "/app/conversas", icon: MessageSquare },
  { title: "Contatos", url: "/app/contatos", icon: Contact },
  { title: "Etiquetas", url: "/app/etiquetas", icon: Tag },
  { title: "Lembretes", url: "/app/lembretes", icon: Bell },
  { title: "Respostas rápidas", url: "/app/respostas", icon: Zap },
  { title: "Agentes", url: "/app/equipe", icon: Bot },
  { title: "Relatórios", url: "/app/relatorios", icon: BarChart3 },
  { title: "Configurações", url: "/app/config", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className={`p-5 flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-extrabold text-[20px] tracking-tight">Nevix</span>}
        </div>

        {/* Nav */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/app"}
                      className="text-muted-foreground font-medium hover:bg-muted/40 transition-colors flex items-center gap-3 px-3 py-2.5 rounded-xl group relative"
                      activeClassName="bg-primary/10 text-primary font-bold shadow-sm before:absolute before:left-[-6px] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-4 before:bg-primary before:rounded-r-full"
                    >
                      <item.icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
                      {!collapsed && <span className="text-[13px]">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer - Plan */}
        {!collapsed && (
          <div className="p-4 border-t border-border/40 space-y-3.5 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                   <Crown className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Plano atual</p>
                  <p className="text-[13px] font-bold text-foreground leading-tight">Gratuito</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                Trial
              </span>
            </div>
            <Button variant="gradient" className="w-full rounded-xl text-[13px] h-9 font-bold shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
              Assinar Premium
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
