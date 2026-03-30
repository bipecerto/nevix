import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Copy, Zap } from "lucide-react";

const replies = [
  { id: 1, title: "Saudação - Primeiro Contato", shortcut: "/oi", text: "Olá [nome]! Tudo bem? Sou da equipe comercial. Vi que você se interessou pelo nosso plano, posso te explicar como funciona rapidamente?" },
  { id: 2, title: "Envio de Proposta (Link)", shortcut: "/proposta", text: "Excelente, [nome]! Acabei de gerar o link da sua proposta comercial atualizada. Confere todos os detalhes aqui: [link]. Me avisa quando puder dar uma olhada?" },
  { id: 3, title: "Follow-up (Esfriando)", shortcut: "/follow", text: "Oi [nome]! Tudo bem? Estou passando rapidinho pra saber se conseguiu analisar nossa última conversa. Posso te ajudar a resolver alguma dúvida que tenha ficado?" },
  { id: 4, title: "Cobrança Amigável", shortcut: "/cobranca", text: "Olá [nome], tudo ótimo? Notei que o documento [doc] ainda consta em aberto no sistema. Se precisar de uma segunda via ou reagendar o vencimento, é só me falar!" },
  { id: 5, title: "Encerramento e NPS", shortcut: "/tchau", text: "Foi um prazer bater esse papo com você, [nome]! Vou deixar anotado e, qualquer necessidade futura, nossa equipe estará 100% à disposição. Um abraço! 🚀" },
  { id: 6, title: "Transferência (Financeiro)", shortcut: "/financeiro", text: "Compreendo. Vou transferir seu atendimento para o nosso time financeiro agora mesmo para que eles verifiquem isso mais rápido, ok? Só um minuto." },
];

export default function QuickRepliesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[26px] font-extrabold tracking-tight">Respostas Rápidas</h1>
          <p className="text-muted-foreground text-[14px]">Templates de mensagens para acelerar seus atendimentos</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-sm hover:shadow-md transition-shadow font-bold h-10 px-4">
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
