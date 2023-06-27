import { Learning } from "generated/graphql"

export const buildLearning = (p?: Learning): Learning => ({
  datetime: new Date().toISOString(),
  description: "",
  isHighlight: false,
  points: 0,
  ...p,
})
