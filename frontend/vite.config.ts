import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import purgeIcons from "vite-plugin-purge-icons";
import path from "path";

export default defineConfig({
  plugins: [react(), purgeIcons()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ],
    },
  },
  build: {
    cssCodeSplit: true,
    outDir: "dist",
    assetsDir: "./src/assets",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "shared-library": path.resolve(__dirname, "../shared-library")
    },
  },
});
