import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Copy, Zap } from "lucide-react";

const replies = [
  { id: 1, title: "Saudação", shortcut: "/oi", text: "Olá! Tudo bem? Sou [nome] da [empresa]. Como posso te ajudar hoje?" },
  { id: 2, title: "Envio de orçamento", shortcut: "/orcamento", text: "Segue o orçamento conforme conversamos. Qualquer dúvida, estou por aqui!" },
  { id: 3, title: "Follow-up", shortcut: "/followup", text: "Oi! Passando pra saber se conseguiu pensar sobre nossa proposta. Posso te ajudar com algo?" },
  { id: 4, title: "Cobrança leve", shortcut: "/cobranca", text: "Oi! Tudo bem? Notei que o pagamento referente ao [serviço] ainda está em aberto. Posso te ajudar?" },
  { id: 5, title: "Encerramento", shortcut: "/tchau", text: "Foi um prazer te atender! Se precisar de qualquer coisa, é só chamar. Até mais! 👋" },
  { id: 6, title: "Agradecimento", shortcut: "/obrigado", text: "Obrigado pelo contato! Qualquer dúvida, estou sempre por aqui. 😊" },
];

export default function QuickRepliesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Respostas rápidas</h1>
          <p className="text-muted-foreground">Templates de mensagens para responder em segundos</p>
        </div>
        <Button variant="gradient" className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Nova resposta
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {replies.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-3 hover:shadow-medium transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Zap className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">{r.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">{r.shortcut}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
