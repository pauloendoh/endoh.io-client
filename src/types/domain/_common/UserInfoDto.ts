import { FollowerDto } from "../feed/FollowerDto";
import { FollowingUserDto } from "../feed/FollowingUserDto";
import { ResourceDto } from "../relearn/ResourceDto";
import { TagDto } from "../relearn/TagDto";
import { ProfileDto } from "./ProfileDto";

export interface UserInfoDto {
  profile: ProfileDto;
  resources: ResourceDto[];

  publicLists: TagDto[];
  privateLists: TagDto[];

  followingUsers: FollowingUserDto[];
  followers: FollowerDto[];
}

export const newUserInfo: UserInfoDto = {
  profile: null,
  resources: [],

  publicLists: [],
  privateLists: [],

  followingUsers: [],
  followers: [],
};
