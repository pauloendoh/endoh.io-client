import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { getQueryParam } from 'utils/url/getQueryParam';
import API from '../../consts/API';
import MY_AXIOS from '../../consts/MY_AXIOS';
import { AuthUserGetDto, UserPreferenceDto } from '../../interfaces/dtos/AuthUserGetDto';
import { monerateActionTypes } from '../monerate/monerateTypes';
import { relearnActionTypes } from '../relearn/relearnTypes';
import { AuthActionTypes } from './authTypes';

export const setAuthUser = (authUser: AuthUserGetDto) => action(AuthActionTypes.SET_AUTH_USER, authUser)


const logout = () => action(AuthActionTypes.LOGOUT)

const usingGoogleSession = () => action(AuthActionTypes.USING_GOOGLE_SESSION)

export const setUsername = (newUsername: string) => action(AuthActionTypes.SET_USERNAME, newUsername)

export const setPreference = (preference: UserPreferenceDto) => action(AuthActionTypes.SET_PREFERENCE, preference)

export function savePreferenceActionCreator(dispatch: Dispatch, preference: UserPreferenceDto) {
  dispatch(setPreference(preference))
  MY_AXIOS.post(API.auth.userPreference, preference)
}

export function checkAuthOrLogoutActionCreator(dispatch: Dispatch) {
  const userLocalStorage = localStorage.getItem('user')
  // const googleSession = getCookie('endoh_google_session')

  if (!userLocalStorage) {
    const oauthToken = getQueryParam('oauthToken')
    const userId = getQueryParam('userId')

    if (oauthToken?.length && userId?.length) {

      MY_AXIOS.post<AuthUserGetDto>(API.auth.googleLogin, {
        // withCredentials: true
        userId: Number(userId),
        token: oauthToken
      }).then((res) => {

        const user = res.data
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(setAuthUser(user))
      })
    }

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
  dispatch(action(relearnActionTypes.CLEAR_RELEARN_REDUCER))
  dispatch(action(monerateActionTypes.CLEAR_MONERATE_REDUCER))
  return logout()
}

export type AuthActionReturns =
  ReturnType<typeof setAuthUser> |
  ReturnType<typeof setPreference> |

  ReturnType<typeof logout> |
  ReturnType<typeof usingGoogleSession> |
  ReturnType<typeof setUsername> 