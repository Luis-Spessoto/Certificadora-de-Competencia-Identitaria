import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alunosService } from "@/modules/alunos/services/alunosService";
import { AlunoForm } from "@/modules/alunos/components/AlunoForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/alunos/novo")({
  component: NovoAluno,
});

function NovoAluno() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: alunosService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alunos"] });
      toast.success("Aluno cadastrado");
      navigate({ to: "/alunos" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao cadastrar"),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Novo aluno</h1>
        <p className="text-sm text-muted-foreground">
          Cadastro de aluno participante das oficinas.
        </p>
      </div>
      <AlunoForm
        onSubmit={async (data) => {
          await create.mutateAsync(data);
        }}
        submitLabel="Cadastrar aluno"
      />
    </div>
  );
}
