import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export function useContacts() {
  const { workspace } = useWorkspace();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["contacts", workspace?.id],
    enabled: !!workspace?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("workspace_id", workspace!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createContact = useMutation({
    mutationFn: async (contact: { name: string; phone?: string; email?: string; tags?: string[] }) => {
      const { data, error } = await supabase
        .from("contacts")
        .insert({ ...contact, workspace_id: workspace!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts", workspace?.id] }),
  });

  const updateContact = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; name?: string; phone?: string; email?: string; tags?: string[] }) => {
      const { data, error } = await supabase
        .from("contacts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts", workspace?.id] }),
  });

  return { ...query, createContact, updateContact };
}
