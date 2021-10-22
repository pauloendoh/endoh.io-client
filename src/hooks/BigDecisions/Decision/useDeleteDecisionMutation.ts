import { useMutation } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import apiUrls from "../../../utils/consts/apiUrls";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";

export default function useDeleteDecisionMutation() {
  return useMutation(
    (decisionId: number) =>
      myAxios
        .delete(apiUrls.BigDecisions.decision + "/" + decisionId)
        .then((res) => res.data),
    {
      onSuccess: (_, decisionId) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          apiUrls.BigDecisions.decision
        );

        const newDecisions = decisions.filter((d) => d.id !== decisionId);

        myQueryClient.setQueryData(apiUrls.BigDecisions.decision, newDecisions);
        // props.setSuccessMessage("Decision saved!")
        // handleClose()
        // history.push(PATHS.BigDecisions.decision(res.data))
      },
    }
  );
}
