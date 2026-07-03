import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { UserRegisterInput, UserLoginInput, AuthResponse } from '@roteirista/shared'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../middleware/auth'
import { AppError } from '../../middleware/errorHandler'
import { logger } from '../../utils/logger'

const prisma = new PrismaClient()

export class AuthService {
  async register(input: UserRegisterInput): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    })

    if (existingUser) {
      throw new AppError(400, 'Usuário com este email já existe')
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(input.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        passwordHash,
      },
    })

    logger.info(`New user registered: ${user.email}`)

    // Generate tokens
    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || undefined,
        plan: user.plan as any,
        monthlyQuota: user.monthlyQuota,
        used: user.used,
        resetQuotaAt: user.resetQuotaAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    }
  }

  async login(input: UserLoginInput): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    })

    if (!user) {
      throw new AppError(401, 'Email ou senha inválidos')
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(
      input.password,
      user.passwordHash
    )

    if (!isPasswordValid) {
      throw new AppError(401, 'Email ou senha inválidos')
    }

    logger.info(`User logged in: ${user.email}`)

    // Generate tokens
    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || undefined,
        plan: user.plan as any,
        monthlyQuota: user.monthlyQuota,
        used: user.used,
        resetQuotaAt: user.resetQuotaAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const userId = verifyRefreshToken(refreshToken)

    if (!userId) {
      throw new AppError(401, 'Refresh token inválido')
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError(401, 'Usuário não encontrado')
    }

    const accessToken = generateAccessToken(user.id)
    const newRefreshToken = generateRefreshToken(user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || undefined,
        plan: user.plan as any,
        monthlyQuota: user.monthlyQuota,
        used: user.used,
        resetQuotaAt: user.resetQuotaAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    }
  }

  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar || undefined,
      plan: user.plan as any,
      monthlyQuota: user.monthlyQuota,
      used: user.used,
      resetQuotaAt: user.resetQuotaAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

export const authService = new AuthService()
