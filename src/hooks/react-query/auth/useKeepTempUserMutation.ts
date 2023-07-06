import { useLogout } from "hooks/auth/useLogout"
import { useAxios } from "hooks/utils/useAxios"
import { useMutation } from "@tanstack/react-query"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto"
import { RegisterDto } from "types/domain/auth/RegisterDto"
import { urls } from "utils/urls"

export default function useKeepTempUserMutation() {
  const { setSuccessMessage } = useSnackbarStore()

  const axios = useAxios()
  const logout = useLogout()

  return useMutation(
    (dto: RegisterDto) =>
      axios
        .post<AuthUserGetDto>(urls.api.auth.keepTempUser, dto)
        .then((res) => res.data),
    {
      onSuccess: () => {
        setSuccessMessage(
          "User saved! Please, enter with your new credentials."
        )
        logout()
      },
    }
  )
}
