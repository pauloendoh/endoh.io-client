import { TagDto } from './TagDto';


export interface ResourceDto {
    id: number
    userId: number
    title: string;
    url: string;

    thumbnail: string;

    estimatedTime: string;

    dueDate: string;

    createdAt: string

    updatedAt: string

    tags: TagDto[]
}

export const newResourceDto = (): ResourceDto => ({
    id: null,
    userId: null,
    title: '',
    url: '',
    thumbnail: '',
    estimatedTime: '',
    dueDate: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
})
