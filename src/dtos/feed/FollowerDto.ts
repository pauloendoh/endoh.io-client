import { TagDto } from '../../interfaces/dtos/relearn/TagDto'

export interface FollowerDto {
    follower: {
        userId: number,
        username: string,
        fullName: string
    },
    tags: TagDto[]
}

