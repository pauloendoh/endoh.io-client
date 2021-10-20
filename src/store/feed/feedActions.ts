import { action } from "typesafe-actions";
import { FeedResourceDto } from "../../types/domain/feed/FeedResourceDto";
import { UserSuggestionDto } from "../../types/domain/feed/UserSuggestionDto";
import { FeedActionTypes } from "./feedTypes";

// PE 1/3 - too hard to read. Change to react-query/zustand in the future
export const setUserSuggestions = (userSuggestions: UserSuggestionDto[]) =>
  action(FeedActionTypes.SET_USER_SUGGESTIONS, userSuggestions);

export const setFeedResources = (feedResources: FeedResourceDto[]) =>
  action(FeedActionTypes.SET_FEED_RESOURCES, feedResources);

export type FeedActionReturns =
  | ReturnType<typeof setUserSuggestions>
  | ReturnType<typeof setFeedResources>;
