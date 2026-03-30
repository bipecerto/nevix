import { motion } from "framer-motion";
import { UserX, Clock, FolderX, TrendingDown } from "lucide-react";

const problems = [
  { icon: UserX, text: "Clientes esquecidos = dinheiro perdido", desc: "Cada lead sem resposta é uma venda que vai pro concorrente." },
  { icon: Clock, text: "Responder tarde = cliente compra do concorrente", desc: "Quem demora para atender, perde a venda na hora." },
  { icon: FolderX, text: "Conversas desorganizadas = menos vendas", desc: "Sem controle, você não sabe quem precisa de atenção." },
  { icon: TrendingDown, text: "Sem follow-up = oportunidades perdidas", desc: "A maioria das vendas acontece no segundo ou terceiro contato." },
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
            Você está <span className="gradient-text">perdendo vendas</span> sem perceber
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Se você usa o WhatsApp para vender, esses problemas são seus também.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-destructive/5 border border-destructive/10"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-destructive" />
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
