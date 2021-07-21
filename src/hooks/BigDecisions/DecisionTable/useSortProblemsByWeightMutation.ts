import { produce } from "immer"
import { useMutation } from "react-query"
import API from "../../../consts/API"
import { myQueryClient } from "../../../consts/myQueryClient"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"

export default function useSortProblemsByWeightMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (data: { tableId: number; order: "asc" | "desc" }) =>
      MY_AXIOS.post<DecisionDto>(
        API.BigDecisions.sortProblemsByWeight,
        data
      ).then((res) => res.data),

    {
      onSuccess: (returned) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          API.BigDecisions.decision
        )

        const newDecisions = produce(decisions, (draft) => {
          const index = decisions.findIndex((d) => d.id === returned.id)
          draft[index] = returned
          return draft
        })

        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions)

      },
      onError: (err) => {
        setErrorMessage("Error while ordering table: " + JSON.stringify(err))
      },
    }
  )
}
