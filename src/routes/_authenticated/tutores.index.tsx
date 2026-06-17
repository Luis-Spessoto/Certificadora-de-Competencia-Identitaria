import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { tutoresService } from "@/services/tutoresService";
import { TutoresTable } from "@/components/tutores/TutoresTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/tutores/")({
  component: TutoresList,
});

function TutoresList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (user && user.role !== "admin") navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["tutores"],
    queryFn: () => tutoresService.list(),
  });

  const toggle = useMutation({
    mutationFn: (args: { id: string; status: "ativo" | "inativo" }) =>
      tutoresService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tutores"] });
      toast.success("Status atualizado");
    },
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (t) => t.nome.toLowerCase().includes(term) || t.email.toLowerCase().includes(term),
    );
  }, [data, q]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tutores</h1>
          <p className="text-sm text-muted-foreground">Gestão dos acadêmicos do ELLP.</p>
        </div>
        <Button asChild><Link to="/tutores/novo">Novo tutor</Link></Button>
      </div>

      <Input
        placeholder="Buscar por nome ou e-mail..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="max-w-sm"
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <div className="rounded-lg border border-border">
          <TutoresTable
            tutores={filtered}
            onToggleStatus={(t) =>
              toggle.mutate({ id: t.id, status: t.status === "ativo" ? "inativo" : "ativo" })
            }
          />
        </div>
      )}
    </div>
  );
}
