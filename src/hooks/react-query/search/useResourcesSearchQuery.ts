import { useQuery } from "@tanstack/react-query"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

const useResourcesSearchQuery = (query: string, minLength = 1) => {
  return useQuery(
    [queryKeys.resourceSearchResults],
    async () => {
      if (query.length < minLength) {
        return new Promise<SearchResultsDto>((resolve) => {
          resolve(null)
        })
      }
      return myAxios
        .get<SearchResultsDto>(urls.api.resourcesSearch(query))
        .then((res) => res.data)
    },

    {}
  )
}

export default useResourcesSearchQuery
