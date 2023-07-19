// PE 2/3
export interface SkillExpectationDto {
  id: number | null

  level: number
  index: number
  description: string
  checked: boolean
  isCurrentGoal: boolean

  createdAt: string
  updatedAt: string

  randomId?: number // for drag and rop purpose
}

export const buildSkillExpectationDto = (
  p?: Partial<SkillExpectationDto>
): SkillExpectationDto => ({
  id: null,

  level: 0,
  index: 0,
  description: "",
  checked: false,
  isCurrentGoal: false,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  randomId: new Date().getTime(),
  ...p,
})
