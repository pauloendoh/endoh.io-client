import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useAxios } from "hooks/utils/useAxios"
import useAuthStore from "store/zustand/useAuthStore"
import { urls } from "utils/urls"
import { FollowDto } from "./types/FollowDto"

//  PE 1/3 - remove this and use useFollowingUsersQuery
export const useMyFollowingUsersQuery = () => {
  const { authUser } = useAuthStore()
  const axios = useAxios()
  return useQuery<FollowDto[], AxiosError>(
    [urls.api.myFollowingUsers],
    () => axios.get(urls.api.myFollowingUsers).then((res) => res.data),
    {
      enabled: !!authUser,
    }
  )
}
