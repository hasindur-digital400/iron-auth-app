import axios from 'axios'

const SERVER_BASE_URL = 'https://api.escuelajs.co/api/v1/'
const CLIENT_BASE_URL = 'http://localhost:3000/api/'

export const serverInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

serverInstance.interceptors.response.use(
  (response) => response,
  (error) => error?.response
)

export const clientInstance = axios.create({
  baseURL: CLIENT_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

clientInstance.interceptors.response.use(
  (response) => response,
  (error) => error?.response
)
