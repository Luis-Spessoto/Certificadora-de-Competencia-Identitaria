import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { L as Link } from "./router-X-RD508Q.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { G as GraduationCap, U as Users, B as BookOpen } from "./users-B_h33y_A.js";
import { c as createLucideIcon } from "./createLucideIcon-QBZlNJG1.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "ELLP — UTFPR" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Entrar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", children: "Cadastrar como tutor" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold tracking-tight md:text-5xl", children: [
        "Gestão das oficinas do ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ELLP" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground", children: "Centralize tutores, temas e turmas do projeto de extensão Ensino Lúdico de Lógica e Programação da UTFPR." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Acessar painel" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", children: "Quero ser tutor" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Users, title: "Tutores", desc: "Cadastro, aprovação e gestão dos acadêmicos que ministram oficinas." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: BookOpen, title: "Temas e oficinas", desc: "Curadoria digital dos conteúdos lúdicos oferecidos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: ChartColumn, title: "Impacto social", desc: "Métricas claras sobre o alcance do projeto na comunidade." })
    ] })
  ] });
}
function Feature({
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: desc })
  ] });
}
export {
  Landing as component
};
