import { AuthUserGetDto } from '../../interfaces/dtos/AuthUserGetDto';
import { AuthActionTypes } from './authTypes';
import { action } from 'typesafe-actions'
import { Dispatch } from 'redux';
import { relearnActionTypes } from '../relearn/relearnTypes';
import { monerateActionTypes } from '../monerate/monerateTypes';
import { deleteCookie } from '../../utils/cookie/deleteCookie'
import { getCookie } from '../../utils/cookie/getCookie'
import MY_AXIOS from '../../consts/MY_AXIOS';
import API from '../../consts/API';

export const setAuthUser = (authUser: AuthUserGetDto) => action(AuthActionTypes.SET_AUTH_USER, authUser)
const logout = () => action(AuthActionTypes.LOGOUT)

const usingGoogleSession = () => action(AuthActionTypes.USING_GOOGLE_SESSION)

export function checkAuthOrLogoutActionCreator(dispatch: Dispatch) {
  const userLocalStorage = localStorage.getItem('user')
  // const googleSession = getCookie('endoh_google_session')

  if (!userLocalStorage) {
    MY_AXIOS.get<AuthUserGetDto>(API.auth.googleLogin, {
      withCredentials: true

    }).then((res) => {
      // deleteCookie('endoh_google_session')

      const user = res.data
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(setAuthUser(user))
    })

    return usingGoogleSession()
  }
  else {
    const user: AuthUserGetDto = JSON.parse(userLocalStorage)
    if (new Date(user.expiresAt) <= new Date())
      return logout()

    return setAuthUser(user)
  }
}

export const logoutActionCreator = (dispatch: Dispatch) => {

  deleteCookie('endoh_google_session')

  // dispatching other actions
  dispatch(action(relearnActionTypes.CLEAR_RELEARN_REDUCER))
  dispatch(action(monerateActionTypes.CLEAR_MONERATE_REDUCER))
  return logout()
}

export type AuthActionReturns =
  ReturnType<typeof setAuthUser> |
  ReturnType<typeof logout> |
  ReturnType<typeof usingGoogleSession>