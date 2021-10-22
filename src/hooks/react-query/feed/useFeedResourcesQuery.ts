import { useQuery } from "react-query";
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import { queryKeys } from "../queryKeys";

export default function useFeedResourcesQuery() {
  return useQuery(queryKeys.feedResources, () =>
    myAxios.get<FeedResourceDto[]>(API.feed.resources).then((res) => res.data)
  );
}
