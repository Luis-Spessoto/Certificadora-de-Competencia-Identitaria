import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { tutoresService } from "@/services/tutoresService";
import { temasService } from "@/services/temasService";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ClipboardCheck, BookMarked } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  const { data: tutores = [] } = useQuery({
    queryKey: ["tutores"],
    queryFn: () => tutoresService.list(),
    enabled: user?.role === "admin",
  });

  const { data: temas = [] } = useQuery({
    queryKey: ["temas"],
    queryFn: () => temasService.list(),
    enabled: user?.role === "admin",
  });

  const ativos = tutores.filter((t) => t.status === "ativo").length;
  const pendentes = tutores.filter((t) => t.status === "pendente").length;
  const temasPublicados = temas.filter((t) => t.status === "publicado").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Olá, {user?.nome}</h1>
        <p className="text-sm text-muted-foreground">Visão geral do sistema ELLP.</p>
      </div>

      {user?.role === "admin" ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Stat icon={Users} label="Tutores ativos" value={ativos} />
            <Stat icon={ClipboardCheck} label="Aprovações pendentes" value={pendentes} />
            <Stat icon={BookMarked} label="Temas publicados" value={temasPublicados} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Catálogo de temas</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Gerencie os temas pedagógicos das oficinas do ELLP.
              </p>
              <Button asChild>
                <Link to="/temas">Acessar temas</Link>
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader><CardTitle>Bem-vindo</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Acesse <strong>Meu perfil</strong> para atualizar seus dados e ver as oficinas vinculadas.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
    </Card>
  );
}
