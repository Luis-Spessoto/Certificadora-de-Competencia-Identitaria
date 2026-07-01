import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { oficinasService } from "@/modules/temas/services/oficinasService";
import { OficinaForm } from "@/modules/temas/components/OficinaForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/professores/agendar-oficina")({
  component: AgendarOficinaPage,
});

function AgendarOficinaPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: oficinasService.create,
    onSuccess: () => {
      // Invalida listagens gerais
      qc.invalidateQueries({ queryKey: ["oficinas"] });
      qc.invalidateQueries({ queryKey: ["professores"] });
      qc.invalidateQueries({ queryKey: ["tutores"] });
      
      // Invalida queries específicas de detalhes/oficinas de tutores e professores
      // Isso garante que as abas "Meu Perfil", "Dashboard" e "Detalhes do Tutor/Professor" sejam atualizadas
      qc.invalidateQueries({ queryKey: ["tutor"] });
      qc.invalidateQueries({ queryKey: ["professor"] });
      
      toast.success("Oficina agendada com sucesso");
      window.history.back();
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao agendar oficina"),
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Agendar Oficina</h1>
        <p className="text-sm text-muted-foreground">Vincule um tema, tutor e professor para uma nova oficina.</p>
      </div>
      <OficinaForm onSubmit={async (data) => { await create.mutateAsync(data); }} />
    </div>
  );
}
