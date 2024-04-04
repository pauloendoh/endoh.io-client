import { useQuery } from "@tanstack/react-query"
import { FlashnotesSearchType } from "components/_common/_layout/Navbar/SearchBarWrapper/NotesSearchBar/types/FlashnotesSearchType"
import { useAxios } from "hooks/utils/useAxios"
import { QuestionsSearchResultDto } from "types/domain/utils/QuestionsSearchResultDto"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

type Params = { query: string; minLength: number; type: FlashnotesSearchType }

const useQuestionsSearchQuery = ({ query, minLength = 1, type }: Params) => {
  const myAxios = useAxios()
  return useQuery(
    [queryKeys.questionsSearchResults],
    async () => {
      if (query.length < minLength) {
        return new Promise<QuestionsSearchResultDto | null>((resolve) => {
          resolve(null)
        })
      }

      console.log("research")
      return myAxios
        .get<QuestionsSearchResultDto>(urls.api.questionsSearch(query, type))
        .then((res) => res.data)
    },

    {}
  )
}

export default useQuestionsSearchQuery
