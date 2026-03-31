import { motion } from "framer-motion";
import { Gauge, ShieldCheck, LayoutGrid, TrendingUp, SlidersHorizontal } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, title: "Menos trabalho manual", desc: "O sistema responde por voce." },
  { icon: Gauge, title: "Mais velocidade", desc: "Clientes recebem resposta na hora." },
  { icon: LayoutGrid, title: "Mais organizacao", desc: "Tudo estruturado automaticamente." },
  { icon: TrendingUp, title: "Mais escala", desc: "Atenda muito mais pessoas ao mesmo tempo." },
  { icon: SlidersHorizontal, title: "Mais consistencia", desc: "Mesmo padrao em todas as conversas." },
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
            Atendimento mais rapido, organizado e escalavel
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
