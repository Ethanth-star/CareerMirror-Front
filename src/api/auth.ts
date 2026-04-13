import request from '../utils/request'

export type UserRole = 'student' | 'admin'

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

export interface LoginRequest {
  username: string
  password: string
  role_type: UserRole
}

export interface LoginResponseData {
  token: string
  user_id: string
  name: string
  role: UserRole
}

export const loginAPI = (data: LoginRequest) =>
  request.post<ApiResponse<LoginResponseData>, ApiResponse<LoginResponseData>>(
    '/api/v1/auth/login',
    data,
  )
