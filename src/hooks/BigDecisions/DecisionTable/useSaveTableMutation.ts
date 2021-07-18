import { produce } from "immer"
import { useMutation } from "react-query"
import API from "../../../consts/API"
import { myQueryClient } from "../../../consts/myQueryClient"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import { DecisionTableDto } from "../../../dtos/BigDecisions/DecisionTableDto"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"

export default function useSaveTableMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (table: DecisionTableDto) =>
      MY_AXIOS.post<DecisionDto>(API.BigDecisions.decisionTable, table).then(
        (res) => res.data
      ),
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

        setSuccessMessage("Table saved!")
      },
      onError: (err) => {
        setErrorMessage("Error while saving table: " + JSON.stringify(err))
      },
    }
  )
}
