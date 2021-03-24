import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { ProfileDto } from '../../dtos/ProfileDto';
import { UserInfoDto } from '../../dtos/UserInfoDto';
import { ResourceDto } from '../../interfaces/dtos/relearn/ResourceDto';
import { ProfileActionTypes } from './profileTypes';
import { setProfilePicture as authSetProfilePicture } from '../auth/authActions';

export const clearProfile = () => action(ProfileActionTypes.CLEAR_PROFILE)

export const setProfile = (profile: ProfileDto) => action(ProfileActionTypes.SET_PROFILE, profile)

export const setProfileResources = (resources: ResourceDto[]) => action(ProfileActionTypes.SET_PROFILE_RESOURCES, resources)

export const setUserInfo = (userInfo: UserInfoDto) => action(ProfileActionTypes.SET_USER_INFO, userInfo)

export const setProfilePicture = (pictureUrl: string) => action(ProfileActionTypes.SET_PROFILE_PICTURE, pictureUrl)

export const editProfilePicture = (dispatch: Dispatch, pictureUrl: string) => {
  dispatch(setProfilePicture(pictureUrl))
  dispatch(authSetProfilePicture(pictureUrl))
}

export type ProfileActionReturns =
  ReturnType<typeof clearProfile> |
  ReturnType<typeof setProfile> |
  ReturnType<typeof setProfileResources> |
  ReturnType<typeof setUserInfo> |
  ReturnType<typeof setProfilePicture>