import { Button } from "@/components/ui/button";
import { Plus, Clock, Check } from "lucide-react";

const reminders = [
  { id: 1, client: "Maria Silva", note: "Enviar proposta comercial", date: "Hoje, 14:00", done: false },
  { id: 2, client: "João Oliveira", note: "Follow-up sobre orçamento", date: "Amanhã, 09:00", done: false },
  { id: 3, client: "Ana Costa", note: "Confirmar agendamento", date: "28/03, 10:00", done: false },
  { id: 4, client: "Pedro Santos", note: "Resolver ticket de suporte", date: "Ontem", done: true },
  { id: 5, client: "Carla Lima", note: "Enviar link de pagamento", date: "25/03", done: true },
];

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Lembretes</h1>
          <p className="text-muted-foreground">Seus follow-ups e tarefas pendentes</p>
        </div>
        <Button variant="gradient" className="rounded-xl"><Plus className="h-4 w-4 mr-2" /> Novo lembrete</Button>
      </div>

      <div className="space-y-3">
        {reminders.map(r => (
          <div
            key={r.id}
            className={`p-5 rounded-2xl border bg-card shadow-soft flex items-center gap-4 ${
              r.done ? "border-border/50 opacity-60" : "border-border"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              r.done ? "bg-muted" : "bg-accent"
            }`}>
              {r.done ? <Check className="h-4 w-4 text-muted-foreground" /> : <Clock className="h-4 w-4 text-accent-foreground" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{r.client}</span>
                <span className="text-xs text-muted-foreground">• {r.date}</span>
              </div>
              <p className={`text-sm ${r.done ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>{r.note}</p>
            </div>
            {!r.done && (
              <Button variant="outline" size="sm" className="rounded-lg">Concluir</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
