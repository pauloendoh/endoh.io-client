import { useQuery } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import apiUrls from "../../../utils/consts/apiUrls";
import myAxios from "../../../utils/consts/myAxios";

const decisionsQK = apiUrls.BigDecisions.decision;

export default function useDecisionsQuery() {
  return useQuery(decisionsQK, () =>
    myAxios
      .get<DecisionDto[]>(apiUrls.BigDecisions.decision)
      .then((res) => res.data)
  );
}
