
export enum utilsActionTypes {
    SET_SUCCESS_MESSAGE = '@utils/SET_SUCCESS_MESSAGE',
    SET_ERROR_MESSAGE = '@utils/SET_ERROR_MESSAGE',
}

export interface UtilsState {
    successMessage: string,
    errorMessage: string
}

