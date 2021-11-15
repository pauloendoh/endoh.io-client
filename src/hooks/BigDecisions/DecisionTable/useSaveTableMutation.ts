import { produce } from "immer";
import { useMutation } from "react-query";
import useSnackbarStore from "../../../store/zustand/useSnackbarStore";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import { DecisionTableDto } from "../../../types/domain/big-decisions/DecisionTableDto";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";
import apiUrls from "../../../utils/url/urls/apiUrls";

export default function useSaveTableMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  return useMutation(
    (table: DecisionTableDto) =>
      myAxios
        .post<DecisionDto>(apiUrls.BigDecisions.decisionTable, table)
        .then((res) => res.data),
    {
      onSuccess: (returned) => {
        const decisions = myQueryClient.getQueryData<DecisionDto[]>(
          apiUrls.BigDecisions.decision
        );

        const newDecisions = produce(decisions, (draft) => {
          const index = decisions.findIndex((d) => d.id === returned.id);
          draft[index] = returned;
          return draft;
        });

        myQueryClient.setQueryData(apiUrls.BigDecisions.decision, newDecisions);

        setSuccessMessage("Table saved!");
      },
      onError: (err) => {
        setErrorMessage("Error while saving table: " + JSON.stringify(err));
      },
    }
  );
}
