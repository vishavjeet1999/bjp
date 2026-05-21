import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  preview: {
    allowedHosts: ["billajantaparty.in"],
  },
  build: {
    target: "es2020",
    outDir: "dist",
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-framer-motion";
          if (id.includes("lucide-react")) return "vendor-lucide";
          if (id.includes("@tanstack")) return "vendor-tanstack";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("react")) return "vendor-react";
        },
      },
    },
  },
});
