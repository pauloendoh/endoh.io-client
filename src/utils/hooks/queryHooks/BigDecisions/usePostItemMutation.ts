import produce from 'immer'
import { useMutation } from "react-query"
import API from "../../../../consts/API"
import { myQueryClient } from "../../../../consts/myQueryClient"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { DecisionDto } from "../../../../dtos/BigDecisions/DecisionDto"
import { DecisionTableItemDto } from "../../../../dtos/BigDecisions/DecisionTableItemDto"

export default function usePostItemMutation(decisionId: number) {
  return useMutation(
    (item: DecisionTableItemDto) =>
      MY_AXIOS.post<DecisionTableItemDto>(
        API.BigDecisions.decisionTableItem,
        item
      ).then((res) => res.data),
    {
      onSuccess: (newItem) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          API.BigDecisions.decision
        )

        const newDecisions = produce(decisions, draft => {
          const decisionIndex = draft.findIndex((d) => d.id === decisionId)
          const tableIndex = draft[decisionIndex].tables.findIndex(
            (table) => table.id === newItem.decisionTableId
          )
          draft[decisionIndex].tables[tableIndex].items.push(newItem)
          
        })
        

        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions)
      },
    }
  )
}
