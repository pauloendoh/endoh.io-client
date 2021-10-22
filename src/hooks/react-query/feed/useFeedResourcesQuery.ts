import { useQuery } from "react-query";
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto";
import apiUrls from "../../../utils/consts/apiUrls";
import myAxios from "../../../utils/consts/myAxios";
import { queryKeys } from "../queryKeys";

export default function useFeedResourcesQuery() {
  return useQuery(queryKeys.feedResources, () =>
    myAxios
      .get<FeedResourceDto[]>(apiUrls.feed.resources)
      .then((res) => res.data)
  );
}
