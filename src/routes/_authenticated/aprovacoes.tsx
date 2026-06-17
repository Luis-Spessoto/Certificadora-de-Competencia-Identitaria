import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { tutoresService } from "@/services/tutoresService";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/aprovacoes")({
  component: Aprovacoes,
});

function Aprovacoes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (user && user.role !== "admin") navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["tutores"],
    queryFn: () => tutoresService.list(),
  });

  const setStatus = useMutation({
    mutationFn: (args: { id: string; status: "ativo" | "inativo" }) =>
      tutoresService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutores"] });
      toast.success("Atualizado");
    },
  });

  const pendentes = data.filter((t) => t.status === "pendente");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Aprovações pendentes</h1>
        <p className="text-sm text-muted-foreground">Cadastros aguardando análise do coordenador.</p>
      </div>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : pendentes.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum cadastro pendente.</p>
      ) : (
        <div className="space-y-3">
          {pendentes.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div>
                <div className="font-medium">{t.nome} <Badge variant="secondary" className="ml-2">pendente</Badge></div>
                <div className="text-sm text-muted-foreground">{t.email} · {t.curso} · matrícula {t.matricula}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setStatus.mutate({ id: t.id, status: "inativo" })}>
                  Recusar
                </Button>
                <Button size="sm" onClick={() => setStatus.mutate({ id: t.id, status: "ativo" })}>
                  Aprovar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
