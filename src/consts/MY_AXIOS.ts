import axios from 'axios'
require('dotenv').config()

const MY_AXIOS = axios.create()

MY_AXIOS.defaults.baseURL = process.env.REACT_APP_API_URL


MY_AXIOS.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user')
  if (userStr)
    config.headers['x-auth-token'] = JSON.parse(userStr).token


  return config
})

export default MY_AXIOS

