import { useQuery } from "@tanstack/react-query"
import { UserSuggestionDto } from "types/domain/feed/UserSuggestionDto"
import { urls } from "utils/urls"
import myAxios from "../../../utils/consts/myAxios"
import { queryKeys } from "../queryKeys"

export default function useUserSuggestionsQuery() {
  return useQuery([queryKeys.userSuggestions], () =>
    myAxios
      .get<UserSuggestionDto[]>(urls.api.feed.myUserSuggestions)
      .then((res) => res.data)
  )
}
