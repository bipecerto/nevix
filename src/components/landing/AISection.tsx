import { motion } from "framer-motion";
import { Bot, MessageSquare, Palette, FileSearch, Lightbulb } from "lucide-react";

const capabilities = [
  { icon: MessageSquare, text: "Sugere respostas contextuais" },
  { icon: Palette, text: "Ajusta o tom da mensagem" },
  { icon: FileSearch, text: "Resume conversas longas" },
  { icon: Lightbulb, text: "Recomenda próximas ações" },
];

export function AISection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 rounded-full gradient-bg px-4 py-1.5 text-sm font-medium text-primary-foreground">
              <Bot className="h-4 w-4" />
              Inteligência Artificial
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Seu atendente com{" "}
              <span className="gradient-text">inteligência artificial</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A IA do Nevix entende o contexto e ajuda você a responder melhor e mais rápido.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <c.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="font-medium">{c.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
