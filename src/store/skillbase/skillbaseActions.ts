import { action } from 'typesafe-actions';
import { skillbaseActionTypes } from './skillbaseTypes';

export const setSidebarIsOpen = (value: boolean) =>
  action(skillbaseActionTypes.SET_SIDEBAR_IS_OPEN, value)

export type SkillbaseActionReturns =
  ReturnType<typeof setSidebarIsOpen>


