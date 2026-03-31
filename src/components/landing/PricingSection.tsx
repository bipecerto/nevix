import { motion } from "framer-motion";
import { Check, Workflow } from "lucide-react";

const capabilities = [
  "Responde duvidas automaticamente",
  "Conduz o cliente na conversa",
  "Identifica intencao e necessidade",
  "Coleta informacoes importantes",
  "Encaminha quando necessario",
  "Funciona 24 horas por dia",
  "Seu WhatsApp no automatico",
  "Mais clientes, menos esforco",
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Tudo que seu atendimento precisa, em um unico agente
          </h2>
          <p className="text-muted-foreground text-lg">
            Atendimento inteligente 24/7 com respostas instantaneas e conversas sem pausa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[0, 1].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`relative p-8 rounded-3xl border-2 ${
                idx === 0 ? "border-primary shadow-glow bg-card scale-[1.03]" : "border-border bg-card"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">
                      {idx === 0 ? "Capacidades da agente" : "Atendimento sem pausa"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {idx === 0 ? "Sistema inteligente avancado" : "Seu WhatsApp no automatico"}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {capabilities.slice(idx * 4, idx * 4 + 4).map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
