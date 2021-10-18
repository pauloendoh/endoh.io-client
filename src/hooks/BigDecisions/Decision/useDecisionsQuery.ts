import { useQuery } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";

const decisionsQK = API.BigDecisions.decision;

export default function useDecisionsQuery() {
  return useQuery(decisionsQK, () =>
    myAxios
      .get<DecisionDto[]>(API.BigDecisions.decision)
      .then((res) => res.data)
  );
}
