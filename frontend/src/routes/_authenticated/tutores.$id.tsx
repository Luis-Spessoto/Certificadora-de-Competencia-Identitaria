import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tutoresService } from "@/modules/tutores/services/tutoresService";
import { TutorForm } from "@/modules/tutores/components/TutorForm";
import { TutorOficinasCard } from "@/modules/tutores/components/TutorOficinasCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/tutores/$id")({
  component: TutorDetail,
});

function TutorDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: () => tutoresService.get(id),
  });

  const update = useMutation({
    mutationFn: (data: Parameters<typeof tutoresService.update>[1]) => tutoresService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutores"] });
      qc.invalidateQueries({ queryKey: ["tutor", id] });
      toast.success("Tutor atualizado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao salvar"),
  });

  const remove = useMutation({
    mutationFn: () => tutoresService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutores"] });
      toast.success("Tutor removido");
      navigate({ to: "/tutores" });
    },
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  if (!tutor) return <p>Tutor não encontrado.</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{tutor.nome}</h1>
          <p className="text-sm text-muted-foreground">{tutor.email}</p>
        </div>
        <Button asChild variant="outline"><Link to="/tutores">Voltar</Link></Button>
      </div>

      <TutorForm
        defaultValues={tutor}
        showAdminFields
        onSubmit={async (data) => { await update.mutateAsync(data); }}
        submitLabel="Salvar alterações"
      />

      <TutorOficinasCard tutorId={tutor.id} />

      <div className="border-t border-border pt-6">
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm("Remover este tutor?")) remove.mutate();
          }}
        >
          Excluir tutor
        </Button>
      </div>
    </div>
  );
}
