// PE 2/3
export interface SkillExpectationDto {
  id: number;

  level: number;
  index: number;
  description: string;
  checked: boolean;
  isCurrentGoal: boolean;

  createdAt: string;
  updatedAt: string;
}

export const createSkillExpectation = (
  level: number,
  index: number
): SkillExpectationDto => ({
  id: null,

  level: level,
  index: index,
  description: "",
  checked: false,
  isCurrentGoal: false,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
