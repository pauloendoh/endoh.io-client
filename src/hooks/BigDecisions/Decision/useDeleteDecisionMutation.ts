import { useMutation } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";
import apiUrls from "../../../utils/url/urls/apiUrls";

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
