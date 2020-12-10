import { Reducer } from 'redux';
import { RelearnActionReturns } from './relearnActions';
import { relearnActionTypes, RelearnState } from './relearnTypes';

const INITIAL_STATE: RelearnState = {
  resources: [], 
  tags: [], 

  editingResource: null,
  editingTag: null,
}

const relearnReducer: Reducer<RelearnState, RelearnActionReturns> = (state = INITIAL_STATE, action: RelearnActionReturns): RelearnState => {
  switch (action.type) {
    case relearnActionTypes.SET_RESOURCES:
      return {...state, resources: action.payload}
      case relearnActionTypes.SET_TAGS:
        return {...state, tags: action.payload}
    // case monerateActionTypes.SET_EXPENSES:
    //   return setExpenses(state, action.payload)
    case relearnActionTypes.SET_EDITING_RESOURCE:
      return { ...state, editingResource: action.payload}
      case relearnActionTypes.SET_EDITING_TAG:
        return { ...state, editingTag: action.payload}

    default:
      return { ...state }
  }
}




export default relearnReducer