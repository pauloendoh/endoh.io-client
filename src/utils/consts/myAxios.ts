import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

const myAxios = axios.create()

myAxios.defaults.baseURL = process.env.REACT_APP_API_URL

myAxios.interceptors.request.use((config) => {
  const userStr = localStorage.getItem("user")
  if (userStr) config.headers["x-auth-token"] = JSON.parse(userStr).token
  return config
})

myAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // unauthenticated -> go to "/"
    if (error?.response?.status === 401) {
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default myAxios

// https://orval.dev/guides/custom-axios#custom-instance
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const source = axios.CancelToken.source()
  const promise = myAxios({
    ...config,
    ...options,
    cancelToken: source.token,
  })

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData
