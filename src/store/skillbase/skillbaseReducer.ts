import { Reducer } from 'redux';
import { SkillbaseActionReturns } from './skillbaseActions';
import { skillbaseActionTypes, SkillbaseState } from './skillbaseTypes';

const INITIAL_STATE: SkillbaseState = {
  sidebarIsOpen: true,
}

const skillbaseReducer: Reducer<SkillbaseState, SkillbaseActionReturns> = (state = INITIAL_STATE, action: SkillbaseActionReturns): SkillbaseState => {
  switch (action.type) {
    case skillbaseActionTypes.SET_SIDEBAR_IS_OPEN:
      return { ...state, sidebarIsOpen: action.payload }

    default:
      return { ...state }
  }
}


export default skillbaseReducer