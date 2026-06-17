import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tutoresService } from "@/services/tutoresService";
import { TutorForm } from "@/components/tutores/TutorForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/tutores/novo")({
  component: NovoTutor,
});

function NovoTutor() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: tutoresService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutores"] });
      toast.success("Tutor criado");
      navigate({ to: "/tutores" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao criar"),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Novo tutor</h1>
        <p className="text-sm text-muted-foreground">Cadastro manual pelo administrador.</p>
      </div>
      <TutorForm
        showAdminFields
        onSubmit={async (data) => { await create.mutateAsync(data); }}
        submitLabel="Criar tutor"
      />
    </div>
  );
}
