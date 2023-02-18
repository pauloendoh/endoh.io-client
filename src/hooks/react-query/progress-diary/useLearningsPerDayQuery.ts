import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

export default function useLearningsPerDayQuery() {
  const axios = useAxios()
  const hourOffset = (new Date().getTimezoneOffset() / 60) * -1

  return useQuery(queryKeys.learningsPerDay, () =>
    axios
      .get<{ date: string; learningCount: number }[]>(
        urls.api.learningDiary.learningsPerDay(hourOffset)
      )
      .then((res) => res.data)
  )
}
