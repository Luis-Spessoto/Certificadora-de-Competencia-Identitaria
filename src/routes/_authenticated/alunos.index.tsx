import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { alunosService } from "@/services/alunosService";
import { AlunosTable } from "@/components/alunos/AlunosTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/alunos/")({
  component: AlunosList,
});

function AlunosList() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosService.list(),
  });

  const toggle = useMutation({
    mutationFn: (args: { id: string; status: "ativo" | "inativo" }) =>
      alunosService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alunos"] });
      toast.success("Status atualizado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao atualizar"),
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (a) =>
        a.nome.toLowerCase().includes(term) ||
        a.escola.toLowerCase().includes(term),
    );
  }, [data, q]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Alunos</h1>
          <p className="text-sm text-muted-foreground">
            Gestão dos alunos participantes do ELLP.
          </p>
        </div>
        <Button asChild>
          <Link to="/alunos/novo">Novo aluno</Link>
        </Button>
      </div>

      <Input
        placeholder="Buscar por nome ou escola..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="max-w-sm"
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <div className="rounded-lg border border-border">
          <AlunosTable
            alunos={filtered}
            onToggleStatus={(a) =>
              toggle.mutate({ id: a.id, status: a.status === "ativo" ? "inativo" : "ativo" })
            }
          />
        </div>
      )}
    </div>
  );
}
