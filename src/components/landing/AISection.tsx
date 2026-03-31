import { motion } from "framer-motion";
import {
  MessageSquare,
  Route,
  Database,
  Clock,
  Workflow,
  Users,
} from "lucide-react";

const capabilities = [
  { icon: MessageSquare, text: "Responde dúvidas automaticamente" },
  { icon: Route, text: "Conduz o cliente durante a conversa" },
  { icon: Database, text: "Organiza dados importantes" },
  { icon: Users, text: "Ajuda a qualificar contatos" },
  { icon: Clock, text: "Funciona 24 horas por dia" },
  { icon: Workflow, text: "Mantém consistência no atendimento" },
];

export function AISection() {
  return (
    <section id="o-que-faz" className="py-20 md:py-28 relative overflow-hidden">
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
              <Workflow className="h-4 w-4" />
              Atendimento inteligente avançado
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Não é só resposta automática.{" "}
              <span className="gradient-text">É atendimento inteligente.</span>
            </h2>
            <p className="text-foreground/80 text-lg font-medium max-w-2xl mx-auto">
              O Nevix vai além de respostas prontas. Ele ajuda a conduzir a conversa, organizar o processo e acelerar o atendimento do seu negócio.
            </p>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Transforme mensagens em atendimento real.
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
