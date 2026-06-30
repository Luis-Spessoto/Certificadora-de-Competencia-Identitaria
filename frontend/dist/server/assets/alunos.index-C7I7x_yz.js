import { W as jsxRuntimeExports, r as reactExports } from "./server-BXgX27qI.js";
import { L as Link, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { a as alunosService } from "./alunosService-DJz8e1qL.js";
import { B as Badge } from "./badge-BJQ6jfYi.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Dywj9nL9.js";
import { I as Input } from "./input-BAbo1PnM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
const statusVariant = {
  ativo: "default",
  inativo: "outline"
};
function AlunosTable({ alunos, onToggleStatus }) {
  if (alunos.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Nenhum aluno encontrado." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Escola / ONG" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Série" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Responsável" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: alunos.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: a.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: a.escola }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: a.serie }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: a.responsavel ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant[a.status], children: a.status }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alunos/$id", params: { id: a.id }, children: "Editar" }) }),
        onToggleStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => onToggleStatus(a), children: a.status === "ativo" ? "Desativar" : "Ativar" })
      ] })
    ] }, a.id)) })
  ] });
}
function AlunosList() {
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosService.list()
  });
  const toggle = useMutation({
    mutationFn: (args) => alunosService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["alunos"]
      });
      toast.success("Status atualizado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao atualizar")
  });
  const filtered = reactExports.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter((a) => a.nome.toLowerCase().includes(term) || a.escola.toLowerCase().includes(term));
  }, [data, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Alunos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gestão dos alunos participantes do ELLP." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alunos/novo", children: "Novo aluno" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por nome ou escola...", value: q, onChange: (e) => setQ(e.target.value), className: "max-w-sm" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlunosTable, { alunos: filtered, onToggleStatus: (a) => toggle.mutate({
      id: a.id,
      status: a.status === "ativo" ? "inativo" : "ativo"
    }) }) })
  ] });
}
export {
  AlunosList as component
};
