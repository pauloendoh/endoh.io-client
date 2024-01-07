import { useMutation } from "@tanstack/react-query"
import { produce } from "immer"
import { DecisionTableDto } from "types/domain/big-decisions/DecisionTableDto"
import { urls } from "utils/urls"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import myAxios from "../../../utils/consts/myAxios"
import { myQueryClient } from "../../../utils/consts/myQueryClient"

export default function useDeleteTableMutation() {
  const { setSuccessMessage } = useSnackbarStore()
  return useMutation(
    (table: DecisionTableDto) =>
      myAxios
        .delete(urls.api.BigDecisions.decisionTable + "/" + table.id)
        .then((res) => res.data),
    {
      onSuccess: (_, sentTable) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>([
          urls.api.BigDecisions.decision,
        ])

        const newDecisions = produce(decisions, (draft) => {
          if (!draft) return []
          if (!decisions) return []
          const decisionIndex = decisions.findIndex(
            (d) => d.id === sentTable.decisionId
          )

          const tables = decisions[decisionIndex].tables
          if (!tables) return

          const tableIndex = tables.findIndex((t) => t.id === sentTable.id)

          tables.splice(tableIndex, 1)

          return draft
        })

        myQueryClient.setQueryData(
          [urls.api.BigDecisions.decision],
          newDecisions
        )

        setSuccessMessage("Option deleted!")
      },
    }
  )
}
