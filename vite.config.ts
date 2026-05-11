import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Репозиторий GitHub Pages: https://<user>.github.io/UCHITEL-NEIROSETI/ */
const GH_PAGES_BASE = "/UCHITEL-NEIROSETI/";

export default defineConfig(({ mode }) => ({
  /** На GitHub Pages проект живёт в подкаталоге; локально оставляем "/" */
  base: mode === "production" ? GH_PAGES_BASE : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
