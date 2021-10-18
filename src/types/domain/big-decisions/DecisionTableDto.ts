import { DecisionTableItemDto } from "./DecisionTableItemDto";

export interface DecisionTableDto {
  id: number;
  userId: number;
  decisionId: number;

  // items: DecisionTableItem[]
  title: string;

  index: number;

  items?: DecisionTableItemDto[];

  createdAt: string;

  updatedAt: string;
}

export const newDecisionTableDto = (decisionId: number): DecisionTableDto => ({
  id: null,
  userId: null,
  decisionId,
  title: "",
  index: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
