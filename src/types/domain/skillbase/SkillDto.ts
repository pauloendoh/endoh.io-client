import { SkillExpectationDto } from "./SkillExpectationDto";

export interface SkillDto {
  id: number;
  userId: number;
  tagId: number;

  dependencies: SkillDto[];
  expectations: SkillExpectationDto[];

  isPriority: boolean;
  name: string;
  currentLevel: number;
  currentGoal: number;
  goalLevel: number;

  createdAt: string;
  updatedAt: string;
}

export const newSkillDto = (tagId: number = null): SkillDto => ({
  id: null,
  userId: null,
  tagId,

  dependencies: [],
  expectations: [],

  isPriority: false,
  name: "",
  currentLevel: null,
  currentGoal: null,
  goalLevel: null,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
