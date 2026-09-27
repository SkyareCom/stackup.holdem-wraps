import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/stackup.holdem-wraps/",
  plugins: [react(), tailwindcss()],
});