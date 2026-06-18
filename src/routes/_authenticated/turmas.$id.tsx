import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { turmasService } from "@/services/alunosService";
import { TurmaForm } from "@/components/alunos/TurmaForm";
import { TurmaAlunosCard } from "@/components/alunos/TurmaAlunosCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/turmas/$id")({
  component: TurmaDetail,
});

function TurmaDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: turma, isLoading } = useQuery({
    queryKey: ["turma", id],
    queryFn: () => turmasService.get(id),
  });

  const update = useMutation({
    mutationFn: (data: Parameters<typeof turmasService.update>[1]) =>
      turmasService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turmas"] });
      qc.invalidateQueries({ queryKey: ["turma", id] });
      toast.success("Turma atualizada");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao salvar"),
  });

  const remove = useMutation({
    mutationFn: () => turmasService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turmas"] });
      toast.success("Turma removida");
      navigate({ to: "/turmas" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover"),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  if (!turma) return <p>Turma não encontrada.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{turma.nome}</h1>
          <p className="text-sm text-muted-foreground">
            {turma.horario} · {turma.local}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/turmas">Voltar</Link>
        </Button>
      </div>

      <TurmaForm
        defaultValues={turma}
        onSubmit={async (data) => {
          await update.mutateAsync(data);
        }}
        submitLabel="Salvar alterações"
      />

      <TurmaAlunosCard turmaId={turma.id} vagas={turma.vagas} />

      <div className="border-t border-border pt-6">
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm("Remover esta turma e desvincular todos os alunos?")) remove.mutate();
          }}
        >
          Excluir turma
        </Button>
      </div>
    </div>
  );
}
