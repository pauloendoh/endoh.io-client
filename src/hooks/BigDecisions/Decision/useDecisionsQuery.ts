import { useQuery } from "react-query"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto"

const decisionsQK = API.BigDecisions.decision

export default function useDecisionsQuery() {
  return useQuery(decisionsQK, () =>
    MY_AXIOS.get<DecisionDto[]>(API.BigDecisions.decision).then(
      (res) => res.data
    )
  )
}
