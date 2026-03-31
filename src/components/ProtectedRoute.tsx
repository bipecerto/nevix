import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { workspace, workspaces, loading: wsLoading } = useWorkspace();

  if (authLoading || wsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user has no workspaces, redirect to onboarding
  if (workspaces.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
