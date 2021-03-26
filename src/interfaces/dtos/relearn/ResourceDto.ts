import { TagDto } from './TagDto';


export interface ResourceDto {
    id: number
    userId: number
    title: string;
    url: string;
    thumbnail: string;
    estimatedTime: string;
    dueDate: string;
    rating: number
    completedAt: string,
    position: number,
    publicReview: string,
    privateNote: string,

    fromResourceId: number,

    createdAt: string
    updatedAt: string
    tag: TagDto
}

export const newResourceDto = (): ResourceDto => ({
    id: null,
    userId: null,
    title: '',
    url: '',
    thumbnail: '',
    estimatedTime: '00:00h',
    dueDate: '',
    rating: null,
    completedAt: '',
    position: null,
    publicReview: '',
    privateNote: '',

    fromResourceId: null,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tag: null
})
