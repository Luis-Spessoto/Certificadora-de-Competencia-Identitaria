import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Aluno, AlunoStatus } from "../types/aluno";

const statusVariant: Record<AlunoStatus, "default" | "outline"> = {
  ativo: "default",
  inativo: "outline",
};

interface Props {
  alunos: Aluno[];
  onToggleStatus?: (a: Aluno) => void;
}

export function AlunosTable({ alunos, onToggleStatus }: Props) {
  if (alunos.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Nenhum aluno encontrado.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Escola / ONG</TableHead>
          <TableHead>Série</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alunos.map((a) => (
          <TableRow key={a.id}>
            <TableCell className="font-medium">{a.nome}</TableCell>
            <TableCell>{a.escola}</TableCell>
            <TableCell>{a.serie}</TableCell>
            <TableCell className="text-muted-foreground">{a.responsavel ?? "—"}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/alunos/$id" params={{ id: a.id }}>Editar</Link>
              </Button>
              {onToggleStatus && (
                <Button size="sm" variant="ghost" onClick={() => onToggleStatus(a)}>
                  {a.status === "ativo" ? "Desativar" : "Ativar"}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
