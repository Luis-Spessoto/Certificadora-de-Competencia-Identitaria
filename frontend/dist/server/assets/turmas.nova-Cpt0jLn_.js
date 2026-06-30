import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { a as useNavigate, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as turmasService } from "./alunosService-DJz8e1qL.js";
import { T as TurmaForm } from "./TurmaForm-BT5yWf5u.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types--ofDvtVS.js";
import "./button-D6pPiZoM.js";
import "./utils-Bz4m9VPB.js";
import "./input-BAbo1PnM.js";
import "./label-CGQJOB1N.js";
function NovaTurma() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: turmasService.create,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["turmas"]
      });
      toast.success("Turma criada");
      navigate({
        to: "/turmas"
      });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao criar turma")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Nova turma" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Crie uma turma e defina horário, local e vagas." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TurmaForm, { onSubmit: async (data) => {
      await create.mutateAsync(data);
    }, submitLabel: "Criar turma" })
  ] });
}
export {
  NovaTurma as component
};
