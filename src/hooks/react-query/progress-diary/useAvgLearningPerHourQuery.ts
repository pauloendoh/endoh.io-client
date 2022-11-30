import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { urls } from "utils/urls"

export default function useAvgLearningPerHourQuery() {
  const axios = useAxios()

  const hourOffset = (new Date().getTimezoneOffset() / 60) * -1

  return useQuery(queryKeys.similarExpenses, () =>
    axios
      .get<
        {
          hour: number
          count: number
          top25PercentDaysLearningCount: number
          top50PercentDaysLearningCount: number
        }[]
      >(urls.api.avgLearningPerHour(hourOffset))
      .then((res) => res.data)
  )
}
