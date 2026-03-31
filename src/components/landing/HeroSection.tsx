import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Tag, Bell, MessageSquare, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

function WhatsAppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative max-w-4xl mx-auto mt-16"
    >
      <div className="rounded-2xl border border-border bg-card shadow-medium overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">web.whatsapp.com</span>
        </div>

        <div className="flex min-h-[280px] md:min-h-[340px]">
          {/* Chat list */}
          <div className="w-1/3 border-r border-border bg-card p-3 space-y-2 hidden sm:block">
            {[
              { name: "Maria Silva", msg: "Olá, gostaria de saber...", time: "10:32", unread: true },
              { name: "João Santos", msg: "Pode me enviar o orçamento?", time: "09:15", unread: true },
              { name: "Ana Costa", msg: "Obrigada pelo atendimento!", time: "Ontem", unread: false },
              { name: "Pedro Lima", msg: "Quando chega o pedido?", time: "Ontem", unread: false },
            ].map((c, i) => (
              <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs ${i === 0 ? "bg-accent" : "hover:bg-muted/50"} transition-colors`}>
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-muted-foreground font-semibold text-[10px]">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground truncate">{c.name}</span>
                    <span className="text-muted-foreground text-[10px]">{c.time}</span>
                  </div>
                  <p className="text-muted-foreground truncate">{c.msg}</p>
                </div>
                {c.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
            ))}
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col bg-muted/20 relative">
            <div className="px-4 py-2.5 border-b border-border bg-card flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">MS</div>
              <span className="font-semibold text-sm text-foreground">Maria Silva</span>
            </div>
            <div className="flex-1 p-4 space-y-2 text-xs">
              <div className="bg-card border border-border rounded-xl px-3 py-2 max-w-[70%] text-foreground">
                Oi, pode me ajudar?
              </div>
              <div className="bg-primary/10 rounded-xl px-3 py-2 max-w-[70%] ml-auto text-foreground">
                Claro! Me conta o que você precisa que eu te ajudo agora 👇
              </div>
              <div className="bg-primary/10 rounded-xl px-3 py-2 max-w-[70%] ml-auto text-foreground">
                Perfeito 👍 ja entendi. Vou te passar as melhores opcoes.
              </div>
            </div>
          </div>

          {/* Nevix side panel */}
          <div className="w-[200px] md:w-[240px] border-l border-border bg-card p-3 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <div className="w-5 h-5 rounded gradient-bg flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xs text-foreground">Nevix</span>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                <Tag className="h-3 w-3" /> Etiquetas
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">Lead</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-medium">WhatsApp</span>
              </div>
            </div>

            {/* AI button */}
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg gradient-bg text-primary-foreground text-[10px] font-semibold">
              <Workflow className="h-3.5 w-3.5" />
              Atendimento sem pausa
            </button>

            {/* Reminder */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                <Bell className="h-3 w-3" /> Lembrete
              </div>
              <div className="bg-accent rounded-lg p-2 text-[10px] text-accent-foreground">
                Atendimento inteligente 24/7
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                <MessageSquare className="h-3 w-3" /> Nota interna
              </div>
              <div className="bg-muted rounded-lg p-2 text-[10px] text-muted-foreground">
                Respostas instantaneas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind mockup */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Workflow className="h-4 w-4" />
            Atendimento inteligente 24/7
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Seu atendimento funcionando sozinho, todos os dias
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed">
            O Nevix e uma agente inteligente que responde clientes, organiza contatos e conduz o atendimento automaticamente, sem depender de equipe.
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Atendimento inteligente direto no WhatsApp
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button variant="outline" size="lg" className="text-base px-9 py-7 rounded-xl font-bold" asChild>
              <Link to="/app">
                Ver como funciona
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="gradient" size="lg" className="text-base px-9 py-7 rounded-xl font-bold shadow-glow" asChild>
              <Link to="/app">
                Testar demonstracao
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <WhatsAppMockup />
      </div>
    </section>
  );
}
