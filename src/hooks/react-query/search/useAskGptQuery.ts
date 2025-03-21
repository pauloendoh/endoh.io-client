import { useQuery } from "@tanstack/react-query"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"

export const useAskGptQuery = (
  question: string,
  options?: {
    disable?: boolean
  }
) => {
  const myAxios = useAxios()
  return useQuery(
    [urls.api.define.askGpt(question)],
    async () => {
      return myAxios
        .get<{ answer: string }>(urls.api.define.askGpt(question))
        .then((res) => res.data)
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
