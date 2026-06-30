import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { a as useNavigate, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { a as alunosService } from "./alunosService-DJz8e1qL.js";
import { A as AlunoForm } from "./AlunoForm-CEEocOUD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types--ofDvtVS.js";
import "./button-D6pPiZoM.js";
import "./utils-Bz4m9VPB.js";
import "./input-BAbo1PnM.js";
import "./label-CGQJOB1N.js";
import "./select-B0KGSWrx.js";
import "./createLucideIcon-QBZlNJG1.js";
function NovoAluno() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: alunosService.create,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["alunos"]
      });
      toast.success("Aluno cadastrado");
      navigate({
        to: "/alunos"
      });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao cadastrar")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Novo aluno" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastro de aluno participante das oficinas." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlunoForm, { onSubmit: async (data) => {
      await create.mutateAsync(data);
    }, submitLabel: "Cadastrar aluno" })
  ] });
}
export {
  NovoAluno as component
};
