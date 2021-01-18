import { AuthUserGetDto, UserPreferenceDto } from 'interfaces/dtos/AuthUserGetDto';

export enum AuthActionTypes {
    SET_AUTH_USER = '@auth/SET_AUTH_USER',
    SET_PREFERENCE = '@auth/SET_PREFERENCE',

    LOGOUT = '@auth/LOGOUT',
    USING_GOOGLE_SESSION = '@auth/USING_GOOGLE_SESSION',

    SET_USERNAME = '@auth/SET_USERNAME',
}

export interface AuthState {
    user: AuthUserGetDto, 
    preference: UserPreferenceDto
}

