import { FollowerDto } from "../feed/FollowerDto"
import { FollowingUserDto } from "../feed/FollowingUserDto"
import { ResourceDto } from "../relearn/ResourceDto"
import { TagDto } from "../relearn/TagDto"
import { SkillDto } from "../skillbase/SkillDto"
import { ProfileDto } from "./ProfileDto"

// PE 2/3 - maybe change to UserProfileInfo ?
export interface UserInfoDto {
  username: string
  profile: ProfileDto
  resources: ResourceDto[]

  // PE 2/3 - change to tags? I don't know if I can, since it comes like this
  publicLists: TagDto[]
  privateLists: TagDto[]

  // PE 2/3 - what's the difference between these two DTOs???
  followingUsers: FollowingUserDto[]
  followers: FollowerDto[]

  publicSkills: SkillDto[]
}
