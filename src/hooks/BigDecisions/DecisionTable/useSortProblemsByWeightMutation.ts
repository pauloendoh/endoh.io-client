import { produce } from "immer";
import { useMutation } from "react-query";
import useSnackbarStore from "../../../store/zustand/useSnackbarStore";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import myAxios from "../../../utils/consts/myAxios";
import { myQueryClient } from "../../../utils/consts/myQueryClient";
import apiUrls from "../../../utils/url/urls/apiUrls";

export default function useSortProblemsByWeightMutation() {
  const { setErrorMessage } = useSnackbarStore();

  return useMutation(
    (data: { tableId: number; order: "asc" | "desc" }) =>
      myAxios
        .post<DecisionDto>(apiUrls.BigDecisions.sortProblemsByWeight, data)
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
      },
      onError: (err) => {
        setErrorMessage("Error while ordering table: " + JSON.stringify(err));
      },
    }
  );
}
