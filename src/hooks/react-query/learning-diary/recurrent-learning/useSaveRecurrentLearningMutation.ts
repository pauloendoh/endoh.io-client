import { useMutation } from "@tanstack/react-query"
import { upsert } from "endoh-utils"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"
import useSnackbarStore from "../../../../store/zustand/useSnackbarStore"
import { myQueryClient } from "../../../../utils/consts/myQueryClient"
import { RecurrentLearningDto } from "./types/RecurrentLearningDto"

export function useSaveRecurrentLearningMutation() {
  const { setSuccessMessage } = useSnackbarStore()

  const axios = useAxios()
  return useMutation(
    (payload: RecurrentLearningDto) =>
      axios
        .post<RecurrentLearningDto>(urls.api.recurrentLearnings, payload)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        myQueryClient.setQueryData<RecurrentLearningDto[]>(
          [queryKeys.recurrentLearnings],
          (curr) => upsert(curr, saved, (item) => item.id === saved.id)
        )

        setSuccessMessage("Saved!")
      },
    }
  )
}
