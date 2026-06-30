import { W as jsxRuntimeExports, r as reactExports } from "./server-BXgX27qI.js";
import { L as Link, u as useAuth, a as useNavigate, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
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
  pendente: "secondary",
  inativo: "outline"
};
function TutoresTable({ tutores, onToggleStatus }) {
  if (tutores.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Nenhum tutor encontrado." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "E-mail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Curso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Papel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: tutores.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: t.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: t.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: t.curso }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: t.role }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusVariant[t.status], children: t.status }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tutores/$id", params: { id: t.id }, children: "Editar" }) }),
        onToggleStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => onToggleStatus(t), children: t.status === "ativo" ? "Desativar" : "Ativar" })
      ] })
    ] }, t.id)) })
  ] });
}
function TutoresList() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (user && user.role !== "admin") navigate({
      to: "/dashboard"
    });
  }, [user, navigate]);
  const {
    data = [],
    isLoading
  } = useQuery({
    queryKey: ["tutores"],
    queryFn: () => tutoresService.list()
  });
  const toggle = useMutation({
    mutationFn: (args) => tutoresService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tutores"]
      });
      toast.success("Status atualizado");
    }
  });
  const filtered = reactExports.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter((t) => t.nome.toLowerCase().includes(term) || t.email.toLowerCase().includes(term));
  }, [data, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Tutores" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gestão dos acadêmicos do ELLP." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tutores/novo", children: "Novo tutor" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar por nome ou e-mail...", value: q, onChange: (e) => setQ(e.target.value), className: "max-w-sm" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TutoresTable, { tutores: filtered, onToggleStatus: (t) => toggle.mutate({
      id: t.id,
      status: t.status === "ativo" ? "inativo" : "ativo"
    }) }) })
  ] });
}
export {
  TutoresList as component
};
