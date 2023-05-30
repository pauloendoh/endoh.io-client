import { useAxios } from "hooks/utils/useAxios"
import { useMutation, useQueryClient } from "react-query"
import { urls } from "utils/urls"
import { queryKeys } from "../../queryKeys"

export default function useUpdateLastSeenResourceMutation() {
  const queryClient = useQueryClient()
  const axios = useAxios()

  return useMutation(
    (lastSeenAt: string) =>
      axios
        .put(urls.api.feed.lastSeenResource, {
          lastSeenAt,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(queryKeys.lastSeenResource, data)

        queryClient.invalidateQueries(queryKeys.newResourcesCount)
      },
    }
  )
}
