import { FeedResourceDto } from '../../dtos/feed/FeedResourceDto';
import { UserSuggestionDto } from '../../dtos/feed/UserSuggestionDto';

export enum FeedActionTypes {
    SET_USER_SUGGESTIONS = '@feed/SET_USER_SUGGESTIONS',
    SET_FEED_RESOURCES = '@feed/SET_FEED_RESOURCES',


}

export interface FeedState {
    userSuggestions: UserSuggestionDto[],
    resources: FeedResourceDto[]
}

