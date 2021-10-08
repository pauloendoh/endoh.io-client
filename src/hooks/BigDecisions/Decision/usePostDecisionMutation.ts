import { produce } from "immer";
import { useMutation } from "react-query";
import API from "../../../consts/API";
import myAxios from "../../../consts/myAxios";
import { myQueryClient } from "../../../consts/myQueryClient";
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto";

export default function usePostDecisionMutation() {
  return useMutation(
    (decision: DecisionDto) =>
      myAxios
        .post<DecisionDto>(API.BigDecisions.decision, decision)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          API.BigDecisions.decision
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

        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions);
        // props.setSuccessMessage("Decision saved!")
        // handleClose()
        // history.push(PATHS.BigDecisions.decision(res.data))
      },
    }
  );
}
