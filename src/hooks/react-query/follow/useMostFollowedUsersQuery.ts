import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { UserInfoDto } from "types/domain/_common/UserInfoDto"
import { urls } from "../../../utils/urls"

export const useMostFollowedUsersQuery = () => {
  return useQuery<UserInfoDto[], AxiosError>([urls.api.mostFollowedUsers])
}
