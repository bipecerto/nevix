import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Send, Search, Sparkles, Clock, StickyNote, Zap, AlertCircle,
  Check, CheckCheck, Smile, Paperclip, Mic, MoreVertical, Phone, Video,
  ChevronDown, Plus, Image as ImageIcon, ArrowRight, Instagram, FileText,
  MessageSquare,} from "lucide-react";

const mockClients = [
  { id: 1, name: "Maria Silva", lastMsg: "Sim, por favor! Quais são as vantagens?", time: "10:32", tags: ["Lead", "Novo"], unread: 2, online: true, typing: false, priority: 'alta' },
  { id: 2, name: "João Oliveira", lastMsg: "Obrigado, vou pensar!", time: "09:45", tags: ["Cliente"], unread: 0, online: false, typing: false, priority: 'baixa' },
  { id: 3, name: "Ana Costa", lastMsg: "Quando posso agendar?", time: "Ontem", tags: ["Quente", "Financeiro"], unread: 1, online: true, typing: true, priority: 'alta' },
  { id: 4, name: "Pedro Santos", lastMsg: "Preciso de suporte técnico", time: "Ontem", tags: ["Suporte", "Bug"], unread: 0, online: false, typing: false, priority: 'urgente' },
  { id: 5, name: "Carla Lima", lastMsg: "Fechado! Pode enviar o link", time: "Seg", tags: ["Cliente", "VIP"], unread: 0, online: true, typing: false, priority: 'normal' },
  { id: 6, name: "Lucas Mendes", lastMsg: "Vi o anúncio no Instagram", time: "Seg", tags: ["Lead", "Campanha 01"], unread: 3, online: false, typing: false, priority: 'normal' },
  { id: 7, name: "Fernanda Reis", lastMsg: "Pode me mandar o catálogo?", time: "Dom", tags: ["Lead"], unread: 0, online: false, typing: false, priority: 'baixa' },
  { id: 8, name: "Ricardo Alves", lastMsg: "Tudo certo, obrigado!", time: "Dom", tags: ["Cliente"], unread: 0, online: false, typing: false, priority: 'normal' },
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
  "Lead": "bg-blue-100 text-blue-700 border-blue-200",
  "Cliente": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Quente": "bg-orange-100 text-orange-700 border-orange-200",
  "Suporte": "bg-purple-100 text-purple-700 border-purple-200",
  "VIP": "bg-amber-100 text-amber-700 border-amber-200",
  "Novo": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Financeiro": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Bug": "bg-red-100 text-red-700 border-red-200",
  "Campanha 01": "bg-pink-100 text-pink-700 border-pink-200",
};

