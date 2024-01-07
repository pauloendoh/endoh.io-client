import { useMutation } from "@tanstack/react-query"
import { produce } from "immer"
import { urls } from "utils/urls"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import myAxios from "../../../utils/consts/myAxios"
import { myQueryClient } from "../../../utils/consts/myQueryClient"

export default function useSortProblemsByWeightMutation() {
  const { setErrorMessage } = useSnackbarStore()

  return useMutation(
    (data: { tableId: number; order: "asc" | "desc" }) =>
      myAxios
        .post<DecisionDto>(urls.api.BigDecisions.sortProblemsByWeight, data)
        .then((res) => res.data),

    {
      onSuccess: (returned) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>([
          urls.api.BigDecisions.decision,
        ])

        const newDecisions = produce(decisions, (draft) => {
          if (!draft) return []
          const index = decisions?.findIndex((d) => d.id === returned.id)

          if (index === undefined) {
            console.log("index is undefined")
            return
          }

          draft[index] = returned
          return draft
        })

        myQueryClient.setQueryData(
          [urls.api.BigDecisions.decision],
          newDecisions
        )
      },
      onError: (err) => {
        setErrorMessage("Error while ordering table: " + JSON.stringify(err))
      },
    }
  )
}
