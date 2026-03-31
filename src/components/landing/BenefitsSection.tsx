import { motion } from "framer-motion";
import { Gauge, ShieldCheck, LayoutGrid, TrendingUp, SlidersHorizontal } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, title: "Menos trabalho manual", desc: "A agente assume as respostas para você focar no que importa." },
  { icon: Gauge, title: "Mais velocidade nas respostas", desc: "Clientes recebem atendimento imediato, a qualquer hora." },
  { icon: LayoutGrid, title: "Mais organização no atendimento", desc: "Tudo centralizado e estruturado automaticamente." },
  { icon: TrendingUp, title: "Mais controle sobre os contatos", desc: "Histórico, etiquetas e dados organizados em um só lugar." },
  { icon: SlidersHorizontal, title: "Mais escala para crescer", desc: "Atenda muito mais pessoas sem aumentar a equipe." },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Atendimento mais rápido, organizado e escalável
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Menos esforço manual, mais eficiência — para negócios que precisam crescer sem travar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
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
