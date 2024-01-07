import { DecisionTableItemDto } from "./DecisionTableItemDto"

export interface DecisionTableDto {
  id: number | null
  userId: number | null
  decisionId: number

  // items: DecisionTableItem[]
  title: string

  index: number | null

  items?: DecisionTableItemDto[]

  createdAt: string

  updatedAt: string
}

export const newDecisionTableDto = (decisionId: number): DecisionTableDto => ({
  id: null,
  userId: null,
  decisionId,
  title: "",
  index: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})
