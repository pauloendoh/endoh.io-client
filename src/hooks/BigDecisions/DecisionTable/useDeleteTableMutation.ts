import { produce } from "immer";
import { useMutation } from "react-query";
import { DecisionTableDto } from "types/domain/big-decisions/DecisionTableDto";
import useSnackbarStore from "../../../store/zustand/useSnackbarStore";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";
import apiUrls from "../../../utils/url/urls/apiUrls";

export default function useDeleteTableMutation() {
  const { setSuccessMessage } = useSnackbarStore();
  return useMutation(
    (table: DecisionTableDto) =>
      myAxios
        .delete(apiUrls.BigDecisions.decisionTable + "/" + table.id)
        .then((res) => res.data),
    {
      onSuccess: (_, sentTable) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          apiUrls.BigDecisions.decision
        );

        const newDecisions = produce(decisions, (draft) => {
          const decisionIndex = decisions.findIndex(
            (d) => d.id === sentTable.decisionId
          );

          const tableIndex = decisions[decisionIndex].tables.findIndex(
            (t) => t.id === sentTable.id
          );

          draft[decisionIndex].tables.splice(tableIndex, 1);
          return draft;
        });

        myQueryClient.setQueryData(apiUrls.BigDecisions.decision, newDecisions);

        setSuccessMessage("Option deleted!");
      },
    }
  );
}
