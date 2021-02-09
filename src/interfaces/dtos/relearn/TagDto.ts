import { ResourceDto } from './ResourceDto';


export interface TagDto {
    id: number;
    userId: number
    name: string;
    position: number;
    color: string;
    isPrivate: boolean; 
    createdAt: string
    updatedAt: string
    resources: ResourceDto[]
}

export const newTagDto = (): TagDto => ({
    id: null,
    userId: null,
    name: '',
    position: null,
    color: '#ffffff',
    isPrivate: false, 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resources: []
})

