import { useMutation } from "@tanstack/react-query"
import { produce } from "immer"
import { urls } from "utils/urls"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import { DecisionTableDto } from "../../../types/domain/big-decisions/DecisionTableDto"
import myAxios from "../../../utils/consts/myAxios"
import { myQueryClient } from "../../../utils/consts/myQueryClient"

export default function useSaveTableMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (table: DecisionTableDto) =>
      myAxios
        .post<DecisionDto>(urls.api.BigDecisions.decisionTable, table)
        .then((res) => res.data),
    {
      onSuccess: (returned) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>([
          urls.api.BigDecisions.decision,
        ])

        const newDecisions = produce(decisions, (draft) => {
          if (!draft) return []
          if (!decisions) return []

          const index = decisions.findIndex((d) => d.id === returned.id)
          draft[index] = returned
          return draft
        })

        myQueryClient.setQueryData(
          [urls.api.BigDecisions.decision],
          newDecisions
        )

        setSuccessMessage("Table saved!")
      },
      onError: (err) => {
        setErrorMessage("Error while saving table: " + JSON.stringify(err))
      },
    }
  )
}
