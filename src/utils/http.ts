import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth'
import { toast } from 'react-toastify'
import { ErrorRespone } from 'src/types/utils.type'

const API = 'https://nckh.hareta.online/'
const VERSION = 'v1/'
export const BASE_API_URL = API.concat(VERSION)

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = 'Bearer ' + this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login') {
          const accessToken = response.data.data.token
          if (accessToken !== undefined) {
            this.accessToken = accessToken
            setAccessTokenToLS(accessToken)
          }
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.BadRequest) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // console.log(error)
        if ((error.response?.data as ErrorRespone).status_code === HttpStatusCode.InternalServerError) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
