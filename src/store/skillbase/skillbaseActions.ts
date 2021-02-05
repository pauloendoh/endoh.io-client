import { action } from 'typesafe-actions';
import { ProgressDto } from '../../dtos/skillbase/ProgressDto';
import { SkillDto } from '../../dtos/skillbase/SkillDto';
import { skillbaseActionTypes, SortSkill } from './skillbaseTypes';

export const clearSkillbaseReducer = () => action(skillbaseActionTypes.CLEAR_SKILLBASE_REDUCER)
export const setSkills = (skills: SkillDto[]) => action(skillbaseActionTypes.SET_SKILLS, skills)
export const setSkill = (skill: SkillDto) => action(skillbaseActionTypes.SET_SKILL, skill)

export const addSkill = (skill: SkillDto) => action(skillbaseActionTypes.ADD_SKILL, skill)
export const setEditingSkill = (skill: SkillDto) => action(skillbaseActionTypes.SET_EDITING_SKILL, skill)

export const sortSkill = (sortBy: SortSkill) => action(skillbaseActionTypes.SORT_SKILL, sortBy)

export const setProgresses = (progresses: ProgressDto[]) => action(skillbaseActionTypes.SET_PROGRESSES, progresses)
export const removeSkills = (ids: number[]) => action(skillbaseActionTypes.REMOVE_SKILLS, ids)



export const setSidebarIsOpen = (value: boolean) =>
  action(skillbaseActionTypes.SET_SIDEBAR_IS_OPEN, value)

export type SkillbaseActionReturns =
  ReturnType<typeof clearSkillbaseReducer> |
  ReturnType<typeof setSkills> |
  ReturnType<typeof setSkill> |

  ReturnType<typeof addSkill> |
  ReturnType<typeof setEditingSkill> |

  ReturnType<typeof sortSkill> |


  ReturnType<typeof removeSkills> |

  ReturnType<typeof setProgresses> |
  ReturnType<typeof setSidebarIsOpen>


