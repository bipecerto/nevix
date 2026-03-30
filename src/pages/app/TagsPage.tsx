import { Tag, Plus, Pencil, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const tags = [
  { name: "Lead quente", color: "bg-red-500", lightColor: "bg-red-50 text-red-700", count: 23 },
  { name: "Novo contato", color: "bg-blue-500", lightColor: "bg-blue-50 text-blue-700", count: 18 },
  { name: "Aguardando resposta", color: "bg-yellow-500", lightColor: "bg-yellow-50 text-yellow-700", count: 12 },
  { name: "Suporte", color: "bg-orange-500", lightColor: "bg-orange-50 text-orange-700", count: 15 },
  { name: "Financeiro", color: "bg-emerald-500", lightColor: "bg-emerald-50 text-emerald-700", count: 8 },
  { name: "Cliente ativo", color: "bg-green-500", lightColor: "bg-green-50 text-green-700", count: 45 },
  { name: "VIP", color: "bg-purple-500", lightColor: "bg-purple-50 text-purple-700", count: 6 },
  { name: "Inativo", color: "bg-gray-400", lightColor: "bg-gray-100 text-gray-600", count: 30 },
];

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Etiquetas</h1>
          <p className="text-muted-foreground">Organize seus contatos por categoria</p>
        </div>
        <Button variant="gradient" className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Nova etiqueta
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tags.map((t) => (
          <div key={t.name} className="p-5 rounded-2xl border border-border bg-card shadow-soft space-y-3 hover:shadow-medium transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${t.color}`} />
                <span className="font-display font-semibold text-sm">{t.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span className="text-sm">{t.count} contatos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
