import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
import { a as alunosService, t as turmasService } from "./alunosService-DJz8e1qL.js";
import { u as useAuth } from "./router-X-RD508Q.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Ds5oDOXi.js";
import { U as Users, B as BookOpen, G as GraduationCap } from "./users-B_h33y_A.js";
import { C as ClipboardCheck, S as School } from "./school-CPPSxZxD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
import "./createLucideIcon-QBZlNJG1.js";
function DashboardPage() {
  const {
    user
  } = useAuth();
  const {
    data: tutores = []
  } = useQuery({
    queryKey: ["tutores"],
    queryFn: () => tutoresService.list(),
    enabled: user?.role === "admin"
  });
  const {
    data: alunos = []
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosService.list()
  });
  const {
    data: turmas = []
  } = useQuery({
    queryKey: ["turmas"],
    queryFn: () => turmasService.list()
  });
  const ativos = tutores.filter((t) => t.status === "ativo").length;
  const pendentes = tutores.filter((t) => t.status === "pendente").length;
  const alunosAtivos = alunos.filter((a) => a.status === "ativo").length;
  const totalEnturmados = turmas.reduce((acc, t) => acc + t.alunosIds.length, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-semibold", children: [
        "Olá, ",
        user?.nome
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Visão geral do ELLP — Ensino Lúdico de Programação." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [
      user?.role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Tutores ativos", value: ativos }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: ClipboardCheck, label: "Aprovações pendentes", value: pendentes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: School, label: "Alunos cadastrados", value: alunosAtivos }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: BookOpen, label: "Turmas abertas", value: turmas.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: GraduationCap, label: "Total enturmados", value: totalEnturmados })
    ] }),
    turmas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: "Turmas em andamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: turmas.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: t.nome }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "📅 ",
            t.horario
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "📍 ",
            t.local
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "👥 ",
            t.alunosIds.length,
            "/",
            t.vagas,
            " alunos",
            " ",
            t.alunosIds.length >= t.vagas && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: "(turma cheia)" })
          ] })
        ] })
      ] }, t.id)) })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: value }) })
  ] });
}
export {
  DashboardPage as component
};
