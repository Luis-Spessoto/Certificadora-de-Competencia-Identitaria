import { r as reactExports, W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { b as useQueryClient, t as toast, d as Route, a as useNavigate, L as Link } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as turmasService, a as alunosService } from "./alunosService-DJz8e1qL.js";
import { T as TurmaForm } from "./TurmaForm-BT5yWf5u.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Ds5oDOXi.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { B as Badge } from "./badge-BJQ6jfYi.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B0KGSWrx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types--ofDvtVS.js";
import "./input-BAbo1PnM.js";
import "./utils-Bz4m9VPB.js";
import "./label-CGQJOB1N.js";
import "./createLucideIcon-QBZlNJG1.js";
function TurmaAlunosCard({ turmaId, vagas }) {
  const qc = useQueryClient();
  const [selectedAlunoId, setSelectedAlunoId] = reactExports.useState("");
  const { data: alunosNaTurma = [], isLoading } = useQuery({
    queryKey: ["turma-alunos", turmaId],
    queryFn: () => turmasService.alunos(turmaId)
  });
  const { data: todosAlunos = [] } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => alunosService.list()
  });
  const disponiveis = todosAlunos.filter(
    (a) => a.status === "ativo" && !alunosNaTurma.some((x) => x.id === a.id)
  );
  const add = useMutation({
    mutationFn: (alunoId) => turmasService.addAluno(turmaId, alunoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turma-alunos", turmaId] });
      qc.invalidateQueries({ queryKey: ["alunos"] });
      setSelectedAlunoId("");
      toast.success("Aluno enturmado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao enturmar")
  });
  const remove = useMutation({
    mutationFn: (alunoId) => turmasService.removeAluno(turmaId, alunoId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["turma-alunos", turmaId] });
      qc.invalidateQueries({ queryKey: ["alunos"] });
      toast.success("Aluno removido da turma");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
      "Alunos enturmados",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-2", children: [
        alunosNaTurma.length,
        "/",
        vagas
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : alunosNaTurma.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum aluno enturmado ainda." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: alunosNaTurma.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          a.nome,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "— ",
            a.escola
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "text-destructive hover:text-destructive",
            onClick: () => remove.mutate(a.id),
            children: "Remover"
          }
        )
      ] }, a.id)) }),
      alunosNaTurma.length < vagas && disponiveis.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedAlunoId, onValueChange: setSelectedAlunoId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecionar aluno..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: disponiveis.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: a.id, children: [
            a.nome,
            " — ",
            a.escola
          ] }, a.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            disabled: !selectedAlunoId || add.isPending,
            onClick: () => selectedAlunoId && add.mutate(selectedAlunoId),
            children: "Enturmar"
          }
        )
      ] }),
      alunosNaTurma.length >= vagas && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Turma completa — sem vagas disponíveis." })
    ] })
  ] });
}
function TurmaDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data: turma,
    isLoading
  } = useQuery({
    queryKey: ["turma", id],
    queryFn: () => turmasService.get(id)
  });
  const update = useMutation({
    mutationFn: (data) => turmasService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["turmas"]
      });
      qc.invalidateQueries({
        queryKey: ["turma", id]
      });
      toast.success("Turma atualizada");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao salvar")
  });
  const remove = useMutation({
    mutationFn: () => turmasService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["turmas"]
      });
      toast.success("Turma removida");
      navigate({
        to: "/turmas"
      });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao remover")
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  if (!turma) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Turma não encontrada." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: turma.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          turma.horario,
          " · ",
          turma.local
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/turmas", children: "Voltar" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TurmaForm, { defaultValues: turma, onSubmit: async (data) => {
      await update.mutateAsync(data);
    }, submitLabel: "Salvar alterações" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TurmaAlunosCard, { turmaId: turma.id, vagas: turma.vagas }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => {
      if (confirm("Remover esta turma e desvincular todos os alunos?")) remove.mutate();
    }, children: "Excluir turma" }) })
  ] });
}
export {
  TurmaDetail as component
};
