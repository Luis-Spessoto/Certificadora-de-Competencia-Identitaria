import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { e as Route, a as useNavigate, b as useQueryClient, t as toast, L as Link } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { a as alunosService } from "./alunosService-DJz8e1qL.js";
import { A as AlunoForm } from "./AlunoForm-CEEocOUD.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { B as Badge } from "./badge-BJQ6jfYi.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types--ofDvtVS.js";
import "./input-BAbo1PnM.js";
import "./utils-Bz4m9VPB.js";
import "./label-CGQJOB1N.js";
import "./select-B0KGSWrx.js";
import "./createLucideIcon-QBZlNJG1.js";
function AlunoDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data: aluno,
    isLoading
  } = useQuery({
    queryKey: ["aluno", id],
    queryFn: () => alunosService.get(id)
  });
  const update = useMutation({
    mutationFn: (data) => alunosService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["alunos"]
      });
      qc.invalidateQueries({
        queryKey: ["aluno", id]
      });
      toast.success("Aluno atualizado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao salvar")
  });
  const remove = useMutation({
    mutationFn: () => alunosService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["alunos"]
      });
      toast.success("Aluno removido");
      navigate({
        to: "/alunos"
      });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover")
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  if (!aluno) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aluno não encontrado." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: aluno.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          aluno.escola,
          " · ",
          aluno.serie,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: aluno.status === "ativo" ? "default" : "outline", className: "ml-1", children: aluno.status })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alunos", children: "Voltar" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlunoForm, { defaultValues: aluno, showStatusField: true, onSubmit: async (data) => {
      await update.mutateAsync(data);
    }, submitLabel: "Salvar alterações" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => {
      if (confirm("Remover este aluno?")) remove.mutate();
    }, children: "Excluir aluno" }) })
  ] });
}
export {
  AlunoDetail as component
};
