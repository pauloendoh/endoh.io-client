import { queryKeys } from "hooks/react-query/queryKeys";
import { useMutation } from "react-query";
import { LabelDto } from "types/domain/skillbase/LabelDto";
import { pushOrReplace } from "utils/pushOrReplace";
import { urls } from "utils/urls";
import useSnackbarStore from "../../../../store/zustand/useSnackbarStore";
import myAxios from "../../../../utils/consts/myAxios";
import { myQueryClient } from "../../../../utils/consts/myQueryClient";

export default function useSaveLabelMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  return useMutation(
    (data: LabelDto) =>
      myAxios
        .post<LabelDto>(urls.api.skillbase.label, data)
        .then((res) => res.data),
    {
      onSuccess: (returned) => {
        const labels = myQueryClient.getQueryData<LabelDto[]>(queryKeys.labels);

        const newLabels = pushOrReplace(labels, returned, "id");

        myQueryClient.setQueryData(queryKeys.labels, newLabels);

        setSuccessMessage("Label saved!");
      },
      onError: (err) => {
        setErrorMessage("Error while saving label: " + JSON.stringify(err));
      },
    }
  );
}
