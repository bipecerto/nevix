import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const members = [
  { name: "João Silva", email: "joao@empresa.com", role: "Admin", status: "Ativo" },
  { name: "Maria Santos", email: "maria@empresa.com", role: "Atendente", status: "Ativo" },
  { name: "Pedro Costa", email: "pedro@empresa.com", role: "Atendente", status: "Convidado" },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Equipe</h1>
          <p className="text-muted-foreground">Gerencie os membros do seu time</p>
        </div>
        <Button variant="gradient" className="rounded-xl"><Plus className="h-4 w-4 mr-2" /> Convidar</Button>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 text-xs font-medium text-muted-foreground border-b border-border">
          <span>Nome</span><span>Email</span><span>Função</span><span>Status</span>
        </div>
        {members.map(m => (
          <div key={m.email} className="grid grid-cols-4 gap-4 p-4 text-sm border-b border-border/50 last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold">
                {m.name.charAt(0)}
              </div>
              <span className="font-medium">{m.name}</span>
            </div>
            <span className="text-muted-foreground flex items-center">{m.email}</span>
            <span className="flex items-center">{m.role}</span>
            <span className="flex items-center">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                m.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>{m.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
