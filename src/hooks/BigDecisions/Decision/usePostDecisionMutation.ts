import { produce } from "immer";
import { useMutation } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";
import apiUrls from "../../../utils/url/urls/apiUrls";

export default function usePostDecisionMutation() {
  return useMutation(
    (decision: DecisionDto) =>
      myAxios
        .post<DecisionDto>(apiUrls.BigDecisions.decision, decision)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          apiUrls.BigDecisions.decision
        );

        const newDecisions = produce(decisions, (draft) => {
          const index = decisions.findIndex((d) => d.id === data.id);
          if (~index) {
            draft[index] = data;
          } else {
            draft = [data, ...decisions];
          }
          return draft;
        });

        myQueryClient.setQueryData(apiUrls.BigDecisions.decision, newDecisions);
      },
    }
  );
}
