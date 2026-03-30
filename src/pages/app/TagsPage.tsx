import { Tag, Plus, Pencil, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const tags = [
  { name: "Novo", color: "bg-cyan-500", lightColor: "bg-cyan-50 text-cyan-700", count: 142 },
  { name: "Quente", color: "bg-orange-500", lightColor: "bg-orange-50 text-orange-700", count: 38 },
  { name: "Aguardando", color: "bg-yellow-500", lightColor: "bg-yellow-50 text-yellow-700", count: 45 },
  { name: "Suporte", color: "bg-purple-500", lightColor: "bg-purple-50 text-purple-700", count: 22 },
  { name: "Financeiro", color: "bg-amber-500", lightColor: "bg-amber-50 text-amber-700", count: 18 },
  { name: "Cliente", color: "bg-emerald-500", lightColor: "bg-emerald-50 text-emerald-700", count: 284 },
  { name: "VIP", color: "bg-rose-500", lightColor: "bg-rose-50 text-rose-700", count: 65 },
  { name: "Campanha 01", color: "bg-pink-500", lightColor: "bg-pink-50 text-pink-700", count: 91 },
];

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[26px] font-extrabold tracking-tight">Etiquetas</h1>
          <p className="text-muted-foreground text-[14px]">Organize e segmente sua base de contatos nativamente</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-sm hover:shadow-md transition-shadow font-bold h-10 px-4">
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
