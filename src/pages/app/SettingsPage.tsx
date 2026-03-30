import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, CreditCard, Brain, Building, Plug, Crown, Check } from "lucide-react";

const tabs = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "empresa", label: "Empresa", icon: Building },
  { id: "plano", label: "Plano", icon: CreditCard },
  { id: "ia", label: "IA", icon: Brain },
  { id: "integracoes", label: "Integrações", icon: Plug },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie seu perfil e preferências</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t.id ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "perfil" && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
          <h2 className="font-display font-bold text-lg">Perfil</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="João Silva" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="joao@empresa.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
              <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="+55 11 99999-0000" />
            </div>
          </div>
          <Button variant="gradient" className="rounded-xl">Salvar alterações</Button>
        </div>
      )}

      {activeTab === "empresa" && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
          <h2 className="font-display font-bold text-lg">Empresa</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome da empresa</label>
              <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="Minha Empresa LTDA" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Segmento</label>
              <input className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="Tecnologia" />
            </div>
          </div>
          <Button variant="gradient" className="rounded-xl">Salvar</Button>
        </div>
      )}

      {activeTab === "plano" && (
        <div className="space-y-4">
          {/* Current plan */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
            <h2 className="font-display font-bold text-lg">Seu plano</h2>
            <div className="p-4 rounded-xl bg-accent flex items-center justify-between">
              <div>
                <span className="font-display font-bold">Gratuito</span>
                <p className="text-xs text-muted-foreground mt-0.5">Trial ativo — 5 dias restantes</p>
              </div>
              <span className="text-[10px] px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">Trial</span>
            </div>
          </div>

          {/* Upgrade */}
          <div className="p-6 rounded-2xl border-2 border-primary/20 bg-card shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold text-lg">Premium</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full gradient-bg text-primary-foreground font-medium">Mais escolhido 🚀</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold">R$297</span>
              <span className="text-muted-foreground">/ano</span>
            </div>
            <div className="space-y-2">
              {["IA ilimitada", "Multiusuário", "Kanban de clientes", "Dashboard avançado", "Suporte prioritário", "Relatórios completos"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Button variant="gradient" className="w-full rounded-xl">
              Fazer upgrade agora
            </Button>
          </div>
        </div>
      )}

      {activeTab === "ia" && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-5">
          <h2 className="font-display font-bold text-lg">Inteligência Artificial</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <p className="text-sm font-medium">Sugestões automáticas</p>
                <p className="text-xs text-muted-foreground">A IA sugere respostas durante conversas</p>
              </div>
              <div className="w-10 h-6 rounded-full gradient-bg relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-foreground" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tom da marca</label>
              <select className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Profissional</option>
                <option>Amigável</option>
                <option>Formal</option>
                <option>Descontraído</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Instruções do assistente</label>
              <textarea
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue="Responda de forma clara e objetiva. Use emojis com moderação. Sempre ofereça próximos passos."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Assinatura padrão</label>
              <input
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue="Atenciosamente, Equipe Nevix"
              />
            </div>
          </div>
          <Button variant="gradient" className="rounded-xl">Salvar configurações de IA</Button>
        </div>
      )}

      {activeTab === "integracoes" && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
          <h2 className="font-display font-bold text-lg">Integrações</h2>
          <div className="space-y-3">
            {[
              { name: "WhatsApp Web", status: "Conectado", connected: true },
              { name: "Google Calendar", status: "Não conectado", connected: false },
              { name: "Slack", status: "Não conectado", connected: false },
            ].map((i) => (
              <div key={i.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{i.name}</p>
                  <p className={`text-xs ${i.connected ? "text-green-600" : "text-muted-foreground"}`}>{i.status}</p>
                </div>
                <Button variant={i.connected ? "outline" : "gradient"} size="sm" className="rounded-xl text-xs">
                  {i.connected ? "Desconectar" : "Conectar"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
