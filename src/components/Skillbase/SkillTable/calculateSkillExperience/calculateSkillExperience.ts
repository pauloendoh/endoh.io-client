import { SkillDto } from "types/domain/skillbase/SkillDto"

export const calculateSkillExperience = (skill: SkillDto) => {
  const priority = skill.priority ?? 0
  const discomfort = skill.discomfortZone ?? 0

  const result = Math.pow(priority, 2) * discomfort
  return Number(result.toFixed(1))
}
