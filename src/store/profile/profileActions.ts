import { action } from 'typesafe-actions';
import { ResourceDto } from '../../interfaces/dtos/relearn/ResourceDto';
import { ProfileActionTypes } from './profileTypes';

export const clearProfile = () => action(ProfileActionTypes.CLEAR_PROFILE)

export const setProfileResources = (resources: ResourceDto[]) => action(ProfileActionTypes.SET_PROFILE_RESOURCES, resources)



export type ProfileActionReturns =
  ReturnType<typeof clearProfile> |
  ReturnType<typeof setProfileResources> 