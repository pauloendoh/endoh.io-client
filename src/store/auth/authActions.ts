import { AuthUserGetDto } from '../../interfaces/dtos/AuthUserGetDto';
import { AuthActionTypes } from './authTypes';
import { action } from 'typesafe-actions'
import { Dispatch } from 'redux';
import { relearnActionTypes } from '../relearn/relearnTypes';
import { monerateActionTypes } from '../monerate/monerateTypes';

export const setAuthUser = (authUser: AuthUserGetDto) => action(AuthActionTypes.SET_AUTH_USER, authUser)
const logout = () => action(AuthActionTypes.LOGOUT)


export const checkAuthOrLogoutActionCreator = (dispatch: Dispatch) => {
  const userStr = localStorage.getItem('user')
  if (!userStr)
    return logout()

  const user: AuthUserGetDto = JSON.parse(userStr)
  if (new Date(user.expiresAt) <= new Date())
    return logout()

  return setAuthUser(user)
}

export const logoutActionCreator = (dispatch: Dispatch) => {
  // dispatching other actions
  dispatch(action(relearnActionTypes.CLEAR_RELEARN_REDUCER))
  dispatch(action(monerateActionTypes.CLEAR_MONERATE_REDUCER))
  return logout()
}

export type AuthActionReturns =
  ReturnType<typeof setAuthUser> |
  ReturnType<typeof logout> 