import { TagDto } from '../../interfaces/dtos/relearn/TagDto'

export interface FollowerDto {
    follower: {
        userId: number,
        username: string,
        fullName: string,
        pictureUrl: string,
    },
    tags: TagDto[]
}

