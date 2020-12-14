import { action } from 'typesafe-actions'
import { utilsActionTypes } from './utilsTypes'


export const setSuccessMessage = (message: string) =>
  action(utilsActionTypes.SET_SUCCESS_MESSAGE, message)
  
  export const setErrorMessage = (message: string) =>
  action(utilsActionTypes.SET_ERROR_MESSAGE, message)


// PE 2/3 - Perigo da pessoa esquecer de colocar aqui....
export type UtilsActionReturns =
  ReturnType<typeof setSuccessMessage> |
  ReturnType<typeof setErrorMessage> 

