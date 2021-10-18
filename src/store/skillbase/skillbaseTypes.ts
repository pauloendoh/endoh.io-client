import { ProgressDto } from "../../types/domain/skillbase/ProgressDto";
import { SkillDto } from "../../types/domain/skillbase/SkillDto";

export enum skillbaseActionTypes {
  CLEAR_SKILLBASE_REDUCER = "@skillbase/CLEAR_SKILLBASE_REDUCER",
  SET_SKILLS = "@skillbase/SET_SKILLS",
  SET_SKILL = "@skillbase/SET_SKILL",
  ADD_SKILL = "@skillbase/ADD_SKILL",
  REMOVE_SKILLS = "@skillbase/REMOVE_SKILLS",

  SORT_SKILL = "@skillbase/SORT_SKILL",

  SET_EDITING_SKILL = "@skillbase/SET_EDITING_SKILL",

  SET_PROGRESSES = "@skillbase/SET_PROGRESSES",
  SET_SIDEBAR_IS_OPEN = "@skillbase/SET_SIDEBAR_IS_OPEN",
}

export interface SkillbaseState {
  skills: SkillDto[];
  hasFirstLoaded: boolean;

  sortBy: SortSkill;

  editingSkill: SkillDto;

  progresses: ProgressDto[];
  sidebarIsOpen: boolean;
}

export interface SortSkill {
  property: keyof SkillDto;
  order: "asc" | "desc";
}
