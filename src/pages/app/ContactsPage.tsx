import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Inbox } from "lucide-react";
import { useContacts } from "@/hooks/useSupabase";

const filters = ["Todos", "Novo", "Quente", "Financeiro", "Suporte", "Campanha 01"];

export default function ContactsPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { data: contacts, isLoading } = useContacts();

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="font-display text-[26px] font-extrabold tracking-tight">Meus Contatos</h1>
          <p className="text-muted-foreground text-[14px]">Gerencie seus clientes, leads e banco de dados</p>
        </div>
        <Button variant="gradient" className="rounded-xl shadow-sm hover:shadow-md transition-shadow font-bold h-10 px-4 shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Novo contato
        </Button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
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
        <div className="relative w-full xl:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar contato..."
            className="pl-9 pr-4 py-2 w-full xl:w-64 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-muted-foreground">Carregando contatos...</div>
        ) : contacts && contacts.length > 0 ? (
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
                {contacts.map((c: any) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                          {(c.full_name || c.phone_e164 || "?").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">{c.full_name || "Sem nome"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] font-medium text-muted-foreground">{c.phone_e164}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-muted text-muted-foreground">
                        {c.tags?.[0] || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] font-medium">-</td>
                    <td className="px-4 py-3.5 text-[13px] font-medium text-muted-foreground">
                      {new Date(c.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-bold shadow-sm bg-emerald-100 text-emerald-700">
                        Ativo
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Nenhum contato encontrado</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Os contatos que interagirem com você ou forem cadastrados manualmente aparecerão aqui.
            </p>
            <Button variant="outline" className="font-semibold shadow-sm">
              <Plus className="h-4 w-4 mr-2" /> Cadastrar meu primeiro contato
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
