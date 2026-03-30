import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Mensal",
    price: "R$27",
    period: "/mês",
    subtitle: "Para quem está começando",
    features: ["Respostas rápidas", "Etiquetas", "Notas internas", "Lembretes"],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "R$297",
    period: "/ano",
    subtitle: "Ideal para quem atende clientes todos os dias",
    badge: "Mais escolhido 🚀",
    features: ["Tudo do Mensal", "IA integrada", "Multiusuário", "Kanban", "Dashboard completo", "Suporte prioritário"],
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Planos <span className="gradient-text">simples</span>
          </h2>
          <p className="text-muted-foreground text-lg">Comece grátis. Sem surpresas.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-3xl border-2 ${
                plan.highlighted
                  ? "border-primary shadow-glow bg-card scale-[1.03]"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-sm font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.subtitle}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "gradient" : "outline"}
                  className={`w-full rounded-xl py-6 font-bold ${plan.highlighted ? "shadow-glow" : ""}`}
                  asChild
                >
                  <Link to="/app">Começar grátis agora</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Você pode testar qualquer plano por 7 dias grátis.
        </motion.p>
      </div>
    </section>
  );
}
