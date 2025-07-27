import { useQuery } from "@tanstack/react-query"
import { api } from "orval/api"
import { queryKeys } from "../queryKeys"

const useGotItQuery = () => {
  return useQuery([queryKeys.gotIt], () =>
    api.gotIt.getUserGotIt().then((res) => res.data)
  )
}

export default useGotItQuery
