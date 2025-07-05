import * as questionEndpoints from "./generated/question/question"
import * as questionZodSchemas from "./generated/question/question.zod"

export const api = {
  question: questionEndpoints,
  _schemas: {
    ...questionZodSchemas,
  },
}
