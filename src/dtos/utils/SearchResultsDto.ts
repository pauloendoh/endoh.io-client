import { SkillDto } from '../skillbase/SkillDto';
import { ResourceDto } from '../../interfaces/dtos/relearn/ResourceDto'
import { UserProfileDto } from '../feed/UserProfileDto';
export interface SearchResultsDto {
    resources: ResourceDto[],
    users: UserProfileDto[],
    skills: SkillDto[]
}