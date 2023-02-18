import { Dispatch } from "redux"
import { monerateActionTypes } from "store/monerate/monerateTypes"
import { resetDocsStore } from "store/zustand/domain/useDocsStore"
import { resetProfileStore } from "store/zustand/domain/useProfileStore"
import { resetSkillbaseStore } from "store/zustand/domain/useSkillbaseStore"
import { resetAuthStore } from "store/zustand/useAuthStore"
import { action } from "typesafe-actions"

export const useLogout = (dispatch?: Dispatch) => {
  const logout = () => {
    if (dispatch) {
      dispatch(action(monerateActionTypes.CLEAR_MONERATE_REDUCER))
    }

    resetSkillbaseStore()
    resetDocsStore()
    resetProfileStore()
    resetAuthStore()
  }
  return logout
}
