import { useQuery } from "@tanstack/react-query"
import myAxios from "../../../../utils/consts/myAxios"
import { urls } from "../../../../utils/urls"
import { queryKeys } from "../../queryKeys"

export default function useSkillProgressMonthsQuery() {
  return useQuery([queryKeys.progressMonths], () =>
    myAxios
      .get<string[]>(urls.api.skillbase.progressMonths)
      .then((res) => res.data)
  )
}
