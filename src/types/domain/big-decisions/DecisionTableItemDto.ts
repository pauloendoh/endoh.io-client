export interface DecisionTableItemDto {
  id: number | null
  userId: number | null
  decisionTableId: number
  index: number | null
  problem: string
  solution: string
  weight: number
  createdAt: string
  updatedAt: string
}

export const newDecisionTableItemDto = (
  tableId: number
): DecisionTableItemDto => ({
  id: null,
  userId: null,
  decisionTableId: tableId,
  index: null,
  problem: "",
  solution: "",
  weight: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})
