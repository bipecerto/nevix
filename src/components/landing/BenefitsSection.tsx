import { motion } from "framer-motion";
import { Zap, Bell, LayoutGrid, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Responda em segundos", desc: "Templates e IA para atender clientes instantaneamente" },
  { icon: Bell, title: "Nunca esqueça follow-up", desc: "Lembretes automáticos para cada oportunidade" },
  { icon: LayoutGrid, title: "Mais organização", desc: "Etiquetas, notas e filtros para controlar tudo" },
  { icon: TrendingUp, title: "Mais vendas", desc: "Converta mais leads com atendimento profissional" },
];

export function BenefitsSection() {
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
            Resultados <span className="gradient-text">reais</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto">
                <b.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
