import { viteCommonjs } from "@originjs/vite-plugin-commonjs"
import react from "@vitejs/plugin-react"
import EnvironmentPlugin from "vite-plugin-environment"
import pluginRewriteAll from "vite-plugin-rewrite-all"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    pluginRewriteAll(),
    EnvironmentPlugin("all", { prefix: "REACT_" }),
    viteCommonjs(),
  ],
  test: {
    environment: "happy-dom",
    dir: "src",
    setupFiles: "./vitest/globalSetup.ts",
  },
})
