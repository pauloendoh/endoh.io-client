import * as gotItEndpoints from "./generated/got-it/got-it"
import * as gotItZodSchemas from "./generated/got-it/got-it.zod"
import * as questionEndpoints from "./generated/question/question"
import * as questionZodSchemas from "./generated/question/question.zod"

export const api = {
  question: questionEndpoints,
  gotIt: gotItEndpoints,

  _schemas: {
    ...questionZodSchemas,
    ...gotItZodSchemas,
  },
}
