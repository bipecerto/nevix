import { motion } from "framer-motion";
import { MessageSquare, Send, Database, Workflow } from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Entende a mensagem", desc: "O sistema identifica o que o cliente precisa e inicia o atendimento." },
  { icon: Send, title: "Responde automaticamente", desc: "A agente conduz a conversa com rapidez e clareza, sem intervenção manual." },
  { icon: Database, title: "Organiza os contatos", desc: "Cada conversa vira informação útil para sua operação e seus processos." },
  { icon: Workflow, title: "Mantém tudo em movimento", desc: "O atendimento continua fluindo sem depender de resposta manual." },
];

export function FeaturesSection() {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Como o Nevix atua no seu atendimento
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Respostas rápidas e atendimento contínuo — do primeiro contato à conversa organizada.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
