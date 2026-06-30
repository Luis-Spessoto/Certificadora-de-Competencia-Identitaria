import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { R as Route, a as useNavigate, b as useQueryClient, t as toast, L as Link } from "./router-X-RD508Q.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
import { T as TutorForm } from "./TutorForm-B6Ip1RNp.js";
import { T as TutorOficinasCard } from "./TutorOficinasCard-BdwUEVVm.js";
import { B as Button } from "./button-D6pPiZoM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types--ofDvtVS.js";
import "./input-BAbo1PnM.js";
import "./utils-Bz4m9VPB.js";
import "./label-CGQJOB1N.js";
import "./select-B0KGSWrx.js";
import "./createLucideIcon-QBZlNJG1.js";
import "./card-Ds5oDOXi.js";
function TutorDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data: tutor,
    isLoading
  } = useQuery({
    queryKey: ["tutor", id],
    queryFn: () => tutoresService.get(id)
  });
  const update = useMutation({
    mutationFn: (data) => tutoresService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tutores"]
      });
      qc.invalidateQueries({
        queryKey: ["tutor", id]
      });
      toast.success("Tutor atualizado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao salvar")
  });
  const remove = useMutation({
    mutationFn: () => tutoresService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tutores"]
      });
      toast.success("Tutor removido");
      navigate({
        to: "/tutores"
      });
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  if (!tutor) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tutor não encontrado." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: tutor.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: tutor.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tutores", children: "Voltar" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TutorForm, { defaultValues: tutor, showAdminFields: true, onSubmit: async (data) => {
      await update.mutateAsync(data);
    }, submitLabel: "Salvar alterações" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TutorOficinasCard, { tutorId: tutor.id }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => {
      if (confirm("Remover este tutor?")) remove.mutate();
    }, children: "Excluir tutor" }) })
  ] });
}
export {
  TutorDetail as component
};
