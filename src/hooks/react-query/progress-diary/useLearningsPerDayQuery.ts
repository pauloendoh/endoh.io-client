import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { urls } from "utils/urls"

export default function useLearningsPerDayQuery() {
  const axios = useAxios()
  return useQuery(urls.api.learningDiary.learningsPerDay, () =>
    axios
      .get<{ date: string; learningCount: number }[]>(
        urls.api.learningDiary.learningsPerDay
      )
      .then((res) => res.data)
  )
}
