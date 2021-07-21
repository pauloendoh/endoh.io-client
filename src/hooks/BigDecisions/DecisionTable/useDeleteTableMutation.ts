import { produce } from "immer"
import { useMutation } from "react-query"
import API from "../../../consts/API"
import { myQueryClient } from "../../../consts/myQueryClient"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { DecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import useSnackbarStore from '../../../store/zustand/useSnackbarStore'
import { DecisionTableDto } from "../../../dtos/BigDecisions/DecisionTableDto"

export default function useDeleteTableMutation() {

  const {setSuccessMessage} = useSnackbarStore()
  return useMutation(
    (table: DecisionTableDto) =>
      MY_AXIOS.delete(API.BigDecisions.decisionTable + "/" + table.id).then(
        (res) => res.data
      ),
    {
      onSuccess: (_, sentTable) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          API.BigDecisions.decision
        )

        const newDecisions = produce(decisions, (draft) => {
          const decisionIndex = decisions.findIndex(
            (d) => d.id === sentTable.decisionId
          )

          const tableIndex = decisions[decisionIndex].tables.findIndex(
            (t) => t.id === sentTable.id
          )

          draft[decisionIndex].tables.splice(tableIndex, 1)
          return draft
        })

        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions)
        
        setSuccessMessage("Option deleted!")
      },
    }
  )
}
