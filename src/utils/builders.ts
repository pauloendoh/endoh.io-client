import { Learning } from "generated/graphql"

export const buildLearning = (p?: Learning): Learning => ({
  datetime: new Date().toISOString(),
  description: "",
  isHighlight: false,
  points: 0,
  createdAt: new Date().toISOString(),
  id: 0,
  updatedAt: new Date().toISOString(),
  userId: 0,
  ...p,
})
