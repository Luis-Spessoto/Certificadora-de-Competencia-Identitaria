import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { professoresService } from "@/modules/professores/services/professoresService";
import { ProfessorForm } from "@/modules/professores/components/ProfessorForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/professores/novo")({
  component: NovoProfessorPage,
});

function NovoProfessorPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: professoresService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professores"] });
      toast.success("Professor cadastrado com sucesso");
      navigate({ to: "/professores" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao cadastrar professor"),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Novo Professor</h1>
        <p className="text-sm text-muted-foreground">Cadastre um novo professor no sistema.</p>
      </div>
      <ProfessorForm onSubmit={async (data) => { await create.mutateAsync(data); }} />
    </div>
  );
}
