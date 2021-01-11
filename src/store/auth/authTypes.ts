import { AuthUserGetDto } from 'interfaces/dtos/AuthUserGetDto';

export enum AuthActionTypes {
    SET_AUTH_USER = '@auth/SET_AUTH_USER',
    // CHECK_USER_OR_LOGOUT = '@auth/CHECK_USER_OR_LOGOUT',
    LOGOUT = '@auth/LOGOUT',
    USING_GOOGLE_SESSION = '@auth/USING_GOOGLE_SESSION',

    SET_USERNAME = '@auth/SET_USERNAME',
}

export interface AuthState {
    user: AuthUserGetDto
}

