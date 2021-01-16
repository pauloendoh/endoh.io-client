import { action } from 'typesafe-actions';
import { SkillDto } from '../../dtos/skillbase/SkillDto';
import { skillbaseActionTypes, SortSkill } from './skillbaseTypes';

export const setSkills = (skills: SkillDto[]) => action(skillbaseActionTypes.SET_SKILLS, skills)
export const setSkill = (skill: SkillDto) => action(skillbaseActionTypes.SET_SKILL, skill)

export const addSkill = (skill: SkillDto) => action(skillbaseActionTypes.ADD_SKILL, skill)
export const setEditingSkill = (skill: SkillDto) => action(skillbaseActionTypes.SET_EDITING_SKILL, skill)

export const sortSkill = (sortBy: SortSkill) => action(skillbaseActionTypes.SORT_SKILL, sortBy)


export const removeSkills = (ids: number[]) => action(skillbaseActionTypes.REMOVE_SKILLS, ids)



export const setSidebarIsOpen = (value: boolean) =>
  action(skillbaseActionTypes.SET_SIDEBAR_IS_OPEN, value)

export type SkillbaseActionReturns =
  ReturnType<typeof setSkills> |
  ReturnType<typeof setSkill> |

  ReturnType<typeof addSkill> |
  ReturnType<typeof setEditingSkill> |

  ReturnType<typeof sortSkill> |


  ReturnType<typeof removeSkills> |


  ReturnType<typeof setSidebarIsOpen>


