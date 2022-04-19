import { SkillDto } from "types/domain/skillbase/SkillDto";

const skillIsIncompleted = (skill: SkillDto) => {
  if (skill.currentLevel === null) return true;
  if (skill.currentLevel > 0 && skill.goalLevel === null) return false;
  return skill.currentLevel !== skill.goalLevel;
};

export default skillIsIncompleted;
