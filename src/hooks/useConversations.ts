import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export function useConversations() {
  const { workspace } = useWorkspace();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["conversations", workspace?.id],
    enabled: !!workspace?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, contacts(*)")
        .eq("workspace_id", workspace!.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createConversation = useMutation({
    mutationFn: async (conv: { contact_id: string; channel?: string }) => {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ ...conv, workspace_id: workspace!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["conversations", workspace?.id] }),
  });

  return { ...query, createConversation };
}

export function useMessages(conversationId: string | null) {
  const { workspace } = useWorkspace();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", conversationId],
    enabled: !!conversationId && !!workspace?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (msg: { content: string; sender_type: string }) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          ...msg,
          workspace_id: workspace!.id,
          conversation_id: conversationId!,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["messages", conversationId] }),
  });

  return { ...query, sendMessage };
}
