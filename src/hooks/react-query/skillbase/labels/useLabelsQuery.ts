import { queryKeys } from "hooks/react-query/queryKeys";
import { useQuery } from "react-query";
import { LabelDto } from "types/domain/skillbase/LabelDto";
import { urls } from "utils/urls";
import myAxios from "../../../../utils/consts/myAxios";

export default function useLabelsQuery() {
  return useQuery(queryKeys.labels, () =>
    myAxios.get<LabelDto[]>(urls.api.skillbase.label).then((res) => res.data)
  );
}
