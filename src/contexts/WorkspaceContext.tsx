import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface Workspace {
  id: string;
  name: string;
  owner_user_id: string;
  created_at: string;
}

interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: "owner" | "admin" | "member";
}

interface WorkspaceContextType {
  workspace: Workspace | null;
  membership: WorkspaceMember | null;
  workspaces: Workspace[];
  loading: boolean;
  setCurrentWorkspace: (ws: Workspace) => void;
  createWorkspace: (name: string) => Promise<Workspace | null>;
  isOwnerOrAdmin: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspace: null,
  membership: null,
  workspaces: [],
  loading: true,
  setCurrentWorkspace: () => {},
  createWorkspace: async () => null,
  isOwnerOrAdmin: false,
});

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [membership, setMembership] = useState<WorkspaceMember | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWorkspace(null);
      setMembership(null);
      setWorkspaces([]);
      setLoading(false);
      return;
    }
    loadWorkspaces();
  }, [user]);

  const loadWorkspaces = async () => {
    if (!user) return;
    setLoading(true);

    const { data: memberRows } = await supabase
      .from("workspace_members")
      .select("workspace_id, role")
      .eq("user_id", user.id);

    if (!memberRows || memberRows.length === 0) {
      setWorkspaces([]);
      setWorkspace(null);
      setMembership(null);
      setLoading(false);
      return;
    }

    const wsIds = memberRows.map((m) => m.workspace_id);
    const { data: wsData } = await supabase
      .from("workspaces")
      .select("*")
      .in("id", wsIds);

    const wsList = (wsData as Workspace[]) || [];
    setWorkspaces(wsList);

    // Auto-select first workspace if none selected
    if (wsList.length > 0 && !workspace) {
      const firstWs = wsList[0];
      setWorkspace(firstWs);
      const mem = memberRows.find((m) => m.workspace_id === firstWs.id);
      setMembership(mem ? { ...mem, user_id: user.id } as WorkspaceMember : null);
    }

    setLoading(false);
  };

  const setCurrentWorkspace = (ws: Workspace) => {
    setWorkspace(ws);
    if (user) {
      supabase
        .from("workspace_members")
        .select("workspace_id, user_id, role")
        .eq("workspace_id", ws.id)
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          setMembership(data as WorkspaceMember | null);
        });
    }
  };

  const createWorkspace = async (name: string): Promise<Workspace | null> => {
    if (!user) return null;

    const { data: ws, error: wsError } = await supabase
      .from("workspaces")
      .insert({ name, owner_user_id: user.id })
      .select()
      .single();

    if (wsError || !ws) return null;

    // Add creator as owner member
    await supabase.from("workspace_members").insert({
      workspace_id: ws.id,
      user_id: user.id,
      role: "owner",
    });

    const newWs = ws as Workspace;
    setWorkspaces((prev) => [...prev, newWs]);
    setWorkspace(newWs);
    setMembership({ workspace_id: newWs.id, user_id: user.id, role: "owner" });
    return newWs;
  };

  const isOwnerOrAdmin = membership?.role === "owner" || membership?.role === "admin";

  return (
    <WorkspaceContext.Provider
      value={{ workspace, membership, workspaces, loading, setCurrentWorkspace, createWorkspace, isOwnerOrAdmin }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);
