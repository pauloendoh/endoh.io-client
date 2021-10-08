import { useQuery } from "react-query";
import API from "../../../consts/API";
import myAxios from "../../../consts/myAxios";
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto";

const decisionsQK = API.BigDecisions.decision;

export default function useDecisionsQuery() {
  return useQuery(decisionsQK, () =>
    myAxios
      .get<DecisionDto[]>(API.BigDecisions.decision)
      .then((res) => res.data)
  );
}
