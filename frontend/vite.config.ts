import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Injeta a configuração de subpasta necessária para o GitHub Pages
  vite: {
    base: "/Certificadora-de-Competencia-Identitaria/",
  }
});
