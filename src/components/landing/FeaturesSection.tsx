import { motion } from "framer-motion";
import { Zap, Tag, StickyNote, Bell, Brain, FileText } from "lucide-react";

const features = [
  { icon: Zap, title: "Respostas rápidas", desc: "Templates prontos para responder em segundos" },
  { icon: Tag, title: "Etiquetas", desc: "Organize clientes por categoria e prioridade" },
  { icon: StickyNote, title: "Notas internas", desc: "Adicione contexto invisível para sua equipe" },
  { icon: Bell, title: "Lembretes", desc: "Nunca mais esqueça um follow-up importante" },
  { icon: Brain, title: "IA que sugere respostas", desc: "Respostas inteligentes com um clique" },
  { icon: FileText, title: "Resumo automático", desc: "IA resume conversas longas para você" },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Tudo que você precisa, <span className="gradient-text">em um lugar</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ferramentas poderosas para transformar seu atendimento.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-medium hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
