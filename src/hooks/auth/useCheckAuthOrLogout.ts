import useAuthStore from "store/zustand/useAuthStore";
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto";
import myAxios from "utils/consts/myAxios";
import { getQueryParam } from "utils/url/getQueryParam";
import { urls } from "utils/urls";
import { useLogout } from "./useLogout";

const useCheckAuthOrLogout = () => {
  const logout = useLogout();
  const { setAuthUser } = useAuthStore();

  const checkAuthOrLogout = () => {
    const userLocalStorage = localStorage.getItem("user");
    // const googleSession = getCookie('endoh_google_session')

    if (!userLocalStorage) {
      // Login with google?
      const oauthToken = getQueryParam("oauthToken");
      const userId = getQueryParam("userId");

      if (oauthToken?.length && userId?.length) {
        myAxios
          .post<AuthUserGetDto>(urls.api.auth.googleLogin, {
            // withCredentials: true
            userId: Number(userId),
            token: oauthToken,
          })
          .then((res) => {
            const user = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            setAuthUser(user);
          });
      }

      return;
    } else {
      // Regular login
      const user: AuthUserGetDto = JSON.parse(userLocalStorage);
      if (new Date(user.expiresAt) <= new Date()) return logout();
      return setAuthUser(user);
    }
  };

  return checkAuthOrLogout;
};

export default useCheckAuthOrLogout;
