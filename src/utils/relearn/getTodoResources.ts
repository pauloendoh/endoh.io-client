import { ResourceDto } from '../../dtos/relearn/ResourceDto';

export const getTodoResources = (resources: ResourceDto[]): ResourceDto[] => {
    return resources.filter((resource) =>
        (resource.rating === 0 || resource.rating === null) &&
        resource.completedAt.length === 0
    )
}