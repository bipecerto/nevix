import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "Funciona no celular?", a: "O Nevix é otimizado para o WhatsApp Web no desktop, mas você pode acessar o dashboard pelo celular normalmente." },
  { q: "Precisa instalar alguma coisa?", a: "Não! O Nevix funciona como uma extensão no seu navegador. Basta ativar e começar a usar." },
  { q: "Posso cancelar a qualquer momento?", a: "Sim, sem burocracia. Cancele quando quiser, sem multas ou taxas." },
  { q: "Tem teste grátis?", a: "Sim! Você pode testar todas as funcionalidades por 7 dias sem precisar de cartão de crédito." },
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
