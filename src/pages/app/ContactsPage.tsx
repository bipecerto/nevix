import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Phone, Mail } from "lucide-react";

const filters = ["Todos", "Lead quente", "Aguardando", "Cliente ativo", "Suporte", "Finalizado"];

const contacts = [
  { name: "Maria Silva", phone: "+55 11 99999-0001", tag: "Lead quente", responsible: "João S.", lastContact: "Hoje", status: "Ativo" },
  { name: "João Oliveira", phone: "+55 11 99999-0002", tag: "Cliente ativo", responsible: "Maria S.", lastContact: "Ontem", status: "Ativo" },
  { name: "Ana Costa", phone: "+55 11 99999-0003", tag: "Lead quente", responsible: "João S.", lastContact: "Ontem", status: "Aguardando" },
  { name: "Pedro Santos", phone: "+55 11 99999-0004", tag: "Suporte", responsible: "Pedro C.", lastContact: "25/03", status: "Ativo" },
  { name: "Carla Lima", phone: "+55 11 99999-0005", tag: "Cliente ativo", responsible: "João S.", lastContact: "Seg", status: "Ativo" },
  { name: "Lucas Mendes", phone: "+55 11 99999-0006", tag: "Lead quente", responsible: "Maria S.", lastContact: "Seg", status: "Novo" },
  { name: "Fernanda Rocha", phone: "+55 11 99999-0007", tag: "Aguardando", responsible: "Pedro C.", lastContact: "20/03", status: "Aguardando" },
  { name: "Rafael Souza", phone: "+55 11 99999-0008", tag: "Finalizado", responsible: "João S.", lastContact: "15/03", status: "Inativo" },
];

const tagColors: Record<string, string> = {
  "Lead quente": "bg-red-50 text-red-700",
  "Cliente ativo": "bg-green-50 text-green-700",
  "Suporte": "bg-blue-50 text-blue-700",
  "Aguardando": "bg-yellow-50 text-yellow-700",
  "Finalizado": "bg-muted text-muted-foreground",
};

const statusColors: Record<string, string> = {
  Ativo: "bg-green-100 text-green-700",
  Aguardando: "bg-yellow-100 text-yellow-700",
  Novo: "bg-accent text-accent-foreground",
  Inativo: "bg-muted text-muted-foreground",
};

export default function ContactsPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">Gerencie seus clientes e leads</p>
        </div>
        <Button variant="gradient" className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Novo contato
        </Button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                f === activeFilter
                  ? "gradient-bg text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar contato..."
            className="pl-9 pr-4 py-2 w-56 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Nome</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Telefone</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Etiqueta</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Responsável</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Último contato</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="p-4 text-xs font-medium text-muted-foreground w-12"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{c.phone}</td>
                  <td className="p-4">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${tagColors[c.tag] || "bg-muted text-muted-foreground"}`}>
                      {c.tag}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{c.responsible}</td>
                  <td className="p-4 text-sm text-muted-foreground">{c.lastContact}</td>
                  <td className="p-4">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusColors[c.status] || "bg-muted text-muted-foreground"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
