import { motion } from "framer-motion";
import { Stethoscope, Building2, ShoppingBag, Wrench, Headset } from "lucide-react";

const problems = [
  { icon: Stethoscope, text: "Clinicas", desc: "Atendimento rapido para novos e antigos clientes." },
  { icon: ShoppingBag, text: "Lojas", desc: "Respostas instantaneas para vendas e pos-venda." },
  { icon: Building2, text: "Imobiliarias", desc: "Conversa inteligente para acelerar oportunidades." },
  { icon: Wrench, text: "Servicos", desc: "Atendimento organizado para pedidos e orcamentos." },
  { icon: Headset, text: "Atendimento e suporte", desc: "Conversas sem pausa, com padrao e velocidade." },
];

export function ProblemSection() {
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
            Ideal para negocios que recebem mensagens todos os dias
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Se o seu WhatsApp nao para, o Nevix transforma isso em um processo automatico.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-medium hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <item.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-foreground block">{item.text}</span>
                <span className="text-sm text-muted-foreground mt-1 block">{item.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
