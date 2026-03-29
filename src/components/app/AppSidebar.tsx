import {
  LayoutDashboard,
  MessageSquare,
  Tag,
  Zap,
  Bell,
  Users,
  Settings,
  Sparkles,
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

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Conversas", url: "/app/conversas", icon: MessageSquare },
  { title: "Etiquetas", url: "/app/etiquetas", icon: Tag },
  { title: "Respostas rápidas", url: "/app/respostas", icon: Zap },
  { title: "Lembretes", url: "/app/lembretes", icon: Bell },
  { title: "Equipe", url: "/app/equipe", icon: Users },
  { title: "Configurações", url: "/app/config", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className={`p-4 flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-extrabold text-lg">Nevix</span>}
        </div>

        <SidebarGroup>
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
      </SidebarContent>
    </Sidebar>
  );
}
