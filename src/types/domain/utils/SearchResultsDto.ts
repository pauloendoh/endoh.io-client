import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto";
import { UserProfileDto } from "../feed/UserProfileDto";
import { SkillDto } from "../skillbase/SkillDto";
export interface SearchResultsDto {
  resources: ResourceDto[];
  users: UserProfileDto[];
  skills: SkillDto[];
}
