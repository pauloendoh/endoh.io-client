import { DecisionTableItemDto } from "../../../types/domain/big-decisions/DecisionTableItemDto";
export default function getFinalWeight(items: DecisionTableItemDto[]) {
  return items
    .filter((item) => item.weight >= 3)
    .reduce((sum, current) => sum + current.weight, 0);
}
