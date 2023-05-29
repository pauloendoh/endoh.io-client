import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

export default function useFeedResourcesQuery() {
  const axios = useAxios()
  return useQuery(queryKeys.feedResources, () =>
    axios
      .get<FeedResourceDto[]>(urls.api.feed.resources)
      .then((res) => res.data)
  )
}
