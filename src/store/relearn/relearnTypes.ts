import { TagDto } from '../../dtos/relearn/TagDto';
import { ResourceDto } from '../../dtos/relearn/ResourceDto';

export enum relearnActionTypes {
    SET_RESOURCES = '@relearn/SET_RESOURCES',
    SET_TAGS = '@relearn/SET_TAGS',

    SET_EDITING_RESOURCE = '@relearn/SET_EDITING_RESOURCE',
    SET_EDITING_TAG = '@relearn/SET_EDITING_TAG',
    

}

export interface RelearnState {
    resources: ResourceDto[],
    tags: TagDto[], 

    editingResource: ResourceDto,
    editingTag: TagDto,
}

