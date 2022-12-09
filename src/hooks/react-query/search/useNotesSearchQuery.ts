import { FlashnotesSearchType } from "components/_common/_layout/Navbar/SearchBarWrapper/NotesSearchBar/types/FlashnotesSearchType"
import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { NotesSearchResultsDto } from "types/domain/utils/NotesSearchResultsDto"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

type Params = { query: string; minLength: number; type: FlashnotesSearchType }

const useNotesSearchQuery = ({ query, minLength = 1, type }: Params) => {
  const myAxios = useAxios()
  return useQuery(
    queryKeys.notesSearchResults,
    async () => {
      if (query.length < minLength) {
        return new Promise<NotesSearchResultsDto>((resolve) => {
          resolve(null)
        })
      }

      console.log("research")
      return myAxios
        .get<NotesSearchResultsDto>(urls.api.notesSearch(query, type))
        .then((res) => res.data)
    },

    {}
  )
}

export default useNotesSearchQuery
