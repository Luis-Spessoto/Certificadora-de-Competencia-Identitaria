import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { turmasService } from "@/services/alunosService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/turmas/")({
  component: TurmasList,
});

function TurmasList() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["turmas"],
    queryFn: () => turmasService.list(),
  });

  const remove = useMutation({
    mutationFn: (id: string) => turmasService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turmas"] });
      toast.success("Turma removida");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover"),
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (t) =>
        t.nome.toLowerCase().includes(term) ||
        t.local.toLowerCase().includes(term),
    );
  }, [data, q]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Turmas</h1>
          <p className="text-sm text-muted-foreground">
            Controle de turmas e enturmação de alunos.
          </p>
        </div>
        <Button asChild>
          <Link to="/turmas/nova">Nova turma</Link>
        </Button>
      </div>

      <Input
        placeholder="Buscar por nome ou local..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="max-w-sm"
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Nenhuma turma encontrada.</p>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Vagas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.nome}</TableCell>
                  <TableCell>{t.horario}</TableCell>
                  <TableCell>{t.local}</TableCell>
                  <TableCell>
                    <Badge
                      variant={t.alunosIds.length >= t.vagas ? "destructive" : "secondary"}
                    >
                      {t.alunosIds.length}/{t.vagas}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/turmas/$id" params={{ id: t.id }}>
                        Gerenciar
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm("Remover esta turma?")) remove.mutate(t.id);
                      }}
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
