import { SkillExpectationDto } from "./SkillExpectationDto"

export interface SkillDto {
  id: number
  userId: number
  tagId: number

  dependencies: SkillDto[]
  expectations: SkillExpectationDto[]

  isPriority: boolean
  name: string
  currentLevel: number
  goalLevel: number

  createdAt: string
  updatedAt: string
}

export const newSkillDto: SkillDto = {
  id: null,
  userId: null,
  tagId: null,

  dependencies: [],
  expectations: [],

  isPriority: false,
  name: "",
  currentLevel: null,
  goalLevel: null,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
