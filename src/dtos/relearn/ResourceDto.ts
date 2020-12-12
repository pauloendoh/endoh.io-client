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
    estimatedTime: '',
    dueDate: '',
    rating: 0,
    completedAt: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tag: null
})
