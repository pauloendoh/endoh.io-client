import { Learning } from "generated/graphql"

export const buildLearning = (p?: Learning): Learning => ({
  datetime: new Date().toISOString(),
  description: "",
  isHighlight: false,
  ...p,
})
