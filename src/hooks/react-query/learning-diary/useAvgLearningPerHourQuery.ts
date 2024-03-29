import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"

export default function useAvgLearningPerHourQuery(topPercentage = 50) {
  const axios = useAxios()

  const hourOffset = (new Date().getTimezoneOffset() / 60) * -1

  return useQuery([queryKeys.similarExpenses], () =>
    axios
      .get<
        {
          hour: number
          avgCount: number
          topPercentDaysLearningCount: number
        }[]
      >(urls.api.avgLearningPerHour(hourOffset, topPercentage))
      .then((res) => res.data)
  )
}
