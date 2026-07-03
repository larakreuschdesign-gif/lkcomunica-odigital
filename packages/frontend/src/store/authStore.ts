import { create } from 'zustand'
import { User } from '@roteirista/shared'
import { authService } from '@/services/auth.service'

interface AuthStore {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean

  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void

  register: (email: string, name: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: authService.getStoredUser(),
  isLoading: false,
  isAuthenticated: authService.isAuthenticated(),

  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
  },

  setLoading: (loading) => {
    set({ isLoading: loading })
  },

  register: async (email: string, name: string, password: string) => {
    set({ isLoading: true })
    try {
      const result = await authService.register({
        email,
        name,
        password,
        confirmPassword: password,
      })
      set({ user: result.user, isAuthenticated: true })
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const result = await authService.login({ email, password })
      set({ user: result.user, isAuthenticated: true })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    authService.logout()
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: () => {
    const user = authService.getStoredUser()
    const token = authService.getStoredToken()
    set({
      user,
      isAuthenticated: !!token && !!user,
    })
  },
}))
