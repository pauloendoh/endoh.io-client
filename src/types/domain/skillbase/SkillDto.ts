import { LabelDto } from "./LabelDto"
import { SkillExpectationDto } from "./SkillExpectationDto"

export interface SkillDto {
  id: number | null
  userId: number | null
  tagId: number | null

  dependencies: SkillDto[]
  expectations: SkillExpectationDto[]

  labels?: LabelDto[]

  isPriority: boolean
  name: string
  currentLevel: number | null
  goalLevel: number | null
  priority: number | null
  discomfortZone: number | null

  skillExperience: number | null

  isPublic: boolean

  createdAt: string
  updatedAt: string
}

export const buildSkillDto = (tagId: number | null = null): SkillDto => ({
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
  priority: null,
  discomfortZone: null,
  skillExperience: null,

  isPublic: false,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})
