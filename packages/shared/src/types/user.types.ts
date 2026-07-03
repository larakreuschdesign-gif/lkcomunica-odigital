export type Plan = 'FREE' | 'PRO' | 'ENTERPRISE'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: Plan
  monthlyQuota: number
  used: number
  resetQuotaAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserRegisterInput {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export interface UserLoginInput {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface JWTPayload {
  sub: string // user id
  email: string
  iat: number
  exp: number
  type: 'access' | 'refresh'
}
