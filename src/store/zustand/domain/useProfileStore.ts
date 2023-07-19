import { ProfileDto } from "types/domain/_common/ProfileDto"
import { UserInfoDto } from "types/domain/_common/UserInfoDto"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { FollowerDto } from "types/domain/feed/FollowerDto"
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto"
import { TagDto } from "types/domain/relearn/TagDto"
import { SkillDto } from "types/domain/skillbase/SkillDto"
import { create } from "zustand"

interface IStore {
  profile: ProfileDto | null
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

const useProfileStore = create<IStore>((set, get) => ({
  profile: null,
  resources: [],

  publicTags: [],
  privateTags: [],

  followingUsers: [],
  followers: [],

  publicSkills: [],

  setProfile: (profile) => {
    set({ profile })
  },

  setUserInfo: (userInfo) => {
    set({
      profile: userInfo.profile,
      resources: userInfo.resources,
      publicTags: userInfo.publicLists,
      privateTags: userInfo.privateLists,
      followingUsers: userInfo.followingUsers,
      followers: userInfo.followers,
      publicSkills: userInfo.publicSkills,
    })
  },

  setProfilePicture: (pictureUrl) => {
    const { profile } = get()
    if (!profile) return
    profile.pictureUrl = pictureUrl
    set({ profile })
  },
}))

const initialState = useProfileStore.getState()
export const resetProfileStore = () => {
  useProfileStore.setState(initialState, true)
}

export default useProfileStore
