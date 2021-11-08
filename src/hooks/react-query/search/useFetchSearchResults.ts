import { useQuery } from "react-query";
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto";
import myAxios from "utils/consts/myAxios";
import { urls } from "utils/urls";
import { queryKeys } from "../queryKeys";

const useFetchSearchResults = (query: string) => {
  return useQuery(
    queryKeys.searchResults,
    () => {
      if (query.length === 0) {
        return new Promise<SearchResultsDto>((resolve) => {
          resolve(null);
        });
      }
      return myAxios
        .get<SearchResultsDto>(urls.api.search(query))
        .then((res) => res.data);
    },

    {}
  );
};

export default useFetchSearchResults;
