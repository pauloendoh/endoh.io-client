import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"
import { GotItDto } from "./types/GotItDto"

export default function useGotItMutation() {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    (key: keyof GotItDto) => {
      const currentGotIt = queryClient.getQueryData<GotItDto>([queryKeys.gotIt])

      if (currentGotIt && typeof currentGotIt[key] === "boolean") {
        // @ts-expect-error
        currentGotIt[key] = true
      }
      return axios
        .put<GotItDto>(urls.api.userGotIt, currentGotIt)
        .then((res) => res.data)
    },
    {
      onSuccess: (savedDto) => {
        queryClient.setQueryData([queryKeys.gotIt], savedDto)
      },
    }
  )
}
