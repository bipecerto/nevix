import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-[0.03]" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Pare de perder clientes <span className="gradient-text">hoje</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Comece agora e veja a diferença no seu atendimento em minutos.
          </p>
          <div className="pt-4">
            <Button variant="gradient" size="lg" className="text-base px-10 py-7 rounded-xl font-bold shadow-glow" asChild>
              <Link to="/app">
                Testar grátis por 7 dias
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Sem cartão • Cancele quando quiser
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
