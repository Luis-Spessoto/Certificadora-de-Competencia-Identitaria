import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { tutoresService } from "@/services/tutoresService";
import { alunosService, turmasService } from "@/services/alunosService";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardCheck, BookOpen, School, GraduationCap } from "lucide-react";

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

  const { data: alunos = [] } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosService.list(),
  });

  const { data: turmas = [] } = useQuery({
    queryKey: ["turmas"],
    queryFn: () => turmasService.list(),
  });

  const ativos = tutores.filter((t) => t.status === "ativo").length;
  const pendentes = tutores.filter((t) => t.status === "pendente").length;
  const alunosAtivos = alunos.filter((a) => a.status === "ativo").length;
  const totalEnturmados = turmas.reduce((acc, t) => acc + t.alunosIds.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Olá, {user?.nome}</h1>
        <p className="text-sm text-muted-foreground">Visão geral do ELLP — Ensino Lúdico de Programação.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {user?.role === "admin" && (
          <>
            <Stat icon={Users} label="Tutores ativos" value={ativos} />
            <Stat icon={ClipboardCheck} label="Aprovações pendentes" value={pendentes} />
          </>
        )}
        <Stat icon={School} label="Alunos cadastrados" value={alunosAtivos} />
        <Stat icon={BookOpen} label="Turmas abertas" value={turmas.length} />
        <Stat icon={GraduationCap} label="Total enturmados" value={totalEnturmados} />
      </div>

      {turmas.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Turmas em andamento</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {turmas.map((t) => (
              <Card key={t.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{t.nome}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-1">
                  <p>📅 {t.horario}</p>
                  <p>📍 {t.local}</p>
                  <p>
                    👥 {t.alunosIds.length}/{t.vagas} alunos{" "}
                    {t.alunosIds.length >= t.vagas && (
                      <span className="text-destructive font-medium">(turma cheia)</span>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
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
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
