import axios, { type AxiosError } from 'axios'
import { AUTH_STORAGE_KEYS } from '../constants/storage'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_STORAGE_KEYS.token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

request.interceptors.response.use(
  (response) => {
    const responseData = response.data

    if (
      typeof responseData === 'object' &&
      responseData !== null &&
      'code' in responseData &&
      responseData.code !== 200
    ) {
      return Promise.reject(new Error((responseData as { msg?: string }).msg || '请求失败'))
    }

    return responseData
  },
  (error: AxiosError<{ msg?: string }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEYS.token)
      localStorage.removeItem(AUTH_STORAGE_KEYS.userInfo)
      localStorage.removeItem(AUTH_STORAGE_KEYS.role)

      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }

    const networkHint =
      error.code === 'ERR_NETWORK'
        ? '无法连接到后端服务，请确认 http://localhost:8000 已启动。'
        : null

    return Promise.reject(
      new Error(error.response?.data?.msg || networkHint || error.message || '网络异常，请稍后重试'),
    )
  },
)

export default request
