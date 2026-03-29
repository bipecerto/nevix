import { Button } from "@/components/ui/button";
import { User, CreditCard, Brain } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie seu perfil e preferências</p>
      </div>

      {/* Perfil */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-lg">Perfil</h2>
        </div>
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nome</label>
            <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm" defaultValue="João Silva" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm" defaultValue="joao@empresa.com" />
          </div>
        </div>
        <Button variant="gradient" className="rounded-xl">Salvar</Button>
      </div>

      {/* Plano */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-lg">Plano</h2>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-accent">
          <div>
            <span className="font-display font-bold">Premium</span>
            <span className="text-sm text-muted-foreground ml-2">R$297/ano</span>
          </div>
          <span className="text-xs gradient-bg text-primary-foreground px-3 py-1 rounded-full font-medium">Ativo</span>
        </div>
      </div>

      {/* IA */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-lg">Inteligência Artificial</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sugestões automáticas</p>
              <p className="text-xs text-muted-foreground">A IA sugere respostas durante conversas</p>
            </div>
            <div className="w-10 h-6 rounded-full gradient-bg relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Tom de voz</p>
              <p className="text-xs text-muted-foreground">Defina como a IA deve responder</p>
            </div>
            <select className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm">
              <option>Profissional</option>
              <option>Amigável</option>
              <option>Formal</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
