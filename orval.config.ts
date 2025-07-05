import { defineConfig } from "orval"

export default defineConfig({
  main: {
    input: "./swagger.yaml",
    output: {
      client: "axios-functions",
      mode: "tags-split",

      target: "./src/orval/generated",
      override: {
        mutator: {
          path: "./src/utils/consts/myAxios.ts",
          name: "customInstance",
        },
      },
    },
  },
  zod: {
    input: "./swagger.yaml",
    output: {
      client: "zod",
      mode: "tags-split",
      target: "./src/orval/generated",
      fileExtension: ".zod.ts",
      override: {
        zod: {
          generate: {
            body: true,
            header: true,
            param: true,
            query: true,
            response: true,
          },
          generateEachHttpStatus: true,
        },
      },
    },
  },
})
