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
  { title: "Equipe", url: "/app/equipe", icon: Users },
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
        <div className={`p-4 flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-extrabold text-lg">Nevix</span>}
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
                      className="hover:bg-accent/50"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer - Plan */}
        {!collapsed && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Plano atual</p>
                <p className="text-sm font-semibold font-display">Gratuito</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                Trial 7 dias
              </span>
            </div>
            <Button variant="gradient" size="sm" className="w-full rounded-xl text-xs">
              <Crown className="h-3.5 w-3.5 mr-1" />
              Upgrade para Premium
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
