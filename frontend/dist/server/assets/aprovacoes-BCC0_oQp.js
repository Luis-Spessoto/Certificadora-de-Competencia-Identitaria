import { r as reactExports, W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useAuth, a as useNavigate, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { B as Badge } from "./badge-BJQ6jfYi.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
function Aprovacoes() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
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
  const setStatus = useMutation({
    mutationFn: (args) => tutoresService.setStatus(args.id, args.status),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tutores"]
      });
      toast.success("Atualizado");
    }
  });
  const pendentes = data.filter((t) => t.status === "pendente");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Aprovações pendentes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastros aguardando análise do coordenador." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : pendentes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum cadastro pendente." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pendentes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
          t.nome,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2", children: "pendente" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          t.email,
          " · ",
          t.curso,
          " · matrícula ",
          t.matricula
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setStatus.mutate({
          id: t.id,
          status: "inativo"
        }), children: "Recusar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => setStatus.mutate({
          id: t.id,
          status: "ativo"
        }), children: "Aprovar" })
      ] })
    ] }, t.id)) })
  ] });
}
export {
  Aprovacoes as component
};
