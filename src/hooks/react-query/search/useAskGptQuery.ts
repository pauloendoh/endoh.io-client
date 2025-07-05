import { useQuery } from "@tanstack/react-query"
import { api } from "orval/api"
import { urls } from "utils/urls"

export const useAskGptQuery = (
  question: string,
  options?: {
    disable?: boolean
  }
) => {
  return useQuery(
    [urls.api.define.askGpt(question)],
    async () => {
      return api.question.askGpt({ question: question }).then((res) => res.data)
    },
    {
      enabled: !options?.disable && !!question,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: false,
    }
  )
}
