import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "orval/api"
import { queryKeys } from "../queryKeys"
import { GotItDto } from "./types/GotItDto"

export default function useGotItMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    async (gotItKey: keyof GotItDto) => {
      const currentGotIt = queryClient.getQueryData<GotItDto>([queryKeys.gotIt])
      if (!currentGotIt) {
        throw new Error("This should not happen")
      }

      if (typeof currentGotIt[gotItKey] === "boolean") {
        // @ts-expect-error
        currentGotIt[gotItKey] = true
        const data = await api.gotIt
          .updateUserGotIt(currentGotIt)
          .then((res) => res.data)
        return data
      }
    },
    {
      onSuccess: (savedDto) => {
        queryClient.setQueryData([queryKeys.gotIt], savedDto)
      },
    }
  )
}
