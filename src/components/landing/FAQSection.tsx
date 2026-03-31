import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "O Nevix e um chatbot?", a: "Nao. E uma agente inteligente que conduz o atendimento de forma automatica." },
  { q: "Funciona no WhatsApp?", a: "Sim, o Nevix atua diretamente nas conversas com clientes." },
  { q: "Preciso configurar algo complexo?", a: "Nao. O sistema ja vem pronto para operar." },
  { q: "Serve para qualquer negocio?", a: "Sim, especialmente para quem recebe muitas mensagens." },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Perguntas <span className="gradient-text">frequentes</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-display font-semibold text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
