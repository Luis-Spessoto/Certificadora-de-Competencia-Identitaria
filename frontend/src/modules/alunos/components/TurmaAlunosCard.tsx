import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { turmasService, alunosService } from "../services/alunosService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  turmaId: string;
  vagas: number;
}

export function TurmaAlunosCard({ turmaId, vagas }: Props) {
  const qc = useQueryClient();
  const [selectedAlunoId, setSelectedAlunoId] = useState("");

  const { data: alunosNaTurma = [], isLoading } = useQuery({
    queryKey: ["turma-alunos", turmaId],
    queryFn: () => turmasService.alunos(turmaId),
  });

  const { data: todosAlunos = [] } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosService.list(),
  });

  const disponiveis = todosAlunos.filter(
    (a) => a.status === "ativo" && !alunosNaTurma.some((x) => x.id === a.id),
  );

  const add = useMutation({
    mutationFn: (alunoId: string) => turmasService.addAluno(turmaId, alunoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turma-alunos", turmaId] });
      qc.invalidateQueries({ queryKey: ["alunos"] });
      setSelectedAlunoId("");
      toast.success("Aluno enturmado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao enturmar"),
  });

  const remove = useMutation({
    mutationFn: (alunoId: string) => turmasService.removeAluno(turmaId, alunoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turma-alunos", turmaId] });
      qc.invalidateQueries({ queryKey: ["alunos"] });
      toast.success("Aluno removido da turma");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover"),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Alunos enturmados{" "}
          <Badge variant="secondary" className="ml-2">
            {alunosNaTurma.length}/{vagas}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : alunosNaTurma.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum aluno enturmado ainda.</p>
        ) : (
          <ul className="divide-y divide-border">
            {alunosNaTurma.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-2 text-sm">
                <span>
                  {a.nome} <span className="text-muted-foreground">— {a.escola}</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => remove.mutate(a.id)}
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        )}

        {alunosNaTurma.length < vagas && disponiveis.length > 0 && (
          <div className="flex gap-2">
            <Select value={selectedAlunoId} onValueChange={setSelectedAlunoId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Selecionar aluno..." />
              </SelectTrigger>
              <SelectContent>
                {disponiveis.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.nome} — {a.escola}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              disabled={!selectedAlunoId || add.isPending}
              onClick={() => selectedAlunoId && add.mutate(selectedAlunoId)}
            >
              Enturmar
            </Button>
          </div>
        )}

        {alunosNaTurma.length >= vagas && (
          <p className="text-xs text-muted-foreground">Turma completa — sem vagas disponíveis.</p>
        )}
      </CardContent>
    </Card>
  );
}
