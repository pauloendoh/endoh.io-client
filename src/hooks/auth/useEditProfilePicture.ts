import { Dispatch } from "redux";
import useProfileStore from "store/zustand/domain/useProfileStore";
import useAuthStore from "store/zustand/useAuthStore";

export const useEditProfilePicture = (dispatch: Dispatch) => {
  const profileStore = useProfileStore();
  const { setProfilePicture: setAuthProfilePicture } = useAuthStore();

  const editProfilePicture = (pictureUrl: string) => {
    profileStore.setProfilePicture(pictureUrl);
    setAuthProfilePicture(pictureUrl);
  };
  return editProfilePicture;
};
