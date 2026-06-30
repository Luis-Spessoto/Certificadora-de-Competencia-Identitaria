import { r as reactExports, W as jsxRuntimeExports } from "./server-BXgX27qI.js";
import { u as useAuth, a as useNavigate, L as Link, t as toast } from "./router-X-RD508Q.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { I as Input } from "./input-BAbo1PnM.js";
import { L as Label } from "./label-CGQJOB1N.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
function LoginPage() {
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [senha, setSenha] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, senha);
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full max-w-sm space-y-5 rounded-lg border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Entrar no ELLP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Acesso para tutores e administradores." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "E-mail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Senha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: senha, onChange: (e) => setSenha(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Entrando..." : "Entrar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
      "Não tem conta? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", className: "text-primary hover:underline", children: "Cadastre-se" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "rounded-md bg-muted p-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Demo:" }),
      " admin@ellp.utfpr.edu.br / admin123",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "tutor@ellp.utfpr.edu.br / tutor123"
    ] })
  ] }) });
}
export {
  LoginPage as component
};
