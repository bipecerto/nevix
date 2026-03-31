import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Send, Search, Sparkles, Clock, StickyNote, Zap, AlertCircle,
  Check, CheckCheck, Smile, Paperclip, Mic, MoreVertical, Phone, Video,
  ChevronDown, Plus, Image as ImageIcon, ArrowRight, Instagram, FileText,
  MessageSquare, Inbox
} from "lucide-react";
import { useConversations, useMessages } from "@/hooks/useSupabase";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("Todas");
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);

  // Real Supabase queries
  const { data: conversations, isLoading: isLoadingConversations } = useConversations();
  const { data: messages, isLoading: isLoadingMessages } = useMessages(selectedId);
  
  const client = conversations?.find((c: any) => c.id === selectedId) || null;
  const filters = ["Todas", "Lead", "Cliente", "Quente", "Suporte", "Urgente"];

  const handleSelectClient = (id: string) => {
    setIsLoadingTransition(true);
    setSelectedId(id);
    setTimeout(() => setIsLoadingTransition(false), 300); // Simulate network/UI transition nicely
  };

  const getClientName = (conv: any) => conv.contacts?.full_name || conv.contacts?.phone_e164 || "Desconhecido";
  const getTags = () => []; // Real tags should come from contacts or conversations schema

  // EMPTY STATE: If not loading and there are absolutely 0 conversations in the database.
  if (!isLoadingConversations && (!conversations || conversations.length === 0)) {
    return (
      <div className="flex h-[calc(100vh-70px)] -m-6 xl:-m-8 bg-background items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-display font-bold text-foreground mb-2">Nenhuma conversa iniciada</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Quando seus clientes entrarem em contato, as conversas aparecerão aqui para serem organizadas.
          </p>
          <Button variant="outline" className="font-semibold shadow-sm">
            <Plus className="h-4 w-4 mr-2" /> Iniciar nova conversa
          </Button>
        </div>
      </div>
    );
  }

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
          {isLoadingConversations && (
            <div className="p-4 text-center text-sm text-muted-foreground">Carregando conversas...</div>
          )}
          {conversations?.map((c: any) => {
            const isSelected = c.id === selectedId;
            const cName = getClientName(c);
            const cTags = getTags();
            return (
              <div key={c.id} className="px-2 py-1">
                <button
                  onClick={() => handleSelectClient(c.id)}
                  className={`w-full text-left px-3 py-3 rounded-xl flex gap-3 transition-all transform active:scale-[0.98] ${
                    isSelected
                      ? "bg-primary/5 shadow-sm ring-1 ring-primary/10"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <div className="relative flex-shrink-0 mt-0.5">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-base">
                      {cName.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5 truncate">
                         <span className="font-semibold text-[14px] truncate text-foreground/90">{cName}</span>
                      </div>
                      <span className="text-[11px] flex-shrink-0 text-muted-foreground">
                        {c.last_message_at ? new Date(c.last_message_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="text-[13px] truncate flex-1 text-muted-foreground">
                        Nova conversa
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
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
      ) : isLoadingTransition ? (
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
      {/* Column 2 — Chat area */}
      <div className="flex-1 flex flex-col min-w-0 animate-in fade-in duration-300">
        <div className="px-5 py-3 h-16 border-b border-border/60 bg-card/95 backdrop-blur-sm z-10 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm">
                {getClientName(client).charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-foreground leading-none mb-1">{getClientName(client)}</span>
              <span className="text-[12px] text-muted-foreground leading-none">
                Offline
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

        <div
          className="flex-1 px-5 py-6 overflow-y-auto space-y-2"
          style={{
            backgroundColor: "hsl(var(--muted)/0.4)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {isLoadingMessages ? (
            <div className="text-center py-4 text-sm text-muted-foreground">Carregando mensagens...</div>
          ) : messages && messages.length > 0 ? (
            messages.map((m: any) => (
              <div key={m.id} className={`flex ${m.sender_type !== "customer" ? "justify-end" : "justify-start"} mb-1.5`}>
                <div
                  className={`relative max-w-[65%] px-3.5 py-2 text-[14.5px] shadow-sm ${
                    m.sender_type !== "customer"
                      ? "bg-primary/10 border border-primary/10 rounded-2xl rounded-tr-sm text-foreground"
                      : "bg-background border border-border/50 rounded-2xl rounded-tl-sm text-foreground"
                  }`}
                >
                  <p className="leading-relaxed">{m.content}</p>
                  <div className={`flex items-center gap-1 mt-1 -mb-0.5 ${m.sender_type !== "customer" ? "justify-end" : "justify-end"}`}>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center my-4">
              <span className="text-[12px] bg-background/60 backdrop-blur-md text-muted-foreground px-4 py-2 rounded-xl shadow-sm font-medium">
                Nenhuma mensagem iniciada ainda.
              </span>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-card border-t border-border/50 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <textarea
              placeholder="Digite uma mensagem..."
              rows={1}
              className="w-full pl-4 pr-10 py-3 rounded-3xl bg-muted/40 border-transparent text-[15px] focus:outline-none focus:bg-background focus:ring-1 focus:ring-ring/30 focus:border-border transition-all resize-none h-[46px] flex items-center placeholder:text-muted-foreground/60 shadow-inner"
              style={{ overflow: 'hidden' }}
            />
          </div>
          <Button variant="gradient" size="icon" className="h-[46px] w-[46px] rounded-full shrink-0 shadow-md transform hover:scale-105 transition-transform flex items-center justify-center">
            <Send className="h-4 w-4 ml-0.5" />
          </Button>
        </div>
      </div>

      </>
      )}
    </div>
  );
}
