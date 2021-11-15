import { useQuery } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import myAxios from "../../../utils/consts/myAxios";
import apiUrls from "../../../utils/url/urls/apiUrls";

const decisionsQK = apiUrls.BigDecisions.decision;

export default function useDecisionsQuery() {
  return useQuery(decisionsQK, () =>
    myAxios
      .get<DecisionDto[]>(apiUrls.BigDecisions.decision)
      .then((res) => res.data)
  );
}
