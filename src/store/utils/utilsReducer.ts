import { Reducer } from 'redux';
import { UtilsActionReturns } from './utilsActions';

import { UtilsState, utilsActionTypes } from './utilsTypes';

const INITIAL_STATE: UtilsState = {
  successMessage: '',
  errorMessage: ''

}

const utilsReducer: Reducer<UtilsState, UtilsActionReturns> = (state = INITIAL_STATE, action: UtilsActionReturns): UtilsState => {
  switch (action.type) {
    case utilsActionTypes.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }
    case utilsActionTypes.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    default:
      return { ...state }
  }
}

export default utilsReducer