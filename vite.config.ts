import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"
import path from "path/win32";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 6767,
  },
  plugins: [react(), tailwindcss()],
  base: '/CESWEB_PORTFOLIO/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
