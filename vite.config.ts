import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    pluginRewriteAll(),
    EnvironmentPlugin("all", { prefix: "REACT_" }),
  ],
  define: {
    "process.env": {},
  },
});
//
