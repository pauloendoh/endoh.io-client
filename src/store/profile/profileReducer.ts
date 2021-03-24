import { Reducer } from 'redux';
import { ProfileActionReturns } from './profileActions';
import { ProfileActionTypes, ProfileState } from './profileTypes';


const INITIAL_STATE: ProfileState = {
  profile: null,
  resources: [],

  publicLists: [],
  privateLists: [],

  followingUsers: [],
  followers: [],
}

const profileReducer: Reducer<ProfileState, ProfileActionReturns> = (state = INITIAL_STATE, action: ProfileActionReturns): ProfileState => {
  switch (action.type) {
    case ProfileActionTypes.CLEAR_PROFILE:
      return INITIAL_STATE
    case ProfileActionTypes.SET_PROFILE:
      return { ...state, profile: action.payload }
    case ProfileActionTypes.SET_PROFILE_RESOURCES:
      return { ...state, resources: action.payload }
    case ProfileActionTypes.SET_USER_INFO:
      const { payload } = action
      return {
        ...state,
        profile: payload.profile,
        resources: payload.resources,
        publicLists: payload.publicLists,
        privateLists: payload.privateLists,
        followingUsers: payload.followingUsers,
        followers:
          payload.followers,
      }
    case ProfileActionTypes.SET_PROFILE_PICTURE:
      const profile = { ...state.profile }
      profile.pictureUrl = action.payload
      return { ...state, profile }
    default:
      return { ...state }
  }
}

export default profileReducer