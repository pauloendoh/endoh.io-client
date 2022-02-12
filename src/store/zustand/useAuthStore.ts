import {
  AuthUserGetDto,
  UserPreferenceDto,
} from "types/domain/auth/AuthUserGetDto";
import { FollowerDto } from "types/domain/feed/FollowerDto";
import { FollowingTagDto } from "types/domain/feed/FollowingTagDto";
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto";
import { NotificationDto } from "types/domain/utils/NotificationDto";
import { ProfileDto } from "types/domain/_common/ProfileDto";
import { UserInfoDto } from "types/domain/_common/UserInfoDto";
import create, { GetState } from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

interface IAuthStore {
  authUser: AuthUserGetDto;
  followingTags: FollowingTagDto[];
  preference: UserPreferenceDto;
  profile: ProfileDto;
  followingUsers: FollowingUserDto[];
  followers: FollowerDto[];
  notifications: NotificationDto[];

  setAuthUser: (authUser: AuthUserGetDto) => void;
  setPreference: (preference: UserPreferenceDto) => void;
  setUsername: (newUsername: string) => void;
  setFollowingTags: (followingTags: FollowingTagDto[]) => void;
  setNotifications: (notifications: NotificationDto[]) => void;
  setAuthProfile: (userInfo: UserInfoDto) => void;
  setProfilePicture: (pictureUrl: string) => void;
}

const useAuthStore = create<IAuthStore>(
  devtools((set: NamedSet<IAuthStore>, get: GetState<IAuthStore>) => ({
    authUser: null,
    followingTags: [],
    preference: null,

    profile: null,
    followers: [],
    followingUsers: [],
    notifications: [],

    setAuthUser: (authUser) => {
      const expiresAt = new Date(authUser.expiresAt);

      localStorage.setItem("user", JSON.stringify(authUser));

      // Refresh logout timeout
      setTimeout(() => {
        return resetAuthStore();
      }, expiresAt.getTime() - new Date().getTime());

      set({ authUser });
    },
    setPreference: (preference) => {
      set({ preference });
    },
    setUsername: (newUsername) => {
      const { authUser } = get();
      authUser.username = newUsername;

      // Updating username at local storage
      const userStored: AuthUserGetDto = JSON.parse(
        localStorage.getItem("user")
      );
      userStored.username = newUsername;
      localStorage.setItem("user", JSON.stringify(userStored));
      set({ authUser });
    },
    setFollowingTags: (followingTags) => {
      set({ followingTags });
    },
    setNotifications: (notifications) => {
      set({ notifications });
    },
    setAuthProfile: (userInfo) => {
      const { profile, followers, followingUsers } = userInfo;
      set({ profile, followers, followingUsers });
    },
    setProfilePicture: (pictureUrl) => {
      const { profile } = get();
      profile.pictureUrl = pictureUrl;
      set({ profile });
    },
  }))
);

const initialState = useAuthStore.getState();
export const resetAuthStore = () => {
  localStorage.removeItem("user");
  useAuthStore.setState(initialState, true);
};

export default useAuthStore;
