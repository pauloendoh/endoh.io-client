import axios from "axios"

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
