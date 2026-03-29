import { Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const tags = [
  { name: "Lead", color: "bg-blue-100 text-blue-700", count: 23 },
  { name: "Cliente", color: "bg-green-100 text-green-700", count: 45 },
  { name: "Quente", color: "bg-orange-100 text-orange-700", count: 12 },
  { name: "VIP", color: "bg-purple-100 text-purple-700", count: 8 },
  { name: "Suporte", color: "bg-red-100 text-red-700", count: 15 },
  { name: "Inativo", color: "bg-gray-100 text-gray-600", count: 30 },
];

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Etiquetas</h1>
          <p className="text-muted-foreground">Organize seus contatos por categoria</p>
        </div>
        <Button variant="gradient" className="rounded-xl"><Plus className="h-4 w-4 mr-2" /> Nova etiqueta</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map(t => (
          <div key={t.name} className="p-5 rounded-2xl border border-border bg-card shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${t.color}`}>{t.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{t.count} contatos</span>
          </div>
        ))}
      </div>
    </div>
  );
}
