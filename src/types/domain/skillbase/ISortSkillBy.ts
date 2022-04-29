import { SkillDto } from "types/domain/skillbase/SkillDto";

export interface ISortSkillBy {
  property: keyof SkillDto;
  order: "asc" | "desc";
}
