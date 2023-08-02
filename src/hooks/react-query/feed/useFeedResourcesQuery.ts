import { useQuery } from "@tanstack/react-query"
import { useAxios } from "hooks/utils/useAxios"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

export default function useFeedResourcesQuery(
  type: "completed" | "bookmarked"
) {
  const axios = useAxios()
  return useQuery([queryKeys.feedResources], () =>
    axios
      .get<FeedResourceDto[]>(urls.api.feed.resources(type))
      .then((res) => res.data)
  )
}
