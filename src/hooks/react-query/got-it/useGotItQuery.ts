import { useQuery } from "@tanstack/react-query"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"
import { GotItDto } from "./types/GotItDto"

const useGotItQuery = () => {
  const axios = useAxios()
  return useQuery([queryKeys.gotIt], () =>
    axios.get<GotItDto>(urls.api.userGotIt).then((res) => res.data)
  )
}

export default useGotItQuery
