import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Send, Search, Sparkles, Clock, StickyNote, Zap, AlertCircle,
  Check, CheckCheck, Smile, Paperclip, Mic, MoreVertical, Phone, Video,
  ChevronDown, Plus, Image as ImageIcon
} from "lucide-react";

const mockClients = [
  { id: 1, name: "Maria Silva", lastMsg: "Sim, por favor! Quais são as vantagens?", time: "10:32", tags: ["Lead"], unread: 2, online: true, typing: false },
  { id: 2, name: "João Oliveira", lastMsg: "Obrigado, vou pensar!", time: "09:45", tags: ["Cliente"], unread: 0, online: false, typing: false },
  { id: 3, name: "Ana Costa", lastMsg: "Quando posso agendar?", time: "Ontem", tags: ["Quente"], unread: 1, online: true, typing: true },
  { id: 4, name: "Pedro Santos", lastMsg: "Preciso de suporte técnico", time: "Ontem", tags: ["Suporte"], unread: 0, online: false, typing: false },
  { id: 5, name: "Carla Lima", lastMsg: "Fechado! Pode enviar o link", time: "Seg", tags: ["Cliente", "VIP"], unread: 0, online: true, typing: false },
  { id: 6, name: "Lucas Mendes", lastMsg: "Vi o anúncio no Instagram", time: "Seg", tags: ["Lead"], unread: 3, online: false, typing: false },
  { id: 7, name: "Fernanda Reis", lastMsg: "Pode me mandar o catálogo?", time: "Dom", tags: ["Lead"], unread: 0, online: false, typing: false },
  { id: 8, name: "Ricardo Alves", lastMsg: "Tudo certo, obrigado!", time: "Dom", tags: ["Cliente"], unread: 0, online: false, typing: false },
];

const mockMessages = [
  { from: "client", text: "Olá! Boa tarde 😊", time: "10:25", status: "read" },
  { from: "me", text: "Oi Maria! Tudo bem? Como posso te ajudar?", time: "10:26", status: "read" },
  { from: "client", text: "Tudo sim! Eu vi o anúncio de vocês no Instagram e fiquei interessada", time: "10:27", status: "read" },
  { from: "me", text: "Que legal! Você viu sobre qual produto?", time: "10:28", status: "read" },
  { from: "client", text: "Sobre o plano premium. Gostaria de saber o preço", time: "10:29", status: "read" },
  { from: "me", text: "O plano Premium custa R$297/ano. Ele inclui IA, multiusuário, kanban e dashboard completo. Quer que eu te explique os benefícios? 🚀", time: "10:30", status: "read" },
  { from: "client", text: "Sim, por favor! Quais são as vantagens?", time: "10:32", status: "read" },
];

