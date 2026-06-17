// ─── TemasTable ───────────────────────────────────────────────────────────────
// Tabela de temas de oficina — segue o padrão de TutoresTable.tsx (João).
// Danilo Augusto

import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Paperclip } from "lucide-react";
import type { Tema, TemaStatus, NivelTema } from "@/types/tema";

// ─── Mapeamentos visuais ──────────────────────────────────────────────────────
const statusVariant: Record<
  TemaStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  publicado: "default",
  rascunho: "secondary",
  arquivado: "outline",
};

const statusLabel: Record<TemaStatus, string> = {
  publicado: "Publicado",
  rascunho: "Rascunho",
  arquivado: "Arquivado",
};

const nivelLabel: Record<NivelTema, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  temas: Tema[];
  onAlterarStatus?: (tema: Tema, novoStatus: TemaStatus) => void;
}

// ─── Componente ───────────────────────────────────────────────────────────────
export function TemasTable({ temas, onAlterarStatus }: Props) {
  if (temas.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Nenhum tema encontrado.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead>Tecnologias</TableHead>
          <TableHead>Materiais</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {temas.map((tema) => (
          <TableRow key={tema.id}>
            <TableCell className="font-medium max-w-[220px] truncate">
              {tema.titulo}
            </TableCell>
            <TableCell>{nivelLabel[tema.nivel]}</TableCell>
            <TableCell className="max-w-[180px]">
              <span className="text-sm text-muted-foreground">
                {tema.tecnologias.slice(0, 2).join(", ")}
                {tema.tecnologias.length > 2 &&
                  ` +${tema.tecnologias.length - 2}`}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Paperclip className="h-3.5 w-3.5" />
                {tema.materiaisApoio.length}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[tema.status]}>
                {statusLabel[tema.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/temas/$id" params={{ id: tema.id }}>
                  Editar
                </Link>
              </Button>
              {onAlterarStatus && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const proximo: TemaStatus =
                      tema.status === "rascunho"
                        ? "publicado"
                        : tema.status === "publicado"
                          ? "arquivado"
                          : "rascunho";
                    onAlterarStatus(tema, proximo);
                  }}
                >
                  {tema.status === "rascunho"
                    ? "Publicar"
                    : tema.status === "publicado"
                      ? "Arquivar"
                      : "Reativar"}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
