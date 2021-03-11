import { ResourceDto } from '../interfaces/dtos/relearn/ResourceDto'
import { TagDto } from '../interfaces/dtos/relearn/TagDto'
import { FollowerDto } from './feed/FollowerDto'
import { FollowingUserDto } from './feed/FollowingUserDto'
import { ProfileDto } from './ProfileDto'

export interface UserInfoDto {
    profile: ProfileDto,
    resources: ResourceDto[],

    publicLists: TagDto[],
    privateLists: TagDto[],

    followingUsers: FollowingUserDto[],
    followers: FollowerDto[]
}

export const newUserInfo: UserInfoDto = {
    profile: null,
    resources: [],

    publicLists: [],
    privateLists: [],

    followingUsers: [],
    followers: [],
}