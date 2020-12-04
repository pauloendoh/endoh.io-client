import axios from 'axios'
require('dotenv').config()

const myAxios = axios.create()

myAxios.defaults.baseURL = process.env.REACT_APP_API_URL

myAxios.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user')
  if (userStr) 
    config.headers['x-auth-token'] = JSON.parse(userStr).token  
  return config 
})

export default myAxios

