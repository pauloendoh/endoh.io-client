import { FollowerDto } from "types/domain/feed/FollowerDto";
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto";
import { ResourceDto } from "types/domain/relearn/ResourceDto";
import { TagDto } from "types/domain/relearn/TagDto";
import { ProfileDto } from "types/domain/_common/ProfileDto";
import { UserInfoDto } from "types/domain/_common/UserInfoDto";
import create, { GetState } from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

interface IProfileStore {
  profile: ProfileDto;
  resources: ResourceDto[];

  publicTags: TagDto[];
  privateTags: TagDto[];

  followingUsers: FollowingUserDto[];
  followers: FollowerDto[];

  setProfile: (profile: ProfileDto) => void;

  setUserInfo: (userInfo: UserInfoDto) => void;
  setProfilePicture: (pictureUrl: string) => void;
}

const useProfileStore = create<IProfileStore>(
  devtools((set: NamedSet<IProfileStore>, get: GetState<IProfileStore>) => ({
    profile: null,
    resources: [],

    publicTags: [],
    privateTags: [],

    followingUsers: [],
    followers: [],

    setProfile: (profile) => {
      set({ profile }, undefined, "setProfile");
    },

    setUserInfo: (userInfo) => {
      set(
        {
          profile: userInfo.profile,
          resources: userInfo.resources,
          publicTags: userInfo.publicLists,
          privateTags: userInfo.privateLists,
          followingUsers: userInfo.followingUsers,
          followers: userInfo.followers,
        },
        undefined,
        "setUserInfo"
      );
    },

    setProfilePicture: (pictureUrl) => {
      const { profile } = get();
      profile.pictureUrl = pictureUrl;
      set({ profile }, undefined, "setProfilePicture");
    },
  }))
);

const initialState = useProfileStore.getState();
export const resetProfileStore = () => {
  useProfileStore.setState(initialState, true);
};

export default useProfileStore;
