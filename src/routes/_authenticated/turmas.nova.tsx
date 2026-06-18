import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { turmasService } from "@/services/alunosService";
import { TurmaForm } from "@/components/alunos/TurmaForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/turmas/nova")({
  component: NovaTurma,
});

function NovaTurma() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: turmasService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turmas"] });
      toast.success("Turma criada");
      navigate({ to: "/turmas" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao criar turma"),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Nova turma</h1>
        <p className="text-sm text-muted-foreground">
          Crie uma turma e defina horário, local e vagas.
        </p>
      </div>
      <TurmaForm
        onSubmit={async (data) => {
          await create.mutateAsync(data);
        }}
        submitLabel="Criar turma"
      />
    </div>
  );
}
