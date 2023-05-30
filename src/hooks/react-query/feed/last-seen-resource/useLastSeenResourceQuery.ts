import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { urls } from "utils/urls"
import { queryKeys } from "../../queryKeys"
import { LastSeenResourceDto } from "./types/LastSeenResourceDto"

export default function useLastSeenResourceQuery() {
  const axios = useAxios()
  return useQuery<LastSeenResourceDto>(queryKeys.lastSeenResource, () =>
    axios
      .get<LastSeenResourceDto>(urls.api.feed.lastSeenResource)
      .then((res) => res.data)
  )
}
