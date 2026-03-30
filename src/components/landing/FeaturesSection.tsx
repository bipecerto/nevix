import { motion } from "framer-motion";
import { Zap, Tag, StickyNote, Bell, Brain, FileText } from "lucide-react";

const features = [
  { icon: Zap, title: "Respostas rápidas", desc: "Responda qualquer cliente em segundos com templates prontos" },
  { icon: Tag, title: "Etiquetas", desc: "Saiba exatamente quem é cada cliente e o que ele precisa" },
  { icon: StickyNote, title: "Notas internas", desc: "Compartilhe contexto com sua equipe sem o cliente ver" },
  { icon: Bell, title: "Lembretes", desc: "Nunca mais perca um follow-up — o Nevix avisa você" },
  { icon: Brain, title: "IA que sugere respostas", desc: "Responda com qualidade, mesmo quando não sabe o que dizer" },
  { icon: FileText, title: "Resumo automático", desc: "Entenda qualquer conversa longa em segundos" },
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
