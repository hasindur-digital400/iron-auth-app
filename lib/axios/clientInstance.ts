import axios from 'axios'

export const CLIENT_BASE_URL = 'http://localhost:3000/api/'

// Handles API calls to Next server
const instance = axios.create({
  baseURL: CLIENT_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return error?.response
  }
)

export default instance
