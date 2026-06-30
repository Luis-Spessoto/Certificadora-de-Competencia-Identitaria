import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tutoresService } from "@/modules/tutores/services/tutoresService";
import { useAuth } from "@/contexts/AuthContext";
import { TutorForm } from "@/modules/tutores/components/TutorForm";
import { TutorOficinasCard } from "@/modules/tutores/components/TutorOficinasCard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/meu-perfil")({
  component: MeuPerfil,
});

function MeuPerfil() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", user?.id],
    queryFn: () => tutoresService.get(user!.id),
    enabled: !!user,
  });

  const update = useMutation({
    mutationFn: (data: Parameters<typeof tutoresService.update>[1]) =>
      tutoresService.update(user!.id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutor", user?.id] });
      toast.success("Perfil atualizado");
    },
  });

  if (isLoading || !tutor) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Meu perfil</h1>
        <p className="text-sm text-muted-foreground">Atualize seus dados de cadastro.</p>
      </div>
      <TutorForm
        defaultValues={tutor}
        onSubmit={async (data) => { await update.mutateAsync(data); }}
        submitLabel="Salvar"
      />
      <TutorOficinasCard tutorId={tutor.id} />
    </div>
  );
}
