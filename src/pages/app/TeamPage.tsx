import { Plus, MessageSquare, Clock, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgents } from "@/hooks/useSupabase";

export default function TeamPage() {
  const { data: agents, isLoading } = useAgents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Agentes</h1>
          <p className="text-muted-foreground">Gerencie as inteligências artificiais da sua operação</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <Plus className="h-4 w-4 mr-2" /> Novo agente
        </Button>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-muted-foreground">Carregando agentes...</div>
      ) : agents && agents.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((m: any) => (
            <div key={m.id} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-4 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                    <Bot className="h-6 w-6" />
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${m.is_active ? "bg-emerald-500" : "bg-gray-300"}`} />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{m.persona || "Sem persona definida"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <MessageSquare className="h-3 w-3" />
                    <span className="text-[10px]">Atendimentos</span>
                  </div>
                  <p className="font-display font-bold text-lg">-</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px]">Eficácia</span>
                  </div>
                  <p className="font-display font-bold text-lg">-</p>
                </div>
              </div>

              <span className={`text-[10px] font-medium ${m.is_active ? "text-emerald-600" : "text-muted-foreground"}`}>
                {m.is_active ? "Online e Operando" : "Inativo"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-2xl border border-dashed border-border bg-card/50">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-display font-bold text-foreground mb-2">Você ainda não criou nenhum agente</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Sua operação está sem atendimento automático. Crie seu primeiro agente inteligente para começar a automatizar o WhatsApp.
          </p>
          <Button variant="gradient" className="font-semibold shadow-md px-6">
            <Plus className="h-4 w-4 mr-2" /> Criar meu primeiro agente
          </Button>
        </div>
      )}
    </div>
  );
}
