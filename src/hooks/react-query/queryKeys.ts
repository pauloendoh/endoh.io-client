import { urls } from "utils/urls"

export const queryKeys = {
  userSuggestions: urls.api.feed.myUserSuggestions,
  feedResources: (type: "completed" | "bookmarked") =>
    urls.api.feed.resources(type),
  resourceSearchResults: "resourceSearchResults",
  questionsSearchResults: "questionsSearchResults",
  labels: "labels",
  skillId: (skillId: number) => `skill-${skillId}`,
  progressMonths: "progressMonths",
  progresses: "progresses",

  similarExpenses: "/similar-expenses",
  avgLearningPerHourQuery: "/avg-learning-per-hour",

  folders: "/folders",
  gotIt: "/got-it",
  learningsPerDay: "/learnings-per-day",
  lastSeenResource: urls.api.feed.lastSeenResource,
  newResourcesCount: urls.api.feed.newResourcesCount,
  recurrentLearnings: "/recurrent-learnings",
}
