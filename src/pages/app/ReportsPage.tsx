import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, MessageSquare, Clock, CheckCircle, Users, ArrowUpRight } from "lucide-react";

const weekData = [
  { day: "Seg", atendimentos: 32, conversoes: 8 },
  { day: "Ter", atendimentos: 45, conversoes: 12 },
  { day: "Qua", atendimentos: 38, conversoes: 10 },
  { day: "Qui", atendimentos: 52, conversoes: 15 },
  { day: "Sex", atendimentos: 47, conversoes: 13 },
  { day: "Sáb", atendimentos: 18, conversoes: 5 },
  { day: "Dom", atendimentos: 8, conversoes: 2 },
];

const performanceData = [
  { name: "João S.", atendimentos: 87, conversoes: 24, tempo: "1:42" },
  { name: "Maria S.", atendimentos: 72, conversoes: 19, tempo: "2:10" },
  { name: "Pedro C.", atendimentos: 65, conversoes: 15, tempo: "2:35" },
];

const metrics = [
  { label: "Atendimentos no período", value: "240", icon: MessageSquare, change: "+15%" },
  { label: "Conversões", value: "65", icon: TrendingUp, change: "+22%" },
  { label: "Tempo médio", value: "2:05", icon: Clock, change: "-12%" },
  { label: "Conversas concluídas", value: "198", icon: CheckCircle, change: "+18%" },
  { label: "Follow-ups realizados", value: "142", icon: Users, change: "+9%" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Acompanhe a performance do seu atendimento</p>
      </div>

      {/* Metric cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="p-4 rounded-2xl border border-border bg-card shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{m.value}</span>
              <span className="text-xs text-green-600 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3" /> {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Atendimentos chart */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
          <h2 className="font-display font-bold text-base mb-4">Atendimentos por período</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="atendimentos" fill="url(#reportGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(256, 100%, 62%)" />
                    <stop offset="100%" stopColor="hsl(217, 91%, 60%)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversões chart */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
          <h2 className="font-display font-bold text-base mb-4">Conversões na semana</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="conversoes" stroke="hsl(256, 100%, 62%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(256, 100%, 62%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance by attendant */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="font-display font-bold text-base mb-4">Performance por atendente</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Atendente</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Atendimentos</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Conversões</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Tempo médio</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((p, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold">
                        {p.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-display font-semibold">{p.atendimentos}</td>
                  <td className="p-3 text-sm font-display font-semibold">{p.conversoes}</td>
                  <td className="p-3 text-sm text-muted-foreground">{p.tempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
