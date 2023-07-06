import { useMutation } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { LabelDto } from "types/domain/skillbase/LabelDto"
import SkillLabelDto from "types/domain/skillbase/SkillLabelDto"
import { urls } from "utils/urls"
import useSnackbarStore from "../../../../store/zustand/useSnackbarStore"
import myAxios from "../../../../utils/consts/myAxios"
import { myQueryClient } from "../../../../utils/consts/myQueryClient"

export default function useDeleteLabelMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  return useMutation(
    (payload: SkillLabelDto) =>
      myAxios
        .delete(urls.api.skillbase.labelId(payload.labelId))
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        const labels = myQueryClient.getQueryData<LabelDto[]>([
          queryKeys.labels,
        ])
        const newLabels = [...labels].filter(
          (label) => label.id !== payload.labelId
        )
        myQueryClient.setQueryData([queryKeys.labels], newLabels)

        setSuccessMessage("Label deleted!")
      },
      onError: (err) => {
        setErrorMessage("Error while deleting label: " + JSON.stringify(err))
      },
    }
  )
}
