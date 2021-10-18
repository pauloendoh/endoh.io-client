import { SearchResultsDto } from "../../types/domain/utils/SearchResultsDto";

export const filterResourcesFromResults = (results: SearchResultsDto) => {
  if (results) {
    return results.resources;
  }
  return [];
};
