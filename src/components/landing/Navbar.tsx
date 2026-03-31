import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-extrabold text-xl">Nevix</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#inicio" className="hover:text-foreground transition-colors">Início</a>
          <a href="#funcionalidades" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#planos" className="hover:text-foreground transition-colors">O que faz</a>
          <a href="#beneficios" className="hover:text-foreground transition-colors">Benefícios</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app">Entrar</Link>
          </Button>
          <Button variant="gradient" size="sm" className="rounded-lg" asChild>
            <Link to="/app">Ver demo</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
