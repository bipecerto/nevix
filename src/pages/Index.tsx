import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { AISection } from "@/components/landing/AISection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <div id="funcionalidades">
        <FeaturesSection />
      </div>
      <AISection />
      <BenefitsSection />
      <div id="planos">
        <PricingSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
