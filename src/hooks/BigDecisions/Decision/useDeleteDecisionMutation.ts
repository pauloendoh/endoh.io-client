import { useMutation } from "react-query";
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";

export default function useDeleteDecisionMutation() {
  return useMutation(
    (decisionId: number) =>
      myAxios
        .delete(API.BigDecisions.decision + "/" + decisionId)
        .then((res) => res.data),
    {
      onSuccess: (_, decisionId) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          API.BigDecisions.decision
        );

        const newDecisions = decisions.filter((d) => d.id !== decisionId);

        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions);
        // props.setSuccessMessage("Decision saved!")
        // handleClose()
        // history.push(PATHS.BigDecisions.decision(res.data))
      },
    }
  );
}
