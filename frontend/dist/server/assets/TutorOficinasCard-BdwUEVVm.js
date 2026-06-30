import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useQuery } from "./useQuery-BBHTbV8Q.js";
import { t as tutoresService } from "./tutoresService-Da6jc7JF.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Ds5oDOXi.js";
function TutorOficinasCard({ tutorId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tutor", tutorId, "oficinas"],
    queryFn: () => tutoresService.oficinas(tutorId)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Oficinas vinculadas" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
      !isLoading && (!data || data.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhuma oficina vinculada." }),
      data && data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: data.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-md border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: o.nome || o.titulo }),
        o.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.descricao })
      ] }, o.id)) })
    ] })
  ] });
}
export {
  TutorOficinasCard as T
};
