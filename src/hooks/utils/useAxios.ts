import axios from "axios"
import { ValidationError } from "class-validator"
import useSnackbarStore from "store/zustand/useSnackbarStore"

export const useAxios = (params?: { redirectOn401?: boolean }) => {
  const redirectOn401 = params?.redirectOn401 || true

  const localAxios = axios.create()
  localAxios.defaults.baseURL = process.env.REACT_APP_API_URL

  const setErrorMessage = useSnackbarStore((s) => s.setErrorMessage)

  localAxios.interceptors.request.use(async (config) => {
    const userStr = localStorage.getItem("user")
    if (userStr) config.headers["x-auth-token"] = JSON.parse(userStr).token
    return config
  })

  localAxios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // unauthenticated -> go to "/"
      if (error?.response?.status === 401 && redirectOn401 && window) {
        window.location.reload()
      }

      if (
        axios.isAxiosError<{ errors: ValidationError[]; message: string }>(
          error
        )
      ) {
        const constraints = error.response?.data?.errors?.[0].constraints
        if (constraints) {
          const [key, value] = Object.entries(constraints)[0]

          setErrorMessage(value)

          return Promise.reject(error)
        }

        setErrorMessage(error.response?.data.message || error.message)
      }

      return Promise.reject(error)
    }
  )

  return localAxios
}
