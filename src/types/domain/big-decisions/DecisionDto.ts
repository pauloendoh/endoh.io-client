import { DecisionTableDto } from "./DecisionTableDto";

export interface DecisionDto {
  id: number;
  userId: number;

  title: string;

  isPriority: boolean;

  tables?: DecisionTableDto[];

  createdAt?: string;

  updatedAt?: string;
}

export const newDecisionDto = (): DecisionDto => ({
  id: null,
  userId: null,
  title: "",
  isPriority: true,
});
