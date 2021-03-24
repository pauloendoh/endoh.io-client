import { AuthUserGetDto, UserPreferenceDto } from 'interfaces/dtos/AuthUserGetDto';
import { FollowerDto } from '../../dtos/feed/FollowerDto';
import { FollowingTagDto } from '../../dtos/feed/FollowingTagDto';
import { FollowingUserDto } from '../../dtos/feed/FollowingUserDto';
import { ProfileDto } from '../../dtos/ProfileDto';
import { NotificationDto } from '../../dtos/utils/NotificationDto';

export enum AuthActionTypes {
    SET_AUTH_USER = '@auth/SET_AUTH_USER',
    SET_PREFERENCE = '@auth/SET_PREFERENCE',

    LOGOUT = '@auth/LOGOUT',
    USING_GOOGLE_SESSION = '@auth/USING_GOOGLE_SESSION',

    SET_USERNAME = '@auth/SET_USERNAME',
    SET_FOLLOWING_TAGS = '@auth/SET_FOLLOWING_TAGS',

    SET_AUTH_PROFILE = '@auth/SET_AUTH_PROFILE',
    SET_NOTIFICATIONS = '@auth/SET_NOTIFICATIONS',
    SET_PROFILE_PICTURE = '@auth/SET_PROFILE_PICTURE',

}

export interface AuthState {
    user: AuthUserGetDto,
    preference: UserPreferenceDto,
    followingTags: FollowingTagDto[],

    profile: ProfileDto,
    followingUsers: FollowingUserDto[],
    followers: FollowerDto[],
    notifications: NotificationDto[]
}

