import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useAxios } from "hooks/utils/useAxios"
import { urls } from "../../../utils/urls"
import { FollowDto } from "./types/FollowDto"

export const useFollowersQuery = (userId?: number) => {
  const axios = useAxios()
  return useQuery<FollowDto[], AxiosError>(
    [urls.api.userFollowers(userId!)],
    () => axios.get(urls.api.userFollowers(userId!)).then((res) => res.data),
    {
      enabled: !!userId,
    }
  )
}
