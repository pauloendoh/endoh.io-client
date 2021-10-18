import { ResourceDto } from "../../types/domain/relearn/ResourceDto";

export const getTodoResources = (resources: ResourceDto[]): ResourceDto[] => {
  return resources.filter(
    (resource) =>
      (resource.rating === 0 || resource.rating === null) &&
      // isn't this condition enough?
      resource.completedAt.length === 0
  );
};
