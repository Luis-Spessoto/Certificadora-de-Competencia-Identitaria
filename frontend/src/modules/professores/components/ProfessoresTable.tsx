import { Link } from "@tanstack/react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Professor } from "../types/professor";

export function ProfessoresTable({ professores }: { professores: Professor[] }) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {professores.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.nome}</TableCell>
              <TableCell className="text-muted-foreground">{p.email}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button asChild size="sm" variant="outline">
                  <Link to="/professores/$id" params={{ id: p.id }}>Editar</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {professores.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                Nenhum professor cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
