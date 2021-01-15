import { SkillDto } from '../../dtos/skillbase/SkillDto';

export enum skillbaseActionTypes {
    SET_SKILLS = '@skillbase/SET_SKILLS',
    SET_SKILL = '@skillbase/SET_SKILL',
    
    ADD_SKILL = '@skillbase/ADD_SKILL',
    REMOVE_SKILLS = '@skillbase/REMOVE_SKILLS',
    
    SET_EDITING_SKILL = '@skillbase/SET_EDITING_SKILL',
    
    SET_SIDEBAR_IS_OPEN = '@skillbase/SET_SIDEBAR_IS_OPEN',
}

export interface SkillbaseState {
    skills: SkillDto[], 
    editingSkill: SkillDto, 

    sidebarIsOpen: boolean
}

