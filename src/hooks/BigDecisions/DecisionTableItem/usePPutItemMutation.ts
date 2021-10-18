import produce from "immer";
import { useMutation } from "react-query";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import { DecisionTableItemDto } from "../../../types/domain/big-decisions/DecisionTableItemDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";

export default function usePPutItemMutation(decisionId: number) {
  return useMutation(
    (sentItem: DecisionTableItemDto) =>
      myAxios
        .post<DecisionTableItemDto>(
          API.BigDecisions.decisionTableItem,
          sentItem
        )
        .then((res) => res.data),
    {
      onSuccess: (returned, sentItem) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          API.BigDecisions.decision
        );

        const newDecisions = produce(decisions, (draft) => {
          const decisionIndex = draft.findIndex((d) => d.id === decisionId);
          const tableIndex = draft[decisionIndex].tables.findIndex(
            (table) => table.id === returned.decisionTableId
          );
          const itemIndex = draft[decisionIndex].tables[
            tableIndex
          ].items.findIndex((item) => item.id === returned.id);

          // we use key={id+updatedAt}. If we keep the updatedAt, it won't re-render, and we can still work on two tabs at the same time
          returned.updatedAt = sentItem.updatedAt;

          if (~itemIndex)
            draft[decisionIndex].tables[tableIndex].items[itemIndex] = returned;
          else draft[decisionIndex].tables[tableIndex].items.push(returned);
        });

        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions);
      },
    }
  );
}
