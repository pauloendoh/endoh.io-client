import { AuthUserGetDto } from 'interfaces/dtos/AuthUserGetDto';
import { Reducer } from 'redux';
import { AuthActionReturns } from './authActions';
import { AuthActionTypes, AuthState } from './authTypes';

const INITIAL_STATE: AuthState = {
  user: null,
  preference: null
}

const authReducer: Reducer<AuthState, AuthActionReturns> = (state = INITIAL_STATE, action: AuthActionReturns): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_USER:
      return setAuthUser(state, action.payload)
    case AuthActionTypes.SET_PREFERENCE:
      return { ...state, preference: action.payload }
    case AuthActionTypes.LOGOUT:
      return logout(state)
    case AuthActionTypes.USING_GOOGLE_SESSION:
      return { ...state }
    case AuthActionTypes.SET_USERNAME:
      return setUsername(state, action.payload)
    default:
      return { ...state }
    // case AuthTypes.CHECK_USER_OR_LOGOUT:
  }
}

const setAuthUser = (state: AuthState, authUser: AuthUserGetDto): AuthState => {

  const expiresAt = new Date(authUser.expiresAt)

  localStorage.setItem('user', JSON.stringify(authUser))

  // Refresh logout timeout
  setTimeout(() => {
    return logout(state)
  }, expiresAt.getTime() - (new Date()).getTime())

  return { ...state, user: authUser }
}


const logout = (state: AuthState): AuthState => {
  localStorage.removeItem('user')
  return INITIAL_STATE
}


const setUsername = (state: AuthState, newUsername: string): AuthState => {
  const user = state.user
  user.username = newUsername
  return { ...state, user }
}

export default authReducer