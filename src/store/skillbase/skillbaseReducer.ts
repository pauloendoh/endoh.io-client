import { Reducer } from "redux";
import { SkillDto } from "../../types/domain/skillbase/SkillDto";
import { SkillbaseActionReturns } from "./skillbaseActions";
import { skillbaseActionTypes, SkillbaseState } from "./skillbaseTypes";

const INITIAL_STATE: SkillbaseState = {
  skills: [],
  hasFirstLoaded: false,

  sortBy: { property: "isPriority", order: "desc" },

  editingSkill: null,

  progresses: [],
  sidebarIsOpen: false,
};

const skillbaseReducer: Reducer<SkillbaseState, SkillbaseActionReturns> = (
  state = INITIAL_STATE,
  action: SkillbaseActionReturns
): SkillbaseState => {
  switch (action.type) {
    case skillbaseActionTypes.CLEAR_SKILLBASE_REDUCER:
      return INITIAL_STATE;

    case skillbaseActionTypes.SET_SKILLS:
      return { ...state, skills: action.payload, hasFirstLoaded: true };
    case skillbaseActionTypes.SET_SKILL:
      return setSkill(state, action.payload);
    case skillbaseActionTypes.ADD_SKILL:
      return addSkill(state, action.payload);
    case skillbaseActionTypes.SET_EDITING_SKILL:
      return { ...state, editingSkill: action.payload };

    case skillbaseActionTypes.SORT_SKILL:
      return { ...state, sortBy: action.payload };
    case skillbaseActionTypes.REMOVE_SKILLS:
      return removeSkills(state, action.payload);

    case skillbaseActionTypes.SET_PROGRESSES:
      return { ...state, progresses: action.payload };

    case skillbaseActionTypes.SET_SIDEBAR_IS_OPEN:
      return { ...state, sidebarIsOpen: action.payload };
    default:
      return { ...state };
  }
};

const setSkill = (state: SkillbaseState, skill: SkillDto) => {
  const skills = [...state.skills];
  const index = skills.findIndex((s) => s.id === skill.id);

  if (~index) {
    skills[index] = skill;
  }

  return { ...state, skills };
};

const addSkill = (state: SkillbaseState, skill: SkillDto) => {
  const skills = [...state.skills];
  skills.push(skill);
  return { ...state, skills };
};

const removeSkills = (state: SkillbaseState, idsToRemove: number[]) => {
  const skillsToKeep = [...state.skills].filter(
    (skill) => !idsToRemove.includes(skill.id)
  );

  return { ...state, skills: skillsToKeep };
};

export default skillbaseReducer;
