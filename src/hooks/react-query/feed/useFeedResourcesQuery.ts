import { useQuery } from "react-query"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { urls } from "utils/urls"
import myAxios from "../../../utils/consts/myAxios"
import { queryKeys } from "../queryKeys"

export default function useFeedResourcesQuery() {
  return useQuery(queryKeys.feedResources, () =>
    myAxios
      .get<FeedResourceDto[]>(urls.api.feed.resources)
      .then((res) => res.data)
  )
}
