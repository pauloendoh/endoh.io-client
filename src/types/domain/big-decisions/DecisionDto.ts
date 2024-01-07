import { DecisionTableDto } from "./DecisionTableDto"

export interface DecisionDto {
  id: number | null
  userId: number | null

  title: string

  isPriority: boolean

  tables?: DecisionTableDto[]

  createdAt?: string

  updatedAt?: string
}

export const newDecisionDto = (): DecisionDto => ({
  id: null,
  userId: null,
  title: "",
  isPriority: true,
})
