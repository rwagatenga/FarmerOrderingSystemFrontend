import axios from 'axios'
import { forceLogout } from '@/lib/utils'
import { toast } from 'react-toastify'
import { AUTH_TOKEN_NAME, getCookie } from '@/lib/universalCookie'


export const api = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3005",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie(AUTH_TOKEN_NAME)}`
    }
  })

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // If the response status is 401, logout the user or perform any other necessary action
        toast.error('Session Expired')
        forceLogout()
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}
