import { Reducer } from 'redux';
import { SkillDto } from '../../dtos/skillbase/SkillDto';
import { SkillbaseActionReturns } from './skillbaseActions';
import { skillbaseActionTypes, SkillbaseState } from './skillbaseTypes';

const INITIAL_STATE: SkillbaseState = {
  skills: [],

  sidebarIsOpen: true,
}

const skillbaseReducer: Reducer<SkillbaseState, SkillbaseActionReturns> = (state = INITIAL_STATE, action: SkillbaseActionReturns): SkillbaseState => {
  switch (action.type) {
    case skillbaseActionTypes.SET_SKILLS:
      return { ...state, skills: action.payload }
    case skillbaseActionTypes.SET_SKILL:
      return setSkill(state, action.payload)
    case skillbaseActionTypes.ADD_SKILL:
      return addSkill(state, action.payload)

    case skillbaseActionTypes.REMOVE_SKILLS:
      return removeSkills(state, action.payload)

    case skillbaseActionTypes.SET_SIDEBAR_IS_OPEN:
      return { ...state, sidebarIsOpen: action.payload }

    default:
      return { ...state }
  }
}


const setSkill = (state: SkillbaseState, skill: SkillDto) => {

  const skills = [...state.skills]
  const index = skills.findIndex(s => s.id === skill.id)

  if (~index) {
    skills[index] = skill
  }

  return { ...state, skills }
}

const addSkill = (state: SkillbaseState, skill: SkillDto) => {

  const skills = [...state.skills]
  skills.push(skill)
  return { ...state, skills }
}


const removeSkills = (state: SkillbaseState, idsToRemove: number[]) => {

  const skillsToKeep = [...state.skills].filter(skill => !idsToRemove.includes(skill.id))

  return { ...state, skills: skillsToKeep }
}

export default skillbaseReducer