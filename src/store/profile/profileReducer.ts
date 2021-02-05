import { Reducer } from 'redux';
import { ProfileActionReturns } from './profileActions';
import { ProfileActionTypes, ProfileState } from './profileTypes';


const INITIAL_STATE: ProfileState = {
  resources: []
}

const profileReducer: Reducer<ProfileState, ProfileActionReturns> = (state = INITIAL_STATE, action: ProfileActionReturns): ProfileState => {
  switch (action.type) {
    case ProfileActionTypes.CLEAR_PROFILE:
      return INITIAL_STATE

    case ProfileActionTypes.SET_PROFILE_RESOURCES:
      return { ...state, resources: action.payload }
    default:
      return { ...state }
  }
}

export default profileReducer