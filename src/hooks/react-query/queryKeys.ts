import { urls } from "utils/urls"

export const queryKeys = {
  userSuggestions: urls.api.feed.myUserSuggestions,
  feedResources: urls.api.feed.resources,
  resourceSearchResults: "resourceSearchResults",
  notesSearchResults: "notesSearchResults",
  labels: "labels",
  skillId: (skillId: number) => `skill-${skillId}`,
  progressMonths: "progressMonths",
  progresses: "progresses",

  similarExpenses: "/similar-expenses",

  folders: "/folders",
  gotIt: "/got-it",
}
