import { UserInfoDto } from "types/domain/_common/UserInfoDto"

export interface FollowDto {
  id: number
  followerId: number
  follower?: UserInfoDto

  followedUserId: number
  followedUser?: UserInfoDto

  createdAt: string
  updatedAt: string
}
