import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { a as useNavigate, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
import { T as TutorForm } from "./TutorForm-B6Ip1RNp.js";
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
function NovoTutor() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: tutoresService.create,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tutores"]
      });
      toast.success("Tutor criado");
      navigate({
        to: "/tutores"
      });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao criar")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Novo tutor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastro manual pelo administrador." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TutorForm, { showAdminFields: true, onSubmit: async (data) => {
      await create.mutateAsync(data);
    }, submitLabel: "Criar tutor" })
  ] });
}
export {
  NovoTutor as component
};
