import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Tutor, TutorStatus } from "@/types/tutor";

const statusVariant: Record<TutorStatus, "default" | "secondary" | "outline" | "destructive"> = {
  ativo: "default",
  pendente: "secondary",
  inativo: "outline",
};

interface Props {
  tutores: Tutor[];
  onToggleStatus?: (t: Tutor) => void;
}

export function TutoresTable({ tutores, onToggleStatus }: Props) {
  if (tutores.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Nenhum tutor encontrado.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Curso</TableHead>
          <TableHead>Papel</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tutores.map((t) => (
          <TableRow key={t.id}>
            <TableCell className="font-medium">{t.nome}</TableCell>
            <TableCell className="text-muted-foreground">{t.email}</TableCell>
            <TableCell>{t.curso}</TableCell>
            <TableCell className="capitalize">{t.role}</TableCell>
            <TableCell><Badge variant={statusVariant[t.status]}>{t.status}</Badge></TableCell>
            <TableCell className="text-right space-x-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/tutores/$id" params={{ id: t.id }}>Editar</Link>
              </Button>
              {onToggleStatus && (
                <Button size="sm" variant="ghost" onClick={() => onToggleStatus(t)}>
                  {t.status === "ativo" ? "Desativar" : "Ativar"}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
