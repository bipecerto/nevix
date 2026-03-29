import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            A solução? O <span className="gradient-text">Nevix</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O Nevix funciona direto no WhatsApp Web com um painel lateral inteligente.
            Sem trocar de plataforma, sem complicação.
          </p>

          <div className="flex flex-col gap-4 items-start text-left max-w-md mx-auto pt-4">
            {[
              "Funciona direto no WhatsApp Web",
              "Painel lateral com tudo que você precisa",
              "IA integrada para respostas inteligentes",
              "Sem instalação complicada",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
