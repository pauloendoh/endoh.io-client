import { AxiosError } from "axios"
import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "@tanstack/react-query"
import { urls } from "../../../utils/urls"
import { FollowDto } from "./types/FollowDto"

export const useFollowingUsersQuery = (userId: number) => {
  const axios = useAxios()
  return useQuery<FollowDto[], AxiosError>(
    [urls.api.userFollowingUsers(userId)],
    () =>
      axios.get(urls.api.userFollowingUsers(userId)).then((res) => res.data),
    {
      enabled: !!userId,
    }
  )
}
