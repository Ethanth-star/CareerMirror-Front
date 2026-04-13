import { defineStore } from 'pinia'
import { loginAPI, type LoginRequest, type LoginResponseData, type UserRole } from '../api/auth'
import { AUTH_STORAGE_KEYS } from '../constants/storage'

export interface UserInfo {
  user_id: string
  name: string
}

function readUserInfo(): UserInfo | null {
  const rawValue = localStorage.getItem(AUTH_STORAGE_KEYS.userInfo)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as UserInfo
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEYS.userInfo)
    return null
  }
}

function readRole(): UserRole | '' {
  const rawRole = localStorage.getItem(AUTH_STORAGE_KEYS.role)
  return rawRole === 'student' || rawRole === 'admin' ? rawRole : ''
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(AUTH_STORAGE_KEYS.token) || '',
    userInfo: readUserInfo(),
    role: readRole(),
  }),

  actions: {
    async loginAction(payload: LoginRequest) {
      const response = await loginAPI(payload)
      const loginData = response.data

      this.token = loginData.token
      this.userInfo = {
        user_id: loginData.user_id,
        name: loginData.name,
      }
      this.role = loginData.role

      localStorage.setItem(AUTH_STORAGE_KEYS.token, loginData.token)
      localStorage.setItem(AUTH_STORAGE_KEYS.userInfo, JSON.stringify(this.userInfo))
      localStorage.setItem(AUTH_STORAGE_KEYS.role, loginData.role)

      return loginData
    },

    logoutAction() {
      this.token = ''
      this.userInfo = null
      this.role = ''

      localStorage.removeItem(AUTH_STORAGE_KEYS.token)
      localStorage.removeItem(AUTH_STORAGE_KEYS.userInfo)
      localStorage.removeItem(AUTH_STORAGE_KEYS.role)

      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    },
  },
})

export const roleHomePathMap: Record<UserRole, string> = {
  student: '/student/home',
  admin: '/admin/dashboard',
}

export function normalizeHomePathByRole(role: UserRole | '') {
  return role === 'admin' ? roleHomePathMap.admin : roleHomePathMap.student
}
