import { r as reactExports, W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { b as useQueryClient, t as toast, L as Link } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as turmasService } from "./alunosService-DJz8e1qL.js";
import { I as Input } from "./input-BAbo1PnM.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { B as Badge } from "./badge-BJQ6jfYi.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Dywj9nL9.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
function TurmasList() {
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["turmas"],
    queryFn: () => turmasService.list()
  });
  const remove = useMutation({
    mutationFn: (id) => turmasService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["turmas"]
      });
      toast.success("Turma removida");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover")
  });
  const filtered = reactExports.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter((t) => t.nome.toLowerCase().includes(term) || t.local.toLowerCase().includes(term));
  }, [data, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Turmas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Controle de turmas e enturmação de alunos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/turmas/nova", children: "Nova turma" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por nome ou local...", value: q, onChange: (e) => setQ(e.target.value), className: "max-w-sm" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Nenhuma turma encontrada." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Horário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Local" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Vagas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: t.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: t.horario }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: t.local }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: t.alunosIds.length >= t.vagas ? "destructive" : "secondary", children: [
          t.alunosIds.length,
          "/",
          t.vagas
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/turmas/$id", params: {
            id: t.id
          }, children: "Gerenciar" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive hover:text-destructive", onClick: () => {
            if (confirm("Remover esta turma?")) remove.mutate(t.id);
          }, children: "Remover" })
        ] })
      ] }, t.id)) })
    ] }) })
  ] });
}
export {
  TurmasList as component
};
