import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export function useTeamMembers() {
  const { workspace } = useWorkspace();

  return useQuery({
    queryKey: ["team-members", workspace?.id],
    enabled: !!workspace?.id,
    queryFn: async () => {
      const { data: members, error } = await supabase
        .from("workspace_members")
        .select("user_id, role, created_at")
        .eq("workspace_id", workspace!.id);
      if (error) throw error;

      // Fetch profiles for each member
      if (!members || members.length === 0) return [];
      const userIds = members.map((m) => m.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);

      return members.map((m) => ({
        ...m,
        profile: profiles?.find((p) => p.id === m.user_id) || null,
      }));
    },
  });
}
