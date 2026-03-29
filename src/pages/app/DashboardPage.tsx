import { MessageSquare, Clock, Users, Bell } from "lucide-react";

const stats = [
  { label: "Atendimentos hoje", value: "47", icon: MessageSquare, change: "+12%" },
  { label: "Tempo médio de resposta", value: "2min", icon: Clock, change: "-18%" },
  { label: "Conversas abertas", value: "23", icon: Users, change: "+5%" },
  { label: "Follow-ups pendentes", value: "8", icon: Bell, change: "" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu atendimento</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <s.icon className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">{s.value}</span>
              {s.change && (
                <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-green-600" : "text-primary"}`}>
                  {s.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
