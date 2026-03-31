import { MessageSquare, Clock, Users, Bell, TrendingUp, UserCheck, Bot } from "lucide-react";
import { useDashboardStats } from "@/hooks/useSupabase";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-20 text-muted-foreground">
        Carregando painel principal...
      </div>
    );
  }

  // Se não tem dados no sistema, mostra um Empty State elegante de boas-vindas
  if (!stats || (stats.totalAgents === 0 && stats.totalContacts === 0 && stats.totalConversations === 0)) {
    return (
      <div className="flex h-full min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-foreground mb-3">Bem-vindo ao Nevix</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Comece criando seu primeiro agente para iniciar seu atendimento e gerenciar suas conversas no automático.
        </p>
        <Button variant="gradient" className="font-bold rounded-xl shadow-lg h-12 px-8 text-[15px] transform transition-transform hover:scale-105" asChild>
          <Link to="/app/equipe">Criar meu primeiro Agente</Link>
        </Button>
      </div>
    );
  }

  // Dashboard com dados reais (vazios/zeros se recém criado mas já configurado)
  const realStats = [
    { label: "Atendimentos Hoje", value: "0", icon: MessageSquare, change: null, up: true },
    { label: "Tempo Médio (TMA)", value: "0s", icon: Clock, change: null, up: true },
    { label: "Total Contatos", value: stats.totalContacts.toString(), icon: Users, change: null, up: true },
    { label: "Total Conversas", value: stats.totalConversations.toString(), icon: Bell, change: null, up: true },
    { label: "Agentes Ativos", value: stats.totalAgents.toString(), icon: Bot, change: null, up: true },
    { label: "Taxa de Conversão", value: "0%", icon: TrendingUp, change: null, up: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Visão Geral</h1>
        <p className="text-muted-foreground text-[14px]">Acompanhe as métricas de atendimento em tempo real da sua operação.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {realStats.map((s, i) => (
          <div key={i} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-3 transition-all duration-200 hover:shadow-medium">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <s.icon className="h-3.5 w-3.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[26px] font-extrabold">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Como não há dados reais de gráficos ainda, mostramos placeholders condizentes com o ambiente "vazio mas pronto" */}
      <div className="p-10 rounded-2xl border border-dashed border-border bg-card/50 shadow-soft text-center text-muted-foreground">
        Ao longo dos dias, os gráficos de desempenho dos seus agentes e conversas aparecerão aqui.
      </div>
    </div>
  );
}
