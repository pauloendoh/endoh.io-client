import { LabelDto } from "./LabelDto";
import { SkillExpectationDto } from "./SkillExpectationDto";

export interface SkillDto {
  id: number;
  userId: number;
  tagId: number;

  dependencies: SkillDto[];
  expectations: SkillExpectationDto[];

  labels?: LabelDto[];

  isPriority: boolean;
  name: string;
  currentLevel: number;
  goalLevel: number;

  isPublic: boolean;

  createdAt: string;
  updatedAt: string;
}

export const newSkillDto = (tagId: number = null): SkillDto => ({
  id: null,
  userId: null,
  tagId,

  dependencies: [],
  expectations: [],

  labels: [],

  isPriority: false,
  name: "",
  currentLevel: null,
  goalLevel: null,

  isPublic: false,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
