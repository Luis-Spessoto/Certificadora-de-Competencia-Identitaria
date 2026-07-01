import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { tutoresService } from "@/modules/tutores/services/tutoresService";
import { professoresService } from "@/modules/professores/services/professoresService";
import { alunosService, turmasService } from "@/modules/alunos/services/alunosService";
import { oficinasService } from "@/modules/temas/services/oficinasService";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
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

  const { data: oficinas = [] } = useQuery({
    queryKey: ["oficinas"],
    queryFn: () => oficinasService.list(),
  });

  // Priorizar busca direta do perfil para ter dados populados e sincronizados
  const { data: userData } = useQuery({
    queryKey: [user?.role, user?.id],
    queryFn: () => user?.role === "tutor" ? tutoresService.get(user.id) : professoresService.get(user!.id),
    enabled: !!user && (user.role === "tutor" || user.role === "professor"),
  });

  const userOficinas = (userData as any)?.oficinas || (user?.role === "tutor" 
    ? oficinas.filter(o => (o.tutorId?._id || o.tutorId) === user.id)
    : user?.role === "professor"
    ? oficinas.filter(o => (o.professorId?._id || o.professorId) === user.id)
    : []);

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

      {(user?.role === "tutor" || user?.role === "professor") && userOficinas.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Minhas Oficinas Agendadas
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {userOficinas.map((o) => (
              <Card key={o.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-bold">{o.nome}</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">OFICINA</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <div className="space-y-1">
                    <p className="flex items-center gap-1">📅 {o.data || "A definir"}</p>
                    <p className="flex items-center gap-1">🕒 {o.horario || "A definir"}</p>
                    <p className="flex items-center gap-1">📍 {o.local || "A definir"}</p>
                  </div>
                  {o.professorId && (
                    <div className="pt-2 border-t border-border">
                      <p className="font-medium text-primary">Professor: {o.professorId.nome || "Vinculado"}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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
