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
            Deixe seu atendimento no automatico
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ative o Nevix e tenha uma agente inteligente trabalhando para voce todos os dias.
          </p>
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="gradient" size="lg" className="text-base px-10 py-7 rounded-xl font-bold shadow-glow" asChild>
                <Link to="/app">
                  Quero ver funcionando
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-10 py-7 rounded-xl font-bold" asChild>
                <Link to="/app">Comecar agora</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Atendimento inteligente 24/7 • Respostas instantaneas • Atendimento sem pausa
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
