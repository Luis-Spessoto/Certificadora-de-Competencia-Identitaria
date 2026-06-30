import { O as useRouter, W as jsxRuntimeExports, a1 as Outlet, r as reactExports } from "./server-BXgX27qI.js";
import { u as useAuth, a as useNavigate, L as Link } from "./router-X-RD508Q.js";
import { B as Button } from "./button-D6pPiZoM.js";
import { c as cn } from "./utils-Bz4m9VPB.js";
import { c as createLucideIcon } from "./createLucideIcon-QBZlNJG1.js";
import { U as Users, B as BookOpen, G as GraduationCap } from "./users-B_h33y_A.js";
import { C as ClipboardCheck, S as School } from "./school-CPPSxZxD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
}
const __iconNode$2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2", key: "1nfge6" }],
  ["path", { d: "m14.305 16.53.923-.382", key: "1itpsq" }],
  ["path", { d: "m15.228 13.852-.923-.383", key: "eplpkm" }],
  ["path", { d: "m16.852 12.228-.383-.923", key: "13v3q0" }],
  ["path", { d: "m16.852 17.772-.383.924", key: "1i8mnm" }],
  ["path", { d: "m19.148 12.228.383-.923", key: "1q8j1v" }],
  ["path", { d: "m19.53 18.696-.382-.924", key: "vk1qj3" }],
  ["path", { d: "m20.772 13.852.924-.383", key: "n880s0" }],
  ["path", { d: "m20.772 16.148.924.383", key: "1g6xey" }],
  ["circle", { cx: "18", cy: "15", r: "3", key: "gjjjvw" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCog = createLucideIcon("user-cog", __iconNode);
const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tutores", label: "Tutores", icon: Users, adminOnly: true },
  { to: "/aprovacoes", label: "Aprovações", icon: ClipboardCheck, adminOnly: true },
  { to: "/alunos", label: "Alunos", icon: School },
  { to: "/turmas", label: "Turmas", icon: BookOpen },
  { to: "/meu-perfil", label: "Meu perfil", icon: UserCog }
];
function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const visibleItems = items.filter((i) => !i.adminOnly || user?.role === "admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex w-64 flex-col border-r border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-6 py-5 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "ELLP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Gestão de Oficinas" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 p-3", children: visibleItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to || pathname.startsWith(item.to + "/");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
              item.label
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: user?.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground capitalize", children: user?.role })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            className: "w-full justify-start gap-2",
            onClick: () => {
              logout();
              navigate({ to: "/login" });
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              "Sair"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
function AuthenticatedLayout() {
  const {
    isAuthenticated,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && !isAuthenticated) navigate({
      to: "/login"
    });
  }, [loading, isAuthenticated, navigate]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center text-muted-foreground", children: "Carregando..." });
  }
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, {});
}
export {
  AuthenticatedLayout as component
};
