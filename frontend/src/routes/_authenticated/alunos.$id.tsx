import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alunosService } from "@/modules/alunos/services/alunosService";
import { AlunoForm } from "@/modules/alunos/components/AlunoForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/alunos/$id")({
  component: AlunoDetail,
});

function AlunoDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: aluno, isLoading } = useQuery({
    queryKey: ["aluno", id],
    queryFn: () => alunosService.get(id),
  });

  const update = useMutation({
    mutationFn: (data: Parameters<typeof alunosService.update>[1]) =>
      alunosService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alunos"] });
      qc.invalidateQueries({ queryKey: ["aluno", id] });
      toast.success("Aluno atualizado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao salvar"),
  });

  const remove = useMutation({
    mutationFn: () => alunosService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alunos"] });
      toast.success("Aluno removido");
      navigate({ to: "/alunos" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover"),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  if (!aluno) return <p>Aluno não encontrado.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{aluno.nome}</h1>
          <p className="text-sm text-muted-foreground">
            {aluno.escola} · {aluno.serie}{" "}
            <Badge variant={aluno.status === "ativo" ? "default" : "outline"} className="ml-1">
              {aluno.status}
            </Badge>
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/alunos">Voltar</Link>
        </Button>
      </div>

      <AlunoForm
        defaultValues={aluno}
        showStatusField
        onSubmit={async (data) => {
          await update.mutateAsync(data);
        }}
        submitLabel="Salvar alterações"
      />

      <div className="border-t border-border pt-6">
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm("Remover este aluno?")) remove.mutate();
          }}
        >
          Excluir aluno
        </Button>
      </div>
    </div>
  );
}
