import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { UserInfoDto } from "types/domain/_common/UserInfoDto"
import { urls } from "../../../utils/urls"

export const useMostFollowedUsersQuery = () => {
  return useQuery<UserInfoDto[], AxiosError>([urls.api.mostFollowedUsers])
}
