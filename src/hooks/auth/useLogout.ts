import { Dispatch } from "redux";
import { logoutAction } from "store/auth/authActions";
import { monerateActionTypes } from "store/monerate/monerateTypes";
import { relearnActionTypes } from "store/relearn/relearnTypes";
import { skillbaseActionTypes } from "store/skillbase/skillbaseTypes";
import { resetDocsStore } from "store/zustand/domain/useDocsStore";
import { resetProfileStore } from "store/zustand/domain/useProfileStore";
import { action } from "typesafe-actions";

export const useLogout = (dispatch: Dispatch) => {
  const logout = () => {
    dispatch(action(relearnActionTypes.CLEAR_RELEARN_REDUCER));
    dispatch(action(monerateActionTypes.CLEAR_MONERATE_REDUCER));
    dispatch(action(skillbaseActionTypes.CLEAR_SKILLBASE_REDUCER));

    resetDocsStore();
    resetProfileStore();
    dispatch(logoutAction());
  };
  return logout;
};
