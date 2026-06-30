import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useForm, a, o as objectType, e as enumType, s as stringType, l as literalType } from "./types--ofDvtVS.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { I as Input } from "./input-BAbo1PnM.js";
import { L as Label } from "./label-CGQJOB1N.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B0KGSWrx.js";
const schema = objectType({
  nome: stringType().trim().min(2, "Mínimo 2 caracteres").max(120),
  email: stringType().trim().email("E-mail inválido").max(255),
  telefone: stringType().trim().max(30).optional().or(literalType("")),
  curso: stringType().trim().min(2).max(120),
  matricula: stringType().trim().min(2).max(30),
  role: enumType(["admin", "tutor"]).optional(),
  status: enumType(["pendente", "ativo", "inativo"]).optional()
});
function TutorForm({ defaultValues, onSubmit, submitLabel = "Salvar", showAdminFields }) {
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
      telefone: defaultValues?.telefone ?? "",
      curso: defaultValues?.curso ?? "",
      matricula: defaultValues?.matricula ?? "",
      role: defaultValues?.role ?? "tutor",
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
          email: v.email,
          telefone: v.telefone || void 0,
          curso: v.curso,
          matricula: v.matricula,
          role: v.role,
          status: v.status
        });
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", error: errors.nome?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("nome") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", error: errors.email?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", ...register("email") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone", error: errors.telefone?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("telefone") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Matrícula", error: errors.matricula?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("matricula") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Curso", error: errors.curso?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("curso") }) }),
          showAdminFields && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Papel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: watch("role"), onValueChange: (v) => setValue("role", v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tutor", children: "Tutor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Administrador" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: watch("status"), onValueChange: (v) => setValue("status", v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ativo", children: "Ativo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pendente", children: "Pendente" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inativo", children: "Inativo" })
              ] })
            ] }) })
          ] })
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
  TutorForm as T
};
