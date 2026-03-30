import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function UrgencySection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-4 p-8 rounded-2xl border border-primary/20 bg-accent"
        >
          <AlertCircle className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Você tem clientes esperando resposta <span className="gradient-text">agora</span>.
          </h3>
          <p className="text-muted-foreground">
            Cada minuto sem responder é uma venda que pode ir embora. Não espere mais.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
