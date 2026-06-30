import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { getToken } from "@/services/apiClient";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    // Sem auth context no beforeLoad — usamos o token do localStorage como pista.
    if (typeof window !== "undefined" && !getToken()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/login" });
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }
  if (!isAuthenticated) return null;
  return <AppShell />;
}
