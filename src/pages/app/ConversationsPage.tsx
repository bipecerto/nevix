import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Tag, StickyNote, Send } from "lucide-react";

const mockClients = [
  { id: 1, name: "Maria Silva", lastMsg: "Olá, gostaria de saber o preço...", time: "10:32", tags: ["Lead"], unread: 2 },
  { id: 2, name: "João Oliveira", lastMsg: "Obrigado, vou pensar!", time: "09:45", tags: ["Cliente"], unread: 0 },
  { id: 3, name: "Ana Costa", lastMsg: "Quando posso agendar?", time: "Ontem", tags: ["Quente"], unread: 1 },
  { id: 4, name: "Pedro Santos", lastMsg: "Preciso de suporte", time: "Ontem", tags: ["Suporte"], unread: 0 },
  { id: 5, name: "Carla Lima", lastMsg: "Fechado! Pode enviar o link", time: "Seg", tags: ["Cliente", "VIP"], unread: 0 },
];

const mockMessages = [
  { from: "client", text: "Olá, gostaria de saber o preço do plano premium", time: "10:30" },
  { from: "me", text: "Oi Maria! O plano Premium custa R$297/ano. Quer que eu te explique os benefícios?", time: "10:31" },
  { from: "client", text: "Sim, por favor! Quais são as vantagens?", time: "10:32" },
];

export default function ConversationsPage() {
  const [selected, setSelected] = useState(0);
  const client = mockClients[selected];

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6">
      {/* Client list */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <input
            placeholder="Buscar conversa..."
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
          />
        </div>
        <div className="flex-1 overflow-auto">
          {mockClients.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-4 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                i === selected ? "bg-accent" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[160px]">{c.lastMsg}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{c.time}</div>
                  {c.unread > 0 && (
                    <div className="mt-1 w-5 h-5 rounded-full gradient-bg text-primary-foreground text-xs flex items-center justify-center ml-auto">
                      {c.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
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
            <Button variant="outline" size="sm"><Tag className="h-3.5 w-3.5 mr-1" /> Etiqueta</Button>
            <Button variant="outline" size="sm"><StickyNote className="h-3.5 w-3.5 mr-1" /> Nota</Button>
            <Button variant="gradient" size="sm"><Brain className="h-3.5 w-3.5 mr-1" /> Sugerir com IA</Button>
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

        <div className="p-4 border-t border-border flex gap-3">
          <input
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm"
          />
          <Button variant="gradient" size="icon" className="rounded-xl h-10 w-10">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
