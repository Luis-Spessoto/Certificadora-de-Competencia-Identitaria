import { W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useForm, a, o as objectType, c as coerce, s as stringType, l as literalType } from "./types--ofDvtVS.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { I as Input } from "./input-BAbo1PnM.js";
import { L as Label } from "./label-CGQJOB1N.js";
const schema = objectType({
  nome: stringType().trim().min(2, "Mínimo 2 caracteres").max(120),
  oficinaId: stringType().trim().min(1, "Selecione uma oficina"),
  tutorId: stringType().trim().optional().or(literalType("")),
  horario: stringType().trim().min(2, "Informe o horário").max(80),
  local: stringType().trim().min(2, "Informe o local").max(120),
  vagas: coerce.number().int().min(1, "Mínimo 1 vaga").max(200)
});
function TurmaForm({ defaultValues, onSubmit, submitLabel = "Salvar" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: a(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      oficinaId: defaultValues?.oficinaId ?? "",
      tutorId: defaultValues?.tutorId ?? "",
      horario: defaultValues?.horario ?? "",
      local: defaultValues?.local ?? "",
      vagas: defaultValues?.vagas ?? 20
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      className: "space-y-4",
      onSubmit: handleSubmit(async (v) => {
        await onSubmit({
          nome: v.nome,
          oficinaId: v.oficinaId,
          tutorId: v.tutorId || void 0,
          horario: v.horario,
          local: v.local,
          vagas: v.vagas
        });
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome da turma", error: errors.nome?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("nome"), placeholder: "Ex: Turma A — Lógica com Scratch" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ID da Oficina", error: errors.oficinaId?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("oficinaId"), placeholder: "ID da oficina (módulo Danilo)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Horário", error: errors.horario?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("horario"), placeholder: "Ex: Sábado 09:00–11:00" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Local", error: errors.local?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("local"), placeholder: "Ex: Lab. Informática UTFPR" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vagas", error: errors.vagas?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, ...register("vagas") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ID do Tutor", error: errors.tutorId?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("tutorId"), placeholder: "opcional" }) })
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
  TurmaForm as T
};
