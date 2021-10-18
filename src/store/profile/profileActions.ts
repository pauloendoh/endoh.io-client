import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { ResourceDto } from "../../types/domain/relearn/ResourceDto";
import { ProfileDto } from "../../types/domain/_common/ProfileDto";
import { UserInfoDto } from "../../types/domain/_common/UserInfoDto";
import { setProfilePicture as authSetProfilePicture } from "../auth/authActions";
import { ProfileActionTypes } from "./profileTypes";

export const clearProfile = () => action(ProfileActionTypes.CLEAR_PROFILE);

export const setProfile = (profile: ProfileDto) =>
  action(ProfileActionTypes.SET_PROFILE, profile);

export const setProfileResources = (resources: ResourceDto[]) =>
  action(ProfileActionTypes.SET_PROFILE_RESOURCES, resources);

export const setUserInfo = (userInfo: UserInfoDto) =>
  action(ProfileActionTypes.SET_USER_INFO, userInfo);

export const setProfilePicture = (pictureUrl: string) =>
  action(ProfileActionTypes.SET_PROFILE_PICTURE, pictureUrl);

export const editProfilePicture = (dispatch: Dispatch, pictureUrl: string) => {
  dispatch(setProfilePicture(pictureUrl));
  dispatch(authSetProfilePicture(pictureUrl));
};

export type ProfileActionReturns =
  | ReturnType<typeof clearProfile>
  | ReturnType<typeof setProfile>
  | ReturnType<typeof setProfileResources>
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof setProfilePicture>;
