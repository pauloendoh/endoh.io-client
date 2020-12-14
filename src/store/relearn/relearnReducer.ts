import { ResourceDto } from '../../dtos/relearn/ResourceDto';
import { Reducer } from 'redux';
import { RelearnActionReturns } from './relearnActions';
import { relearnActionTypes, RelearnState } from './relearnTypes';
import {sleep} from '../../utils/sleep'

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
      return setEditingResource(state, action.payload)
      case relearnActionTypes.SET_EDITING_TAG:
        return { ...state, editingTag: action.payload}

    default:
      return { ...state }
  }
}

const setEditingResource = (state: RelearnState, resource: ResourceDto): RelearnState => {
  return { ...state, editingResource: resource }
}




export default relearnReducer