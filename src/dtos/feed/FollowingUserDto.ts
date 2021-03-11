import { TagDto } from '../../interfaces/dtos/relearn/TagDto'

export interface FollowingUserDto {
    followingUser: {
        userId: number,
        username: string,
        fullName: string
    },
    tags: TagDto[]
}

