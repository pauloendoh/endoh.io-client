import { action } from 'typesafe-actions';
import { FeedResourceDto } from '../../dtos/feed/FeedResourceDto';
import { UserSuggestionDto } from '../../dtos/feed/UserSuggestionDto';
import { FeedActionTypes } from './feedTypes';

export const setUserSuggestions = (userSuggestions: UserSuggestionDto[]) => action(FeedActionTypes.SET_USER_SUGGESTIONS, userSuggestions)

export const setFeedResources = (feedResources: FeedResourceDto[]) => action(FeedActionTypes.SET_FEED_RESOURCES, feedResources)

export type FeedActionReturns =
  ReturnType<typeof setUserSuggestions> |
  ReturnType<typeof setFeedResources> 
