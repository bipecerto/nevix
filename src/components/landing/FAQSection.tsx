import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "O Nevix é um chatbot?",
    a: "Não. Ele é uma agente inteligente de atendimento criada para conduzir conversas e organizar a operação, não apenas enviar respostas automáticas.",
  },
  {
    q: "Funciona no WhatsApp?",
    a: "Sim. O Nevix foi pensado para negócios que atendem clientes pelo WhatsApp e precisam de velocidade e organização.",
  },
  {
    q: "Serve para qualquer empresa?",
    a: "Principalmente para empresas que recebem muitas mensagens e precisam ganhar velocidade, organização e escala no atendimento.",
  },
  {
    q: "Preciso de equipe técnica para usar?",
    a: "Não. A proposta do Nevix é ser simples, prática e fácil de operar, sem necessidade de configurações complexas.",
  },
  {
    q: "O Nevix ajuda só a responder mensagens?",
    a: "Não. Ele também ajuda a organizar contatos, manter o fluxo ativo, qualificar leads e estruturar o atendimento completo do seu negócio.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28">
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
