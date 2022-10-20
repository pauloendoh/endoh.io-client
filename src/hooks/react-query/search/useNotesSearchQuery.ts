import { useQuery } from "react-query"
import { NotesSearchResultsDto } from "types/domain/utils/NotesSearchResultsDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

const useNotesSearchQuery = (query: string, minLength = 1) => {
  return useQuery(
    queryKeys.notesSearchResults,
    async () => {
      if (query.length < minLength) {
        return new Promise<NotesSearchResultsDto>((resolve) => {
          console.log("resolving null")
          resolve(null)
        })
      }

      console.log("research")
      return myAxios
        .get<NotesSearchResultsDto>(urls.api.notesSearch(query))
        .then((res) => res.data)
    },

    {}
  )
}

export default useNotesSearchQuery
