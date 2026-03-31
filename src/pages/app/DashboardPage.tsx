import { MessageSquare, Clock, Users, Bell, TrendingUp, UserCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Atendimentos Hoje", value: "142", icon: MessageSquare, change: "+12%", up: true },
  { label: "Tempo Médio (TMA)", value: "3m 45s", icon: Clock, change: "-18% (Melhor)", up: true },
  { label: "Chats Ativos", value: "28", icon: Users, change: "+5%", up: true },
  { label: "Follow-ups Pendentes", value: "12", icon: Bell, change: "3 atrasados", up: false },
  { label: "Taxa de Conversão", value: "18.4%", icon: TrendingUp, change: "+2.1%", up: true },
  { label: "Aguardando Cliente", value: "45", icon: UserCheck, change: "Volume alto", up: true },
];

const weekData = [
  { day: "Seg", atendimentos: 112 },
  { day: "Ter", atendimentos: 145 },
  { day: "Qua", atendimentos: 138 },
  { day: "Qui", atendimentos: 165 },
  { day: "Sex", atendimentos: 142 },
  { day: "Sáb", atendimentos: 45 },
  { day: "Dom", atendimentos: 22 },
];

const recentConversations = [
  { name: "Maria Silva", msg: "Sim, por favor! Quais são as vantagens?", time: "10:32", tag: "Novo" },
  { name: "João Oliveira", msg: "Obrigado, vou pensar!", time: "09:45", tag: "Cliente" },
  { name: "Ana Costa", msg: "Quando posso agendar a demonstração?", time: "Ontem", tag: "Quente" },
  { name: "Pedro Santos", msg: "Preciso de suporte técnico no painel", time: "Ontem", tag: "Bug" },
];

const todayReminders = [
  { client: "Maria Silva", note: "Enviar proposta comercial atualizada", time: "14:00" },
  { client: "João Oliveira", note: "Retornar ligação sobre fechamento", time: "15:30" },
  { client: "Ana Costa", note: "Enviar link da reunião no Zoom", time: "16:00" },
];

const teamRanking = [
  { name: "João Silva", atendimentos: 54, tempo: "2m 12s" },
  { name: "Carla Dias", atendimentos: 48, tempo: "2m 45s" },
  { name: "Marcos V.", atendimentos: 40, tempo: "3m 10s" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Visão Geral</h1>
        <p className="text-muted-foreground text-[14px]">Acompanhe as métricas de atendimento em tempo real da sua operação.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-3 transition-all duration-200 hover:shadow-medium">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <s.icon className="h-3.5 w-3.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[26px] font-extrabold">{s.value}</span>
              {s.change && (
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 ${s.up ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:shadow-medium">
          <h2 className="font-display font-bold text-base mb-4">Atendimentos na semana</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "var(--shadow-soft)",
                  }}
                />
                <Bar dataKey="atendimentos" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(256, 100%, 62%)" />
                    <stop offset="100%" stopColor="hsl(217, 91%, 60%)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team ranking */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:shadow-medium">
          <h2 className="font-display font-bold text-base mb-4">Ranking de atendentes</h2>
          <div className="space-y-3">
            {teamRanking.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <span className="w-6 h-6 rounded-full gradient-bg text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.atendimentos} atendimentos • {t.tempo} média</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent conversations */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:shadow-medium">
          <h2 className="font-display font-bold text-base mb-4">Conversas recentes</h2>
          <div className="space-y-2">
            {recentConversations.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{c.name}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">{c.tag}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.msg}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{c.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today reminders */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:shadow-medium">
          <h2 className="font-display font-bold text-base mb-4">Lembretes de hoje</h2>
          <div className="space-y-2">
            {todayReminders.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Clock className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{r.client}</p>
                  <p className="text-xs text-muted-foreground">{r.note}</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
