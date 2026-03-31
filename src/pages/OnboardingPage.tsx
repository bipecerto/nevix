import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Button } from "@/components/ui/button";
import { Sparkles, Building2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { createWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const ws = await createWorkspace(name.trim());
    if (ws) {
      toast.success("Workspace criada com sucesso!");
      navigate("/app");
    } else {
      toast.error("Erro ao criar workspace. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight">Nevix</span>
          </div>
          <h1 className="text-xl font-bold mb-2">Crie sua workspace</h1>
          <p className="text-muted-foreground text-sm">
            Dê um nome à sua empresa ou equipe para começar a usar o Nevix.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-soft p-8">
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome da workspace</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ex: Minha Empresa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full rounded-xl h-11 font-semibold text-sm"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar e começar"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
