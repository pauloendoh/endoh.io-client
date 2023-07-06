import { useMutation } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { LabelDto } from "types/domain/skillbase/LabelDto"
import { pushOrReplace } from "utils/array/pushOrReplace"
import { urls } from "utils/urls"
import useSnackbarStore from "../../../../store/zustand/useSnackbarStore"
import myAxios from "../../../../utils/consts/myAxios"
import { myQueryClient } from "../../../../utils/consts/myQueryClient"

export default function useSaveLabelMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (params: { payload: LabelDto; skillId: number }) =>
      myAxios
        .post<LabelDto>(urls.api.skillbase.label, params.payload)
        .then((res) => res.data),
    {
      onSuccess: (returned, params) => {
        const labels = myQueryClient.getQueryData<LabelDto[]>([
          queryKeys.labels,
        ])
        const newLabels = pushOrReplace(labels, returned, "id")
        myQueryClient.setQueryData([queryKeys.labels], newLabels)

        setSuccessMessage("Label saved!")

        myQueryClient.invalidateQueries([queryKeys.skillId(params.skillId)])
      },
      onError: (err) => {
        setErrorMessage("Error while saving label: " + JSON.stringify(err))
      },
    }
  )
}
