import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { LabelDto } from "types/domain/skillbase/LabelDto"
import { urls } from "utils/urls"

export default function useLabelsQuery() {
  const axios = useAxios()

  return useQuery([queryKeys.labels], () =>
    axios.get<LabelDto[]>(urls.api.skillbase.label).then((res) => res.data)
  )
}
