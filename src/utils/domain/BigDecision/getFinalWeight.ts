import { DecisionTableItemDto } from "./../../../dtos/BigDecisions/DecisionTableItemDto"
export default function getFinalWeight(items: DecisionTableItemDto[]) {
  return items
    .filter((item) => item.weight >= 3)
    .reduce((sum, current) => sum + current.weight, 0)
}
