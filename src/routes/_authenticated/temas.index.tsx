// ─── Route: /temas ────────────────────────────────────────────────────────────
// Lista de temas com busca e filtro de status.
// Danilo Augusto

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { temasService } from "@/services/temasService";
import { TemasTable } from "@/components/temas/TemasTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tema, TemaStatus } from "@/types/tema";

export const Route = createFileRoute("/_authenticated/temas/")({
  component: TemasListPage,
});

function TemasListPage() {
  const qc = useQueryClient();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<TemaStatus | "todos">(
    "todos",
  );

  // ─── Query ────────────────────────────────────────────────────────────────
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["temas"],
    queryFn: () => temasService.list(),
  });

  // ─── Mutation de status ───────────────────────────────────────────────────
  const alterarStatus = useMutation({
    mutationFn: (args: { id: string; status: TemaStatus }) =>
      temasService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["temas"] });
      toast.success("Status atualizado");
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar"),
  });

  // ─── Filtros cliente ──────────────────────────────────────────────────────
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return data.filter((t) => {
      const buscaOk =
        !termo ||
        t.titulo.toLowerCase().includes(termo) ||
        t.tecnologias.some((tec) => tec.toLowerCase().includes(termo));
      const statusOk = filtroStatus === "todos" || t.status === filtroStatus;
      return buscaOk && statusOk;
    });
  }, [data, busca, filtroStatus]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Temas de Oficinas</h1>
          <p className="text-sm text-muted-foreground">
            Biblioteca de temas pedagógicos do ELLP.
          </p>
        </div>
        <Button asChild>
          <Link to="/temas/novo">Novo tema</Link>
        </Button>
      </div>

      {/* Barra de busca + filtro */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Buscar por título ou tecnologia..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={filtroStatus}
          onValueChange={(v) => setFiltroStatus(v as TemaStatus | "todos")}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="publicado">Publicado</SelectItem>
            <SelectItem value="arquivado">Arquivado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando temas...</p>
      ) : isError ? (
        <p className="text-sm text-destructive">
          Falha ao carregar temas. Tente novamente.
        </p>
      ) : (
        <div className="rounded-lg border border-border">
          <TemasTable
            temas={filtrados}
            onAlterarStatus={(tema, novoStatus) =>
              alterarStatus.mutate({ id: tema.id, status: novoStatus })
            }
          />
        </div>
      )}
    </div>
  );
}
