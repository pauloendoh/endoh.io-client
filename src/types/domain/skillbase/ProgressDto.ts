import { SkillDto } from "./SkillDto";

// PE 1/3  - delete everything related to this old progress dto
export interface ProgressDto {
  id: number;
  skill: SkillDto;
  skillId: number;
  oldLevel: number;
  newLevel: number;
  goalLevel: number;

  createdAt: string;
  updatedAt: string;
}
