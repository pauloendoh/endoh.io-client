import { useQuery } from "react-query";
import { UserSuggestionDto } from "types/domain/feed/UserSuggestionDto";
import apiUrls from "../../../utils/consts/apiUrls";
import myAxios from "../../../utils/consts/myAxios";
import { queryKeys } from "../queryKeys";

export default function useUserSuggestionsQuery() {
  return useQuery(queryKeys.userSuggestions, () =>
    myAxios
      .get<UserSuggestionDto[]>(apiUrls.feed.myUserSuggestions)
      .then((res) => res.data)
  );
}