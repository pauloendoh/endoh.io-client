import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { urls } from "utils/urls"

export default function useAvgLearningPerHourQuery() {
  const axios = useAxios()
  return useQuery(queryKeys.similarExpenses, () =>
    axios
      .get<
        { hour: number; count: number; top25PercentDaysLearningCount: number }[]
      >(urls.api.avgLearningPerHour)
      .then((res) => res.data)
  )
}
