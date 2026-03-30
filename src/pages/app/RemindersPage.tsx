import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Check, AlertCircle, Calendar } from "lucide-react";

const filters = ["Todos", "Hoje", "Amanhã", "Atrasados", "Concluídos"];

const reminders = [
  { id: 1, client: "Maria Silva", note: "Enviar proposta comercial", date: "Hoje, 14:00", status: "pendente", overdue: false },
  { id: 2, client: "João Oliveira", note: "Follow-up sobre orçamento", date: "Hoje, 15:30", status: "pendente", overdue: false },
  { id: 3, client: "Ana Costa", note: "Confirmar agendamento", date: "Amanhã, 10:00", status: "pendente", overdue: false },
  { id: 4, client: "Lucas Mendes", note: "Enviar catálogo de produtos", date: "Amanhã, 09:00", status: "pendente", overdue: false },
  { id: 5, client: "Pedro Santos", note: "Resolver ticket de suporte", date: "Ontem, 16:00", status: "atrasado", overdue: true },
  { id: 6, client: "Fernanda Rocha", note: "Retornar ligação", date: "25/03, 11:00", status: "atrasado", overdue: true },
  { id: 7, client: "Carla Lima", note: "Enviar link de pagamento", date: "25/03", status: "concluído", overdue: false },
  { id: 8, client: "Rafael Souza", note: "Confirmar entrega", date: "24/03", status: "concluído", overdue: false },
];

export default function RemindersPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const statusIcon = (status: string, overdue: boolean) => {
    if (status === "concluído") return <Check className="h-4 w-4 text-green-600" />;
    if (overdue) return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-accent-foreground" />;
  };

  const statusBg = (status: string, overdue: boolean) => {
    if (status === "concluído") return "bg-green-50";
    if (overdue) return "bg-red-50";
    return "bg-accent";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Lembretes</h1>
          <p className="text-muted-foreground">Seus follow-ups e tarefas pendentes</p>
        </div>
        <Button variant="gradient" className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Novo lembrete
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              f === activeFilter
                ? "gradient-bg text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reminders list */}
      <div className="space-y-2">
        {reminders.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-2xl border bg-card shadow-soft flex items-center gap-4 transition-all hover:shadow-medium ${
              r.status === "concluído" ? "border-border/50 opacity-60" : r.overdue ? "border-red-200" : "border-border"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${statusBg(r.status, r.overdue)}`}>
              {statusIcon(r.status, r.overdue)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{r.client}</span>
                {r.overdue && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Atrasado</span>}
              </div>
              <p className={`text-sm text-muted-foreground ${r.status === "concluído" ? "line-through" : ""}`}>{r.note}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
              <Calendar className="h-3 w-3" />
              <span>{r.date}</span>
            </div>
            {r.status !== "concluído" && (
              <Button variant="outline" size="sm" className="rounded-xl text-xs flex-shrink-0">
                Concluir
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
