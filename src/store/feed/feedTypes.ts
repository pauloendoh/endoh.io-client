import { FeedResourceDto } from "../../types/domain/feed/FeedResourceDto";
import { UserSuggestionDto } from "../../types/domain/feed/UserSuggestionDto";

export enum FeedActionTypes {
  SET_USER_SUGGESTIONS = "@feed/SET_USER_SUGGESTIONS",
  SET_FEED_RESOURCES = "@feed/SET_FEED_RESOURCES",
}

export interface FeedState {
  userSuggestions: UserSuggestionDto[];
  resources: FeedResourceDto[];
}
