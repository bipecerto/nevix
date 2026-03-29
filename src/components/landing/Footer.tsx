import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">Nevix</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nevix. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
