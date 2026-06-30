import { r as reactExports, W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { a as useNavigate, L as Link, r as register, t as toast } from "./router-X-RD508Q.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { I as Input } from "./input-BAbo1PnM.js";
import { L as Label } from "./label-CGQJOB1N.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
function CadastroPage() {
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    nome: "",
    email: "",
    telefone: "",
    curso: "",
    matricula: "",
    senha: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  function update(k, v) {
    setForm((f) => ({
      ...f,
      [k]: v
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Cadastro enviado! Aguarde aprovação do coordenador.");
      navigate({
        to: "/login"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full max-w-lg space-y-4 rounded-lg border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Cadastro de tutor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Após o envio, seu cadastro ficará pendente de aprovação pelo coordenador." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => update("nome", e.target.value), required: true, maxLength: 120 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => update("email", e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Telefone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.telefone, onChange: (e) => update("telefone", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Curso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.curso, onChange: (e) => update("curso", e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Matrícula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.matricula, onChange: (e) => update("matricula", e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: form.senha, onChange: (e) => update("senha", e.target.value), required: true, minLength: 6 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Enviando..." : "Enviar cadastro" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
      "Já tem conta? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Entrar" })
    ] })
  ] }) });
}
export {
  CadastroPage as component
};