const tagColors: Record<string, string> = {
  Lead: "bg-blue-100 text-blue-700 border-blue-200",
  Cliente: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Quente: "bg-orange-100 text-orange-700 border-orange-200",
  Suporte: "bg-purple-100 text-purple-700 border-purple-200",
  VIP: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function ConversationsPage() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("Todas");
  const client = mockClients[selected];

  const filters = ["Todas", "Lead", "Cliente", "Quente", "Suporte"];

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 bg-background rounded-none overflow-hidden">
      {/* Column 1 — Chat list (WhatsApp-style) */}
      <div className="w-[340px] border-r border-border flex flex-col flex-shrink-0 bg-card">
        {/* Search header */}
        <div className="px-3 py-3 bg-muted/30 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Pesquisar ou começar nova conversa"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-b border-border/50 bg-card">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                f === filter
                  ? "gradient-bg text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {mockClients.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-3 py-3 flex gap-3 transition-colors border-b border-border/30 ${
                i === selected
                  ? "bg-accent/60"
                  : "hover:bg-muted/40"
              }`}
            >
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-base">
                  {c.name.charAt(0)}
                </div>
                {c.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold text-sm text-foreground truncate">{c.name}</span>
                  <span className={`text-[11px] flex-shrink-0 ${c.unread > 0 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                    {c.time}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {!c.typing && <CheckCheck className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />}
                  <p className="text-xs text-muted-foreground truncate flex-1">
                    {c.typing ? (
                      <span className="text-primary font-medium italic">digitando...</span>
                    ) : (
                      c.lastMsg
                    )}
                  </p>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full gradient-bg text-primary-foreground text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
                {/* Tags row */}
                <div className="flex items-center gap-1 mt-1.5">
                  {c.tags.map(t => (
                    <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${tagColors[t] || "bg-muted text-muted-foreground border-border"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Column 2 — Chat area (WhatsApp-style) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="px-4 py-2.5 border-b border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm">
                {client.name.charAt(0)}
              </div>
              {client.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
              )}
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">{client.name}</div>
              <div className="text-xs text-muted-foreground">
                {client.online ? (
                  <span className="text-emerald-600 font-medium">online</span>
                ) : (
                  "visto por último às " + client.time
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages area — subtle pattern background like WhatsApp */}
        <div
          className="flex-1 px-4 py-4 overflow-y-auto space-y-1"
          style={{
            backgroundColor: "hsl(var(--muted) / 0.3)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Date separator */}
          <div className="flex justify-center mb-3">
            <span className="text-[11px] bg-card/90 backdrop-blur-sm text-muted-foreground px-3 py-1 rounded-lg shadow-sm border border-border/50 font-medium">
              Hoje
            </span>
          </div>

          {mockMessages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} mb-1`}>
              <div
                className={`relative max-w-[65%] px-3 py-2 text-sm shadow-sm ${
                  m.from === "me"
                    ? "bg-primary/10 border border-primary/15 rounded-2xl rounded-tr-sm text-foreground"
                    : "bg-card border border-border rounded-2xl rounded-tl-sm text-foreground"
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 -mb-0.5`}>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                  {m.from === "me" && (
                    <CheckCheck className="h-3.5 w-3.5 text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* AI suggestion floating card */}
          <div className="flex justify-end mt-3">
            <div className="max-w-[65%] p-3 rounded-2xl border-2 border-dashed border-primary/30 bg-accent/50 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-[11px] font-semibold text-primary">Sugestão da IA</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                "Com certeza, Maria! As principais vantagens do Premium são: IA integrada, suporte multiusuário, kanban para organizar clientes e dashboard com métricas. Posso te enviar uma proposta detalhada?"
              </p>
              <div className="flex gap-2 mt-2.5">
                <Button variant="gradient" size="sm" className="rounded-lg text-[11px] h-7 px-3">
                  <Send className="h-3 w-3 mr-1" /> Enviar
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg text-[11px] h-7 px-3">
                  Editar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Input area — WhatsApp-style */}
        <div className="px-3 py-2.5 border-t border-border bg-card flex items-end gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <input
              placeholder="Digite uma mensagem"
              className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground flex-shrink-0">
            <Zap className="h-5 w-5" />
          </Button>
          <Button variant="gradient" size="icon" className="h-10 w-10 rounded-full flex-shrink-0 shadow-md">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Column 3 — Nevix Smart Panel */}
      <div className="w-[300px] border-l border-border flex-shrink-0 overflow-y-auto hidden xl:flex flex-col bg-card">
        {/* Panel header */}
        <div className="p-4 border-b border-border bg-muted/20">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-2xl">
                {client.name.charAt(0)}
              </div>
              {client.online && (
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card" />
              )}
            </div>
            <div className="text-center">
              <p className="font-bold text-sm text-foreground">{client.name}</p>
              <p className="text-xs text-muted-foreground">+55 11 99999-0001</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                {client.online ? "Online agora" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 flex-1">
          {/* Big AI button */}
          <Button variant="gradient" className="w-full rounded-xl text-sm h-12 shadow-md hover:shadow-lg transition-shadow">
            <Sparkles className="h-5 w-5 mr-2" /> Sugerir resposta com IA
          </Button>

          {/* Tags */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Etiquetas</p>
            <div className="flex flex-wrap gap-1.5">
              {client.tags.map(t => (
                <span key={t} className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${tagColors[t] || "bg-muted text-muted-foreground border-border"}`}>
                  {t}
                </span>
              ))}
              <button className="text-[11px] px-2.5 py-1 rounded-full border border-dashed border-primary/40 text-primary/70 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-0.5">
                <Plus className="h-3 w-3" /> Adicionar
              </button>
            </div>
          </div>

          {/* Quick info cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
              <p className="text-[10px] text-muted-foreground mb-1">Responsável</p>
              <p className="text-xs font-semibold text-foreground">João S.</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
              <p className="text-[10px] text-muted-foreground mb-1">Origem</p>
              <p className="text-xs font-semibold text-foreground">Instagram</p>
            </div>
          </div>

          {/* Reminder */}
          <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <p className="text-xs font-bold text-foreground">Lembrete</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">Hoje</span>
            </div>
            <p className="text-xs text-muted-foreground">Enviar proposta comercial</p>
            <p className="text-[11px] text-primary font-semibold">14:00</p>
            <Button variant="outline" size="sm" className="w-full rounded-lg text-xs h-8 border-primary/30 text-primary hover:bg-primary/5">
              <Plus className="h-3 w-3 mr-1" /> Criar lembrete
            </Button>
          </div>

          {/* Internal note */}
          <div className="p-3 rounded-xl border border-border bg-background space-y-2">
            <div className="flex items-center gap-1.5">
              <StickyNote className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold text-foreground">Nota interna</p>
            </div>
            <textarea
              placeholder="Escreva uma nota sobre este cliente..."
              className="w-full text-xs p-2.5 rounded-lg border border-input bg-muted/30 resize-none h-16 focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Suggested actions */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Próximas ações</p>
            <div className="space-y-1.5">
              {[
                "Enviar proposta de preços",
                "Agendar follow-up em 2 dias",
                "Adicionar ao funil Premium",
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-accent/50 border border-accent text-xs text-foreground hover:bg-accent hover:border-primary/20 transition-all text-left"
                >
                  <AlertCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <span>{action}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation summary */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Resumo da conversa</p>
            <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cliente interessada no plano Premium. Veio via Instagram. Solicitou informações sobre preço e vantagens. Aguardando envio da proposta comercial detalhada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
