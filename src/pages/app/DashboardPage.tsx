import { MessageSquare, Clock, Users, Bell, TrendingUp, UserCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Atendimentos hoje", value: "47", icon: MessageSquare, change: "+12%", up: true },
  { label: "Tempo médio de resposta", value: "2min", icon: Clock, change: "-18%", up: false },
  { label: "Conversas abertas", value: "23", icon: Users, change: "+5%", up: true },
  { label: "Follow-ups pendentes", value: "8", icon: Bell, change: "3 atrasados", up: false },
  { label: "Taxa de conversão", value: "34%", icon: TrendingUp, change: "+7%", up: true },
  { label: "Aguardando retorno", value: "12", icon: UserCheck, change: "", up: true },
];

const weekData = [
  { day: "Seg", atendimentos: 32 },
  { day: "Ter", atendimentos: 45 },
  { day: "Qua", atendimentos: 38 },
  { day: "Qui", atendimentos: 52 },
  { day: "Sex", atendimentos: 47 },
  { day: "Sáb", atendimentos: 18 },
  { day: "Dom", atendimentos: 8 },
];

const recentConversations = [
  { name: "Maria Silva", msg: "Olá, gostaria de saber o preço...", time: "10:32", tag: "Lead" },
  { name: "João Oliveira", msg: "Obrigado, vou pensar!", time: "09:45", tag: "Cliente" },
  { name: "Ana Costa", msg: "Quando posso agendar?", time: "Ontem", tag: "Quente" },
  { name: "Pedro Santos", msg: "Preciso de suporte", time: "Ontem", tag: "Suporte" },
];

const todayReminders = [
  { client: "Maria Silva", note: "Enviar proposta comercial", time: "14:00" },
  { client: "João Oliveira", note: "Follow-up sobre orçamento", time: "15:30" },
  { client: "Carla Lima", note: "Enviar link de pagamento", time: "16:00" },
];

const teamRanking = [
  { name: "João Silva", atendimentos: 18, tempo: "1:42" },
  { name: "Maria Santos", atendimentos: 15, tempo: "2:10" },
  { name: "Pedro Costa", atendimentos: 14, tempo: "2:35" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu atendimento</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <s.icon className="h-3.5 w-3.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{s.value}</span>
              {s.change && (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-primary"}`}>
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
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-soft">
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
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
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
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
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
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
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
