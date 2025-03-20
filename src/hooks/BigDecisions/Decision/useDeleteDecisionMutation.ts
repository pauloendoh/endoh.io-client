import { useMutation } from "@tanstack/react-query"
import { urls } from "utils/urls"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import myAxios from "../../../utils/consts/myAxios"
import { myQueryClient } from "../../../utils/consts/myQueryClient"

export default function useDeleteDecisionMutation() {
  return useMutation(
    (decisionId: number) =>
      myAxios
        .delete(urls.api.BigDecisions.decision + "/" + decisionId)
        .then((res) => res.data),
    {
      onSuccess: (_, decisionId) => {
        const decisions =
          myQueryClient.getQueryData<DecisionDto[]>([
            urls.api.BigDecisions.decision,
          ]) || []

        const newDecisions = decisions.filter((d) => d.id !== decisionId)

        myQueryClient.setQueryData(
          [urls.api.BigDecisions.decision],
          newDecisions
        )
        // props.setSuccessMessage("Decision saved!")
        // handleClose()
        // navigate(PATHS.BigDecisions.decision(res.data))
      },
    }
  )
}
