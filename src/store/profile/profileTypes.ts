import { ResourceDto } from '../../interfaces/dtos/relearn/ResourceDto';

export enum ProfileActionTypes {
    CLEAR_PROFILE = '@profile/CLEAR_PROFILE',

    SET_PROFILE_RESOURCES = '@profile/SET_PROFILE_RESOURCES',
}

export interface ProfileState {
    resources: ResourceDto[]
}

