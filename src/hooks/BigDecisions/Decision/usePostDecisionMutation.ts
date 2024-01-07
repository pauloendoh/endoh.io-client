import { useMutation } from "@tanstack/react-query"
import { produce } from "immer"
import { urls } from "utils/urls"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import myAxios from "../../../utils/consts/myAxios"
import { myQueryClient } from "../../../utils/consts/myQueryClient"

export default function usePostDecisionMutation() {
  return useMutation(
    (decision: DecisionDto) =>
      myAxios
        .post<DecisionDto>(urls.api.BigDecisions.decision, decision)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const decisions =
          myQueryClient.getQueryData<DecisionDto[]>([
            urls.api.BigDecisions.decision,
          ]) || []

        const newDecisions = produce(decisions, (draft) => {
          const index = decisions.findIndex((d) => d.id === data.id)
          if (~index) {
            draft[index] = data
          } else {
            draft = [data, ...decisions]
          }
          return draft
        })

        myQueryClient.setQueryData(
          [urls.api.BigDecisions.decision],
          newDecisions
        )
      },
    }
  )
}
