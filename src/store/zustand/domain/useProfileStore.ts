import { ProfileDto } from "types/domain/_common/ProfileDto"
import { UserInfoDto } from "types/domain/_common/UserInfoDto"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { FollowerDto } from "types/domain/feed/FollowerDto"
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto"
import { TagDto } from "types/domain/relearn/TagDto"
import { SkillDto } from "types/domain/skillbase/SkillDto"
import create, { GetState } from "zustand"
import { devtools, NamedSet } from "zustand/middleware"

interface IProfileStore {
  profile: ProfileDto
  resources: FeedResourceDto[]

  publicTags: TagDto[]
  privateTags: TagDto[]

  followingUsers: FollowingUserDto[]
  followers: FollowerDto[]

  setProfile: (profile: ProfileDto) => void

  publicSkills: SkillDto[]

  setUserInfo: (userInfo: UserInfoDto) => void
  setProfilePicture: (pictureUrl: string) => void
}

const useProfileStore = create<IProfileStore>(
  devtools((set: NamedSet<IProfileStore>, get: GetState<IProfileStore>) => ({
    profile: null,
    resources: [],

    publicTags: [],
    privateTags: [],

    followingUsers: [],
    followers: [],

    publicSkills: [],

    setProfile: (profile) => {
      set({ profile }, undefined, "setProfile")
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
          publicSkills: userInfo.publicSkills,
        },
        undefined,
        "setUserInfo"
      )
    },

    setProfilePicture: (pictureUrl) => {
      const { profile } = get()
      profile.pictureUrl = pictureUrl
      set({ profile }, undefined, "setProfilePicture")
    },
  }))
)

const initialState = useProfileStore.getState()
export const resetProfileStore = () => {
  useProfileStore.setState(initialState, true)
}

export default useProfileStore
