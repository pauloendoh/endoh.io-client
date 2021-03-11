import { Reducer } from 'redux';
import { FeedActionReturns } from './feedActions';
import { FeedActionTypes, FeedState } from './feedTypes';


const INITIAL_STATE: FeedState = {
  userSuggestions: [],
  resources: []
}

const feedReducer: Reducer<FeedState, FeedActionReturns> = (state = INITIAL_STATE, action: FeedActionReturns): FeedState => {
  switch (action.type) {
    case FeedActionTypes.SET_USER_SUGGESTIONS:
      return { ...state, userSuggestions: action.payload }
    case FeedActionTypes.SET_FEED_RESOURCES:
      return { ...state, resources: action.payload }
    default:
      return { ...state }
  }
}

export default feedReducer