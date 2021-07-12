export interface DecisionTableItemDto {
  id: number
  userId: number
  decisionTableId: number
  index: number
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
  problem: '',
  solution: '',
  weight: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})
