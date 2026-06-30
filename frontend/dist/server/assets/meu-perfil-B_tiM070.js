import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { u as useAuth, b as useQueryClient, t as toast } from "./router-X-RD508Q.js";
import { u as useMutation } from "./useMutation-DqCqpFFD.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
import { T as TutorForm } from "./TutorForm-B6Ip1RNp.js";
import { T as TutorOficinasCard } from "./TutorOficinasCard-BdwUEVVm.js";
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
import "./card-Ds5oDOXi.js";
function MeuPerfil() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: tutor,
    isLoading
  } = useQuery({
    queryKey: ["tutor", user?.id],
    queryFn: () => tutoresService.get(user.id),
    enabled: !!user
  });
  const update = useMutation({
    mutationFn: (data) => tutoresService.update(user.id, data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tutor", user?.id]
      });
      toast.success("Perfil atualizado");
    }
  });
  if (isLoading || !tutor) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Meu perfil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Atualize seus dados de cadastro." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TutorForm, { defaultValues: tutor, onSubmit: async (data) => {
      await update.mutateAsync(data);
    }, submitLabel: "Salvar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TutorOficinasCard, { tutorId: tutor.id })
  ] });
}
export {
  MeuPerfil as component
};
