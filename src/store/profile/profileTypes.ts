import { ProfileDto } from "../../dtos/ProfileDto"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import { TagDto } from "../../interfaces/dtos/relearn/TagDto"
import { FollowingUserDto } from "../../dtos/feed/FollowingUserDto"
import { FollowerDto } from "../../dtos/feed/FollowerDto"

export enum ProfileActionTypes {
  CLEAR_PROFILE = "@profile/CLEAR_PROFILE",

  SET_PROFILE = "@profile/SET_PROFILE",
  SET_PROFILE_RESOURCES = "@profile/SET_PROFILE_RESOURCES",
  SET_USER_INFO = "@profile/SET_USER_INFO",
  SET_PROFILE_PICTURE = "@profile/SET_PROFILE_PICTURE",
}

export interface ProfileState {
  profile: ProfileDto
  resources: ResourceDto[]

  publicTags: TagDto[]
  privateTags: TagDto[]

  followingUsers: FollowingUserDto[]
  followers: FollowerDto[]
}
