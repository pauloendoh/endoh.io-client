import { UserProfileDto } from "../feed/UserProfileDto";
import { ResourceDto } from "../relearn/ResourceDto";
import { SkillDto } from "../skillbase/SkillDto";
export interface SearchResultsDto {
  resources: ResourceDto[];
  users: UserProfileDto[];
  skills: SkillDto[];
}
