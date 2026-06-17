// ─── Route: /temas/novo ───────────────────────────────────────────────────────
// Criação de um novo tema de oficina.
// Danilo Augusto

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { temasService } from "@/services/temasService";
import { TemaForm } from "@/components/temas/TemaForm";
import type { TemaInput } from "@/types/tema";

export const Route = createFileRoute("/_authenticated/temas/novo")({
  component: NovoTemaPage,
});

function NovoTemaPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const criar = useMutation({
    mutationFn: (data: TemaInput) => temasService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["temas"] });
      toast.success("Tema criado com sucesso!");
      navigate({ to: "/temas" });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Erro ao criar tema"),
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Novo tema</h1>
        <p className="text-sm text-muted-foreground">
          Cadastre um novo tema para a biblioteca de oficinas do ELLP.
        </p>
      </div>

      <TemaForm
        onSubmit={async (data) => {
          await criar.mutateAsync(data);
        }}
        submitLabel="Criar tema"
      />
    </div>
  );
}
