import { queryKeys } from "hooks/react-query/queryKeys";
import { useQuery } from "react-query";
import NewProgressDto from "types/domain/skillbase/NewProgressDto";
import { urls } from "utils/urls";
import myAxios from "../../../../utils/consts/myAxios";

export default function useProgressesQuery(fromYearMonth: string) {
  return useQuery(queryKeys.progresses, () =>
    myAxios
      .get<NewProgressDto[]>(urls.api.skillbase.progressFrom(fromYearMonth))
      .then((res) => res.data)
  );
}
