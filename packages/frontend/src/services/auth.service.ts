import api from './api'
import { UserRegisterInput, UserLoginInput } from '@roteirista/shared'

export const authService = {
  register: async (input: UserRegisterInput) => {
    const response = await api.post('/auth/register', input)
    const { user, tokens } = response.data
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    localStorage.setItem('user', JSON.stringify(user))
    return { user, tokens }
  },

  login: async (input: UserLoginInput) => {
    const response = await api.post('/auth/login', input)
    const { user, tokens } = response.data
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    localStorage.setItem('user', JSON.stringify(user))
    return { user, tokens }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  getStoredToken: () => {
    return localStorage.getItem('accessToken')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken')
  },
}
