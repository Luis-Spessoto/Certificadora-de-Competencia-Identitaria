import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { temasService } from "@/modules/temas/services/temasService";
import { TemaForm } from "@/modules/temas/components/TemaForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/professores/sugerir-tema")({
  component: SugerirTemaPage,
});

function SugerirTemaPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: temasService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["temas"] });
      toast.success("Tema sugerido com sucesso! Aguarde aprovação.");
      navigate({ to: "/professores" });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao sugerir tema"),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Sugerir Novo Tema</h1>
        <p className="text-sm text-muted-foreground">Sugira um tema de oficina para ser avaliado pela curadoria.</p>
      </div>
      <TemaForm onSubmit={async (data) => { await create.mutateAsync(data); }} />
    </div>
  );
}
