import { useQuery } from "@tanstack/react-query"
import { urls } from "utils/urls"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import myAxios from "../../../utils/consts/myAxios"

const decisionsQK = urls.api.BigDecisions.decision

export default function useDecisionsQuery() {
  return useQuery([decisionsQK], () =>
    myAxios.get<DecisionDto[]>(decisionsQK).then((res) => res.data)
  )
}
