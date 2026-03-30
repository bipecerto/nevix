import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Tag, StickyNote, Send, Search, Sparkles, Clock, User, ChevronDown, Zap, AlertCircle } from "lucide-react";

const mockClients = [
  { id: 1, name: "Maria Silva", lastMsg: "Olá, gostaria de saber o preço...", time: "10:32", tags: ["Lead"], unread: 2, priority: "alta" },
  { id: 2, name: "João Oliveira", lastMsg: "Obrigado, vou pensar!", time: "09:45", tags: ["Cliente"], unread: 0, priority: "média" },
  { id: 3, name: "Ana Costa", lastMsg: "Quando posso agendar?", time: "Ontem", tags: ["Quente"], unread: 1, priority: "alta" },
  { id: 4, name: "Pedro Santos", lastMsg: "Preciso de suporte", time: "Ontem", tags: ["Suporte"], unread: 0, priority: "baixa" },
  { id: 5, name: "Carla Lima", lastMsg: "Fechado! Pode enviar o link", time: "Seg", tags: ["Cliente", "VIP"], unread: 0, priority: "média" },
  { id: 6, name: "Lucas Mendes", lastMsg: "Vi o anúncio no Instagram", time: "Seg", tags: ["Lead"], unread: 3, priority: "alta" },
];

const mockMessages = [
  { from: "client", text: "Olá, gostaria de saber o preço do plano premium", time: "10:30" },
  { from: "me", text: "Oi Maria! O plano Premium custa R$297/ano. Quer que eu te explique os benefícios?", time: "10:31" },
  { from: "client", text: "Sim, por favor! Quais são as vantagens?", time: "10:32" },
];

const priorityColor: Record<string, string> = {
  alta: "bg-red-100 text-red-700",
  média: "bg-yellow-100 text-yellow-700",
  baixa: "bg-green-100 text-green-700",
};

export default function ConversationsPage() {
  const [selected, setSelected] = useState(0);
  const client = mockClients[selected];

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 bg-card rounded-none">
      {/* Column 1 — Client list */}
      <div className="w-80 border-r border-border flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-border space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Buscar conversa..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-1 overflow-auto">
            {["Todas", "Lead", "Cliente", "Quente", "Suporte"].map((f) => (
              <button
                key={f}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
                  f === "Todas" ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {mockClients.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                i === selected ? "bg-accent/50" : ""
              }`}
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {c.tags.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">{t}</span>
                    ))}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ml-auto ${priorityColor[c.priority]}`}>
                      {c.priority}
                    </span>
                    {c.unread > 0 && (
                      <span className="w-5 h-5 rounded-full gradient-bg text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Column 2 — Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
              {client.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-sm">{client.name}</div>
              <div className="flex gap-1">
                {client.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl text-xs">
              <Zap className="h-3 w-3 mr-1" /> Resposta rápida
            </Button>
            <Button variant="gradient" size="sm" className="rounded-xl text-xs">
              <Sparkles className="h-3 w-3 mr-1" /> Sugerir com IA
            </Button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto space-y-4 bg-muted/20">
          {mockMessages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md px-4 py-3 rounded-2xl text-sm ${
                m.from === "me"
                  ? "gradient-bg text-primary-foreground"
                  : "bg-card border border-border"
              }`}>
                <p>{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-border flex gap-2">
          <input
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button variant="gradient" size="icon" className="rounded-xl h-10 w-10">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Column 3 — Nevix Panel */}
      <div className="w-72 border-l border-border flex-shrink-0 overflow-auto hidden xl:block">
        <div className="p-4 space-y-5">
          {/* Client info */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
              {client.name.charAt(0)}
            </div>
            <div>
              <p className="font-display font-bold text-sm">{client.name}</p>
              <p className="text-xs text-muted-foreground">+55 11 99999-0001</p>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Etiquetas</p>
            <div className="flex flex-wrap gap-1">
              {client.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-accent text-accent-foreground font-medium">{t}</span>
              ))}
              <button className="text-[10px] px-2 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                + Adicionar
              </button>
            </div>
          </div>

          {/* Priority & Responsible */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-muted/50 space-y-1">
              <p className="text-[10px] text-muted-foreground">Prioridade</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[client.priority]}`}>
                {client.priority}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/50 space-y-1">
              <p className="text-[10px] text-muted-foreground">Responsável</p>
              <p className="text-xs font-medium">João S.</p>
            </div>
          </div>

          {/* AI Button */}
          <Button variant="gradient" className="w-full rounded-xl text-sm">
            <Sparkles className="h-4 w-4 mr-2" /> Sugerir resposta com IA
          </Button>

          {/* Reminder */}
          <div className="p-3 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-accent-foreground" />
              <p className="text-xs font-semibold">Lembrete</p>
            </div>
            <p className="text-xs text-muted-foreground">Enviar proposta comercial</p>
            <p className="text-[10px] text-primary font-medium">Hoje, 14:00</p>
            <Button variant="outline" size="sm" className="w-full rounded-lg text-xs">
              Criar lembrete
            </Button>
          </div>

          {/* Internal note */}
          <div className="p-3 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2">
              <StickyNote className="h-3.5 w-3.5 text-accent-foreground" />
              <p className="text-xs font-semibold">Nota interna</p>
            </div>
            <textarea
              placeholder="Adicionar nota..."
              className="w-full text-xs p-2 rounded-lg border border-input bg-background resize-none h-16 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Suggested actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Próximas ações</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/50 text-xs cursor-pointer hover:bg-accent transition-colors">
                <AlertCircle className="h-3 w-3 text-accent-foreground flex-shrink-0" />
                <span>Enviar proposta de preços</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/50 text-xs cursor-pointer hover:bg-accent transition-colors">
                <AlertCircle className="h-3 w-3 text-accent-foreground flex-shrink-0" />
                <span>Agendar follow-up em 2 dias</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Resumo da conversa</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cliente interessada no plano Premium. Solicitou informações sobre preço e vantagens. Aguardando envio da proposta comercial detalhada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
