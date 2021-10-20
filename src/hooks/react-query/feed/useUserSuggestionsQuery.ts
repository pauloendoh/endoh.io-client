import { useQuery } from "react-query";
import { UserSuggestionDto } from "types/domain/feed/UserSuggestionDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import { queryKeys } from "../queryKeys";

export default function useUserSuggestionsQuery() {
  return useQuery(queryKeys.userSuggestions, () =>
    myAxios
      .get<UserSuggestionDto[]>(API.feed.myUserSuggestions)
      .then((res) => res.data)
  );
}
