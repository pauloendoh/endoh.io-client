import { useMutation } from "@tanstack/react-query"
import { produce } from "immer"
import { urls } from "utils/urls"
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import { DecisionTableItemDto } from "../../../types/domain/big-decisions/DecisionTableItemDto"
import myAxios from "../../../utils/consts/myAxios"
import { myQueryClient } from "../../../utils/consts/myQueryClient"

export default function usePPutItemMutation(decisionId: number) {
  return useMutation(
    (sentItem: DecisionTableItemDto) =>
      myAxios
        .post<DecisionTableItemDto>(
          urls.api.BigDecisions.decisionTableItem,
          sentItem
        )
        .then((res) => res.data),
    {
      onSuccess: (returned, sentItem) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>([
          urls.api.BigDecisions.decision,
        ])

        const newDecisions = produce(decisions, (draft) => {
          if (!draft) return []
          const decisionIndex = draft.findIndex((d) => d.id === decisionId)
          const tableIndex =
            draft?.[decisionIndex].tables?.findIndex(
              (table) => table.id === returned.decisionTableId
            ) ?? -1
          const itemIndex = draft[decisionIndex].tables?.[
            tableIndex
          ].items?.findIndex((item) => item.id === returned.id)

          // we use key={id+updatedAt}. If we keep the updatedAt, it won't re-render, and we can still work on two tabs at the same time
          returned.updatedAt = sentItem.updatedAt

          if (itemIndex === undefined) {
            console.log("itemIndex is undefined")
            return
          }

          if (~itemIndex)
            // @ts-ignore
            draft[decisionIndex].tables[tableIndex].items[itemIndex] = returned
          else {
            // @ts-ignore
            draft[decisionIndex].tables[tableIndex].items.push(returned)
          }
        })

        myQueryClient.setQueryData(
          [urls.api.BigDecisions.decision],
          newDecisions
        )
      },
    }
  )
}
