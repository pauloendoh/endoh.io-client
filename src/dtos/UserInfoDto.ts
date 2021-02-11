import { ResourceDto } from '../interfaces/dtos/relearn/ResourceDto'
import { TagDto } from '../interfaces/dtos/relearn/TagDto'
import { ProfileDto } from './ProfileDto'

export interface UserInfoDto {
    profile: ProfileDto,
    resources: ResourceDto[],

    publicLists: TagDto[],
    privateLists: TagDto[],
}

export const newUserInfo: UserInfoDto = {
    profile: null,
    resources: [],

    publicLists: [],
    privateLists: [],
}