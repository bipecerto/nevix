import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Phone, Mail } from "lucide-react";

const filters = ["Todos", "Novo", "Quente", "Financeiro", "Suporte", "Campanha 01"];

const contacts = [
  { name: "Maria Silva", phone: "+55 11 99999-0001", tag: "Novo", responsible: "João S.", lastContact: "Hoje, 10:32", status: "Ativo" },
  { name: "João Oliveira", phone: "+55 11 99999-0002", tag: "Cliente", responsible: "Carla D.", lastContact: "Ontem, 09:45", status: "Ativo" },
  { name: "Ana Costa", phone: "+55 11 99999-0003", tag: "Quente", responsible: "João S.", lastContact: "Ontem, 16:20", status: "Aguardando" },
  { name: "Pedro Santos", phone: "+55 11 99999-0004", tag: "Suporte", responsible: "Marcos V.", lastContact: "25/03", status: "Ativo" },
  { name: "Carla Lima", phone: "+55 11 99999-0005", tag: "VIP", responsible: "João S.", lastContact: "Segunda", status: "Ativo" },
  { name: "Lucas Mendes", phone: "+55 11 99999-0006", tag: "Campanha 01", responsible: "Carla D.", lastContact: "Segunda", status: "Ativo" },
  { name: "Fernanda Rocha", phone: "+55 11 99999-0007", tag: "Aguardando", responsible: "Marcos V.", lastContact: "20/03", status: "Inativo" },
  { name: "Rafael Souza", phone: "+55 11 99999-0008", tag: "Financeiro", responsible: "João S.", lastContact: "15/03", status: "Inativo" },
];

const tagColors: Record<string, string> = {
  "Novo": "bg-cyan-100 text-cyan-700",
  "Cliente": "bg-emerald-100 text-emerald-700",
  "Quente": "bg-orange-100 text-orange-700",
  "Suporte": "bg-purple-100 text-purple-700",
  "VIP": "bg-amber-100 text-amber-700",
  "Aguardando": "bg-yellow-100 text-yellow-700",
  "Financeiro": "bg-amber-100 text-amber-700",
  "Campanha 01": "bg-pink-100 text-pink-700",
};

const statusColors: Record<string, string> = {
  Ativo: "bg-emerald-100 text-emerald-700",
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
          <h1 className="font-display text-[26px] font-extrabold tracking-tight">Meus Contatos</h1>
          <p className="text-muted-foreground text-[14px]">Gerencie seus clientes, leads e banco de dados</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-sm hover:shadow-md transition-shadow font-bold h-10 px-4">
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
              <tr className="border-b border-border bg-muted/10">
                <th className="text-left px-5 py-3 font-display text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 font-display text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Telefone</th>
                <th className="text-left px-4 py-3 font-display text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Etiqueta</th>
                <th className="text-left px-4 py-3 font-display text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Responsável</th>
                <th className="text-left px-4 py-3 font-display text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Último contato</th>
                <th className="text-left px-4 py-3 font-display text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${tagColors[c.tag] || "bg-muted text-muted-foreground"}`}>
                      {c.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] font-medium">{c.responsible}</td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-muted-foreground">{c.lastContact}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold shadow-sm ${statusColors[c.status] || "bg-muted text-muted-foreground"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/60 transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
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
