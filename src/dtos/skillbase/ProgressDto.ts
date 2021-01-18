import { SkillDto } from './SkillDto';
export interface ProgressDto {
    id: number;
    skill: SkillDto;
    skillId: number;
    oldLevel: number;
    newLevel: number;

    createdAt: string
    updatedAt: string
}