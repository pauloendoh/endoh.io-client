import { useQuery } from "@tanstack/react-query"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../../queryKeys"

export default function useNewResourcesCountQuery() {
  const axios = useAxios()
  return useQuery<number>([queryKeys.newResourcesCount], () =>
    axios.get<number>(urls.api.feed.newResourcesCount).then((res) => res.data)
  )
}
