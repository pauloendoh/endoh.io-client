import { produce } from "immer";
import { useMutation } from "react-query";
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";

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
