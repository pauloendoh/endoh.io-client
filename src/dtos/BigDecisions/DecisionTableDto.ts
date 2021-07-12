import { DecisionTableItemDto } from './DecisionTableItemDto';

export interface DecisionTableDto {
  id: number
  userId: number
  decisionId: number

  // items: DecisionTableItem[]
  title: string

  index: number

  items?: DecisionTableItemDto[]

  createdAt: string

  updatedAt: string
}
