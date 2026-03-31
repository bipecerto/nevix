import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Mock auth para não recriar login conforme solicitado.
// Na versão de produção isso pegaria o auth do supabase e os dados do DB real
export const useAuth = () => {
  return {
    user: { id: "mock-user", email: "user@nevix.com" }, // mockado temporariamente se auth real nao existir
    workspaceId: "mock-workspace",
  };
};

export const useAgents = () => {
  const { workspaceId } = useAuth();
  
  return useQuery({
    queryKey: ['agents', workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('workspace_id', workspaceId);
        
      if (error) throw error;
      return data || [];
    }
  });
};

export const useContacts = () => {
  const { workspaceId } = useAuth();
  
  return useQuery({
    queryKey: ['contacts', workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
  });
};

export const useConversations = () => {
  const { workspaceId } = useAuth();
  
  return useQuery({
    queryKey: ['conversations', workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('*, contacts(full_name, phone_e164), agents(name)')
        .eq('workspace_id', workspaceId)
        .order('last_message_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
  });
};

export const useMessages = (conversationId: string | null) => {
  const { workspaceId } = useAuth();
  
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('workspace_id', workspaceId)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return data || [];
    }
  });
};

export const useDashboardStats = () => {
  const { workspaceId } = useAuth();
  
  return useQuery({
    queryKey: ['dashboard-stats', workspaceId],
    queryFn: async () => {
      const [agentsCount, contactsCount, conversationsCount] = await Promise.all([
        supabase.from('agents').select('*', { count: 'exact', head: true }).eq('workspace_id', workspaceId),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('workspace_id', workspaceId),
        supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('workspace_id', workspaceId),
      ]);
      
      return {
        totalAgents: agentsCount.count || 0,
        totalContacts: contactsCount.count || 0,
        totalConversations: conversationsCount.count || 0,
      };
    }
  });
};
