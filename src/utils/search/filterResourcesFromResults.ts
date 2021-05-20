import { SearchResultsDto } from "../../dtos/utils/SearchResultsDto"

export const filterResourcesFromResults = (results: SearchResultsDto) => {
  if (results) {
    return results.resources
  }
  return []
}
