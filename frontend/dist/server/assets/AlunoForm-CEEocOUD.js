import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useForm, a, o as objectType, e as enumType, s as stringType, l as literalType } from "./types--ofDvtVS.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { I as Input } from "./input-BAbo1PnM.js";
import { L as Label } from "./label-CGQJOB1N.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B0KGSWrx.js";
const schema = objectType({
  nome: stringType().trim().min(2, "Mínimo 2 caracteres").max(120),
  email: stringType().trim().email("E-mail inválido").max(255).optional().or(literalType("")),
  escola: stringType().trim().min(2, "Informe a escola").max(120),
  serie: stringType().trim().min(1, "Informe a série").max(30),
  responsavel: stringType().trim().max(120).optional().or(literalType("")),
  telefoneResponsavel: stringType().trim().max(30).optional().or(literalType("")),
  status: enumType(["ativo", "inativo"]).optional()
});
function AlunoForm({ defaultValues, onSubmit, submitLabel = "Salvar", showStatusField }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: a(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      email: defaultValues?.email ?? "",
      escola: defaultValues?.escola ?? "",
      serie: defaultValues?.serie ?? "",
      responsavel: defaultValues?.responsavel ?? "",
      telefoneResponsavel: defaultValues?.telefoneResponsavel ?? "",
      status: defaultValues?.status ?? "ativo"
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      className: "space-y-4",
      onSubmit: handleSubmit(async (v) => {
        await onSubmit({
          nome: v.nome,
          email: v.email || void 0,
          escola: v.escola,
          serie: v.serie,
          responsavel: v.responsavel || void 0,
          telefoneResponsavel: v.telefoneResponsavel || void 0,
          status: v.status
        });
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome do aluno", error: errors.nome?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("nome"), placeholder: "Ex: Maria Souza" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", error: errors.email?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", ...register("email"), placeholder: "opcional" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Escola / ONG", error: errors.escola?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("escola"), placeholder: "Ex: E.E. Prof. Alcides" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Série / Ano", error: errors.serie?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("serie"), placeholder: "Ex: 8º ano" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome do responsável", error: errors.responsavel?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("responsavel"), placeholder: "opcional" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone do responsável", error: errors.telefoneResponsavel?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("telefoneResponsavel"), placeholder: "(43) 99999-0000" }) }),
          showStatusField && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: watch("status"),
              onValueChange: (v) => setValue("status", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ativo", children: "Ativo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inativo", children: "Inativo" })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Salvando..." : submitLabel })
      ]
    }
  );
}
function Field({ label, error, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
export {
  AlunoForm as A
};
