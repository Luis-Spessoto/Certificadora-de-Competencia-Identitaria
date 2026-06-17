// ─── Route: /temas/$id ────────────────────────────────────────────────────────
// Detalhe / edição de tema + gerenciamento de materiais de apoio.
// Danilo Augusto

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { temasService } from "@/services/temasService";
import { TemaForm } from "@/components/temas/TemaForm";
import { MateriaisCard } from "@/components/temas/MateriaisCard";
import { Button } from "@/components/ui/button";
import type { TemaInput } from "@/types/tema";

export const Route = createFileRoute("/_authenticated/temas/$id")({
  component: TemaDetailPage,
});

function TemaDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // ─── Query ──────────────────────────────────────────────────────────────
  const {
    data: tema,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tema", id],
    queryFn: () => temasService.get(id),
    retry: 1,
  });

  // ─── Mutation: atualizar ─────────────────────────────────────────────────
  const atualizar = useMutation({
    mutationFn: (data: Partial<TemaInput>) => temasService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["temas"] });
      qc.invalidateQueries({ queryKey: ["tema", id] });
      toast.success("Tema atualizado");
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Erro ao salvar"),
  });

  // ─── Mutation: excluir ───────────────────────────────────────────────────
  const excluir = useMutation({
    mutationFn: () => temasService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["temas"] });
      toast.success("Tema excluído");
      navigate({ to: "/temas" });
    },
    onError: () => toast.error("Não foi possível excluir o tema."),
  });

  // ─── Estados de carregamento / erro ─────────────────────────────────────
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando tema...</p>;
  }

  if (isError || !tema) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">
          Tema não encontrado ou erro ao carregar.
        </p>
        <Button asChild variant="outline">
          <Link to="/temas">Voltar à lista</Link>
        </Button>
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold truncate max-w-lg">
            {tema.titulo}
          </h1>
          <p className="text-sm text-muted-foreground capitalize">
            {tema.nivel} · {tema.status}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/temas">Voltar</Link>
        </Button>
      </div>

      {/* Formulário de edição */}
      <TemaForm
        defaultValues={tema}
        onSubmit={async (data) => {
          await atualizar.mutateAsync(data);
        }}
        submitLabel="Salvar alterações"
      />

      {/* Materiais de apoio */}
      <MateriaisCard tema={tema} />

      {/* Zona de perigo */}
      <div className="border-t border-border pt-6">
        <Button
          variant="destructive"
          disabled={excluir.isPending}
          onClick={() => {
            if (confirm(`Excluir o tema "${tema.titulo}"? Esta ação não pode ser desfeita.`)) {
              excluir.mutate();
            }
          }}
        >
          {excluir.isPending ? "Excluindo..." : "Excluir tema"}
        </Button>
      </div>
    </div>
  );
}
