import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { professoresService } from "@/modules/professores/services/professoresService";
import { ProfessorForm } from "@/modules/professores/components/ProfessorForm";
import { ProfessorOficinasCard } from "@/modules/professores/components/ProfessorOficinasCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/professores/$id")({
  component: ProfessorDetalhesPage,
});

function ProfessorDetalhesPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: professor, isLoading } = useQuery({
    queryKey: ["professor", id],
    queryFn: () => professoresService.get(id),
  });

  const update = useMutation({
    mutationFn: (data: any) => professoresService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professor", id] });
      qc.invalidateQueries({ queryKey: ["professores"] });
      toast.success("Dados atualizados");
    },
  });

  const remove = useMutation({
    mutationFn: () => professoresService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professores"] });
      toast.success("Professor removido");
      navigate({ to: "/professores" });
    },
  });

  if (isLoading || !professor) return <p>Carregando...</p>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{professor.nome}</h1>
          <p className="text-sm text-muted-foreground">Editar informações do professor.</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/professores/agendar-oficina">Agendar Oficina</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfessorForm 
          defaultValues={professor} 
          onSubmit={async (data) => { await update.mutateAsync(data); }} 
          submitLabel="Salvar alterações"
        />
        <ProfessorOficinasCard professorId={id} />
      </div>

      <div className="border-t border-border pt-6">
        <Button 
          variant="destructive" 
          onClick={() => { if (confirm("Remover este professor?")) remove.mutate(); }}
        >
          Remover Professor
        </Button>
      </div>
    </div>
  );
}
