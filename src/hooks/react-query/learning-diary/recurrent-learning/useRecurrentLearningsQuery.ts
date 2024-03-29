import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"
import { RecurrentLearningDto } from "./types/RecurrentLearningDto"

export function useRecurrentLearningsQuery() {
  const axios = useAxios()
  return useQuery([queryKeys.recurrentLearnings], () =>
    axios
      .get<RecurrentLearningDto[]>(urls.api.recurrentLearnings)
      .then((res) => res.data)
  )
}