export default function ConversationsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("Todas");
  const [isLoading, setIsLoading] = useState(false);
  const client = selected !== null ? mockClients[selected] : null;

  const filters = ["Todas", "Lead", "Cliente", "Quente", "Suporte", "Urgente"];

  const handleSelectClient = (index: number) => {
    setIsLoading(true);
    setSelected(index);
    setTimeout(() => setIsLoading(false), 400); // Simulate network
  };

  return (
    <div className="flex h-[calc(100vh-70px)] -m-6 xl:-m-8 bg-background rounded-none overflow-hidden">
      {/* Column 1 — Chat list (WhatsApp-style) */}
      <div className="w-[340px] border-r border-border/60 flex flex-col flex-shrink-0 bg-card z-10 relative">
        {/* Search header & Filters */}
        <div className="bg-card z-10 sticky top-0 border-b border-border/40">
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Pesquisar..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted/50 border-transparent text-[13px] focus:outline-none focus:bg-background focus:border-ring/30 focus:ring-2 focus:ring-ring/20 transition-all placeholder:text-muted-foreground/60 shadow-sm"
              />
            </div>
          </div>
          {/* Filter pills */}
          <div className="px-3 pb-3 flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  f === filter
                    ? "bg-foreground text-background shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          {mockClients.map((c, i) => (
            <div key={c.id} className="px-2 py-1">
              <button
                onClick={() => handleSelectClient(i)}
                className={`w-full text-left px-3 py-3 rounded-xl flex gap-3 transition-all transform active:scale-[0.98] ${
                  i === selected
                    ? "bg-primary/5 shadow-sm ring-1 ring-primary/10"
                    : "hover:bg-muted/40"
                }`}
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-base">
                    {c.name.charAt(0)}
                  </div>
                  {c.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5 truncate">
                       <span className={`font-semibold text-[14px] truncate ${c.unread > 0 ? "text-foreground font-bold" : "text-foreground/90"}`}>{c.name}</span>
                       {c.priority === 'urgente' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shrink-0" title="Urgente" />}
                       {c.priority === 'alta' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm shrink-0" title="Alta Prioridade" />}
                    </div>
                    <span className={`text-[11px] flex-shrink-0 ${c.unread > 0 ? "text-primary font-bold" : "text-muted-foreground"}`}>
                      {c.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {!c.typing && <CheckCheck className={`h-4 w-4 flex-shrink-0 ${c.unread === 0 ? "text-blue-500" : "text-muted-foreground"}`} />}
                    <div className={`text-[13px] truncate flex-1 ${c.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {c.typing ? (
                        <div className="flex items-center gap-1 text-primary">
                           <span className="italic font-medium text-xs">digitando</span>
                           <span className="flex items-center gap-0.5 mt-1">
                             <span className="w-1 h-1 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                             <span className="w-1 h-1 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                             <span className="w-1 h-1 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                           </span>
                        </div>
                      ) : (
                        c.lastMsg
                      )}
                    </div>
                    {c.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  {/* Tags row */}
                  {c.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      {c.tags.map((t, idx) => (
                        <span key={idx} className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border ${tagColors[t] || "bg-muted text-muted-foreground border-border"}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {!client ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#F9FAFB] dark:bg-muted/10 p-8 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 rounded-full bg-card shadow-sm border border-border flex items-center justify-center mb-6">
            <MessageSquare className="h-8 w-8 text-primary/40" />
          </div>
          <h2 className="text-[20px] font-display font-bold text-foreground mb-2">Pronto para atender!</h2>
          <p className="text-[14px] text-muted-foreground max-w-[320px]">
             Selecione uma conversa na lista para visualizar o histórico de mensagens e gerenciar o CRM do cliente.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex-1 flex items-center justify-center bg-muted/10 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center relative">
               <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
               <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
             <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold animate-pulse">Carregando...</p>
          </div>
        </div>
      ) : (
      <>
      {/* Column 2 — Chat area (WhatsApp-style) */}
      <div className="flex-1 flex flex-col min-w-0 animate-in fade-in duration-300">
        {/* Chat header */}
        <div className="px-5 py-3 h-16 border-b border-border/60 bg-card/95 backdrop-blur-sm z-10 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm">
                {client.name.charAt(0)}
              </div>
              {client.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-foreground leading-none mb-1">{client.name}</span>
              <span className="text-[12px] text-muted-foreground leading-none">
                {client.online ? (
                  <span className="text-emerald-600 font-medium">Online</span>
                ) : (
                  "visto por último às " + client.time
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages area — subtle pattern background like WhatsApp */}
        <div
          className="flex-1 px-5 py-6 overflow-y-auto space-y-2"
          style={{
            backgroundColor: "hsl(var(--muted)/0.4)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Date separator */}
          <div className="flex justify-center mb-4">
            <span className="text-[11px] bg-background/60 backdrop-blur-md text-muted-foreground px-3 py-1 rounded-full shadow-sm font-medium">
              HOJE
            </span>
          </div>

          {mockMessages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} mb-1.5`}>
              <div
                className={`relative max-w-[65%] px-3.5 py-2 text-[14.5px] shadow-sm ${
                  m.from === "me"
                    ? "bg-primary/10 border border-primary/10 rounded-2xl rounded-tr-sm text-foreground"
                    : "bg-background border border-border/50 rounded-2xl rounded-tl-sm text-foreground"
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <div className={`flex items-center gap-1 mt-1 -mb-0.5 ${m.from === "me" ? "justify-end" : "justify-end"}`}>
                  <span className="text-[10px] text-muted-foreground font-medium">{m.time}</span>
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
        <div className="px-4 py-3 bg-card border-t border-border/50 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <textarea
              placeholder="Digite uma mensagem..."
              rows={1}
              className="w-full pl-4 pr-10 py-3 rounded-3xl bg-muted/40 border-transparent text-[15px] focus:outline-none focus:bg-background focus:ring-1 focus:ring-ring/30 focus:border-border transition-all resize-none h-[46px] flex items-center placeholder:text-muted-foreground/60 shadow-inner"
              style={{ overflow: 'hidden' }}
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-primary hover:bg-primary/10">
              <Zap className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="gradient" size="icon" className="h-[46px] w-[46px] rounded-full shrink-0 shadow-md transform hover:scale-105 transition-transform flex items-center justify-center">
            <Send className="h-4 w-4 ml-0.5" />
          </Button>
        </div>
      </div>

      {/* Column 3 — Nevix Smart Panel */}
      <div className="w-[300px] border-l border-border/60 flex-shrink-0 hidden xl:flex flex-col bg-background/50">
        {/* Panel header */}
        <div className="p-6 border-b border-border/60 bg-card flex flex-col items-center gap-3 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 mt-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-3xl shadow-sm ring-4 ring-background">
              {client.name.charAt(0)}
            </div>
            {client.online ? (
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background ring-2 ring-emerald-500/20 shadow-sm" />
            ) : (
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-muted-foreground border-2 border-background shadow-sm" />
            )}
          </div>
          <div className="text-center z-10">
            <p className="font-bold text-[17px] text-foreground mb-1">{client.name}</p>
            <p className="text-[12px] text-muted-foreground font-medium flex items-center justify-center gap-1.5">
              <Phone className="h-3 w-3" /> +55 11 99999-0001
            </p>
          </div>
        </div>

        <div className="p-5 space-y-7 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Big AI button */}
          <button className="relative w-full group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center justify-center gap-2.5 w-full bg-card border border-primary/20 p-3.5 rounded-xl shadow-sm transition-all text-[14px] font-bold text-foreground hover:bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary" /> Sugerir Resposta com IA
            </div>
          </button>

          {/* Quick info cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-card border border-border/60 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Responsável</p>
              <p className="text-[13px] font-bold text-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary shadow-sm" /> João S.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border/60 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Origem</p>
              <p className="text-[13px] font-bold text-foreground flex items-center gap-1.5">
                <Instagram className="h-4 w-4 text-pink-500" /> Instagram
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">Etiquetas</p>
            <div className="flex flex-wrap gap-2">
              {client.tags.map(t => (
                <span key={t} className={`text-[11px] px-3 py-1 rounded-full font-bold border shadow-sm ${tagColors[t] || "bg-muted text-muted-foreground border-border"}`}>
                  {t}
                </span>
              ))}
              <button className="text-[11px] px-3 py-1 rounded-full border border-dashed border-border text-muted-foreground font-medium hover:border-primary hover:text-primary transition-all flex items-center gap-1">
                <Plus className="h-3 w-3" /> Adicionar
              </button>
            </div>
          </div>

          {/* Suggested Action Bar (Próxima Ação) */}
          <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-primary/10 transition-colors group">
            <div className="p-2 rounded-lg bg-primary/20 text-primary shrink-0 group-hover:scale-105 transition-transform">
               <ArrowRight className="h-4 w-4" />
            </div>
            <div className="flex-1">
               <p className="text-[10px] uppercase font-bold text-primary tracking-wider mb-0.5">Próxima Ação IA</p>
               <p className="text-[13px] font-bold text-foreground leading-tight">Enviar link do plano Premium</p>
            </div>
          </div>

          {/* Conversation Summary */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-muted-foreground/70" /> Resumo da Conversa</p>
            <div className="p-4 rounded-xl bg-card border border-border/60 shadow-sm relative overflow-hidden group">
               <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Sparkles className="h-8 w-8 text-primary" />
               </div>
               <p className="text-[13px] text-muted-foreground leading-relaxed relative z-10">
                 Interesse forte no <strong>Plano Premium</strong> via anúncio do Instagram. Perguntou sobre os limites e pediu detalhes dos benefícios antes de fechar. Aguardando a demonstração.
               </p>
            </div>
          </div>

          {/* Reminders section */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
               <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-muted-foreground/70"/> Lembretes</p>
               <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded-md font-bold">2</span>
             </div>
             <div className="space-y-2">
               {/* Overdue */}
               <div className="p-3 flex items-start justify-between rounded-xl bg-red-500/5 border border-red-500/20 shadow-sm relative overflow-hidden group">
                 <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500/60 rounded-l-xl"></div>
                 <div className="pl-1.5 flex gap-2.5">
                   <div className="p-1.5 rounded-lg bg-red-500/10 text-red-600 mt-0.5">
                     <AlertCircle className="h-4 w-4" />
                   </div>
                   <div>
                     <p className="text-[13px] text-foreground font-bold leading-tight mb-0.5">Retornar ligação</p>
                     <p className="text-[11px] text-red-500 font-bold">Vencido ontem</p>
                   </div>
                 </div>
                 <button className="text-[10px] bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white px-2 py-1 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95">
                   <Check className="h-3 w-3" />
                 </button>
               </div>

               {/* Today */}
               <div className="p-3 flex items-start justify-between rounded-xl bg-card border border-border/60 shadow-sm relative overflow-hidden group">
                 <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500/60 rounded-l-xl"></div>
                 <div className="pl-1.5 flex gap-2.5">
                   <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 mt-0.5">
                     <Clock className="h-4 w-4" />
                   </div>
                   <div>
                     <p className="text-[13px] text-foreground font-bold leading-tight mb-0.5">Enviar proposta comercial</p>
                     <p className="text-[11px] text-emerald-600 font-bold">Hoje às 14:00</p>
                   </div>
                 </div>
                 <button className="text-[10px] bg-muted/50 text-muted-foreground hover:bg-emerald-500 hover:text-white px-2 py-1 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95">
                   <Check className="h-3 w-3" />
                 </button>
               </div>
             </div>
          </div>

          {/* Internal note */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><StickyNote className="h-3.5 w-3.5 text-muted-foreground/70" /> Nota Interna</p>
            <div className="relative group">
              <textarea
                placeholder="Adicione uma nota visível só para equipe..."
                className="w-full text-[13px] p-4 pb-10 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/50 resize-none h-28 focus:outline-none focus:ring-1 focus:ring-amber-400/50 placeholder:text-muted-foreground/50 shadow-sm transition-all"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                 <span className="text-[10px] text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity">Salva auto.</span>
                 <StickyNote className="h-4 w-4 text-amber-500/60" />
              </div>
            </div>
          </div>

        </div>
      </div>
      </>
      )}
    </div>
  );
}
