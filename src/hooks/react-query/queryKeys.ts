import apiUrls from "utils/url/urls/apiUrls";

export const queryKeys = {
  userSuggestions: apiUrls.feed.myUserSuggestions,
  feedResources: apiUrls.feed.resources,
  searchResults: "searchResults",
  labels: "labels",
  skillLabels: "skillLabels",
  skill: (skillId: number) => `skill-${skillId}`,
};
