import axios from 'axios'
import setSessionCookie from '@/lib/session/setSessionCookie'
import getSessionCookie from '@/lib/session/getSessionCookie'
import { CLIENT_BASE_URL } from '@/lib/axios/clientInstance'

export const SERVER_BASE_URL = 'https://api.escuelajs.co/api/v1/'

// Handles API calls to escuelajs.co
const instance = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// const refreshAuthLogic = async (failedRequest: any) => {
//   const { refresh_token, remember_me } = await getSessionCookie()
//   return axios
//     .post(SERVER_BASE_URL + '/auth/refresh-token')
//     .then((tokenRefreshResponse) => {
//       localStorage.setItem('token', tokenRefreshResponse.data.token)
//       failedRequest.response.config.headers['Authorization'] =
//         'Bearer ' + tokenRefreshResponse.data.token
//       return Promise.resolve()
//     })
// }

instance.interceptors.request.use(async (config) => {
  const session = await getSessionCookie()

  if (session?.access_token) {
    config.headers['Authorization'] = `Bearer ${session?.access_token}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const status = error?.response?.status

    if (status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true
        const session = await getSessionCookie()

        if (session?.refresh_token) {
          const { data, status } = await axios.post(
            SERVER_BASE_URL + '/auth/refresh-token',
            {
              refreshToken: session?.refresh_token,
            }
          )

          if (status === 201) {
            console.log('interceptor:', data)

            await setSessionCookie({
              ...data,
              remember_me: session?.remember_me,
            })
          }
        }
      } else {
        // Handle sign out
        await axios.post(CLIENT_BASE_URL + '/auth/sign-out')
      }

      return instance(originalRequest)
    }

    return error?.response
  }
)

export default instance
