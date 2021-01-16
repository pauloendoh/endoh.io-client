import { ResourceDto } from './ResourceDto';


export interface TagDto {
    id: number;
    userId: number
    name: string;
    position: number;
    color: string;
    createdAt: string
    updatedAt: string
    resources: ResourceDto[]
}

export const newTagDto = (): TagDto => ({
    id: null,
    userId: null,
    name: '',
    position: null,
    color: '#424242',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resources: []
})

