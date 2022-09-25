import apiUrls from "utils/url/urls/apiUrls";

export const queryKeys = {
  userSuggestions: apiUrls.feed.myUserSuggestions,
  feedResources: apiUrls.feed.resources,
  searchResults: "searchResults",
  labels: "labels",
  skillId: (skillId: number) => `skill-${skillId}`,
  progressMonths: "progressMonths",
  progresses: "progresses",

  similarExpenses: "/similar-expenses",

  folders: "/folders",
};
