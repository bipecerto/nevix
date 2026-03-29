import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

const replies = [
  { id: 1, title: "Saudação", text: "Olá! Tudo bem? Sou [nome] da [empresa]. Como posso te ajudar?" },
  { id: 2, title: "Preço", text: "Nossos planos começam a partir de R$27/mês. Quer que eu te envie os detalhes?" },
  { id: 3, title: "Agradecimento", text: "Obrigado pelo contato! Qualquer dúvida, estou por aqui. 😊" },
  { id: 4, title: "Follow-up", text: "Oi! Passando pra saber se conseguiu pensar sobre nossa proposta. Posso te ajudar?" },
  { id: 5, title: "Encerramento", text: "Foi um prazer te atender! Se precisar, é só chamar. Até mais! 👋" },
];

export default function QuickRepliesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Respostas rápidas</h1>
          <p className="text-muted-foreground">Templates de mensagens para responder em segundos</p>
        </div>
        <Button variant="gradient" className="rounded-xl"><Plus className="h-4 w-4 mr-2" /> Nova resposta</Button>
      </div>

      <div className="space-y-3">
        {replies.map(r => (
          <div key={r.id} className="p-5 rounded-2xl border border-border bg-card shadow-soft flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <h3 className="font-display font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-3.5 w-3.5" /></Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
