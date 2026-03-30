import { Plus, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const members = [
  { name: "João Silva", role: "Admin", status: "Online", atendimentos: 18, tempo: "1:42", email: "joao@empresa.com" },
  { name: "Maria Santos", role: "Atendente", status: "Online", atendimentos: 15, tempo: "2:10", email: "maria@empresa.com" },
  { name: "Pedro Costa", role: "Atendente", status: "Ausente", atendimentos: 14, tempo: "2:35", email: "pedro@empresa.com" },
  { name: "Ana Oliveira", role: "Atendente", status: "Offline", atendimentos: 0, tempo: "-", email: "ana@empresa.com" },
];

const statusColors: Record<string, string> = {
  Online: "bg-green-500",
  Ausente: "bg-yellow-500",
  Offline: "bg-gray-300",
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Equipe</h1>
          <p className="text-muted-foreground">Gerencie os membros do seu time</p>
        </div>
        <Button variant="gradient" className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Convidar membro
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((m) => (
          <div key={m.email} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-4 hover:shadow-medium transition-shadow">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                  {m.name.charAt(0)}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${statusColors[m.status]}`} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <MessageSquare className="h-3 w-3" />
                  <span className="text-[10px]">Atendimentos</span>
                </div>
                <p className="font-display font-bold text-lg">{m.atendimentos}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span className="text-[10px]">Tempo médio</span>
                </div>
                <p className="font-display font-bold text-lg">{m.tempo}</p>
              </div>
            </div>

            <span className={`text-[10px] font-medium ${m.status === "Online" ? "text-green-600" : m.status === "Ausente" ? "text-yellow-600" : "text-muted-foreground"}`}>
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
