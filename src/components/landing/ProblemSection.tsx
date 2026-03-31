import { motion } from "framer-motion";
import { Stethoscope, Building2, ShoppingBag, Wrench, Headset, Briefcase } from "lucide-react";

const segments = [
  { icon: Stethoscope, text: "Clínicas", desc: "Atendimento rápido, agendamentos organizados e menos ligações perdidas." },
  { icon: ShoppingBag, text: "Lojas", desc: "Respostas instantâneas para vendas, dúvidas e pós-venda." },
  { icon: Building2, text: "Imobiliárias", desc: "Conversa inteligente para qualificar leads e acelerar oportunidades." },
  { icon: Briefcase, text: "Escritórios", desc: "Atendimento padronizado para clientes e parceiros." },
  { icon: Wrench, text: "Empresas de serviços", desc: "Orçamentos, pedidos e suporte organizados em um único lugar." },
  { icon: Headset, text: "Times de suporte", desc: "Conversas sem pausa, com padrão e velocidade em escala." },
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
            Ideal para negócios que recebem mensagens todos os dias
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Se sua operação depende de WhatsApp e atendimento rápido, o Nevix ajuda a transformar volume em organização.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {segments.map((item, i) => (
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
