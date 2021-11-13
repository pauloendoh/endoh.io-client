import { Dispatch } from "redux";
import { setProfilePicture as authSetProfilePicture } from "store/auth/authActions";
import useProfileStore from "store/zustand/domain/useProfileStore";

export const useEditProfilePicture = (dispatch: Dispatch) => {
  const profileStore = useProfileStore();

  const editProfilePicture = (pictureUrl: string) => {
    profileStore.setProfilePicture(pictureUrl);
    dispatch(authSetProfilePicture(pictureUrl));
  };
  return editProfilePicture;
};
