import { Response } from 'express'
import { AuthRequest, authenticateToken } from '../../middleware/auth'
import { registerSchema, loginSchema } from '@roteirista/shared'
import { authService } from './auth.service'
import { asyncHandler } from '../../middleware/errorHandler'

export class AuthController {
  register = asyncHandler(async (req: AuthRequest, res: Response) => {
    const input = registerSchema.parse(req.body)
    const result = await authService.register(input)
    res.status(201).json(result)
  })

  login = asyncHandler(async (req: AuthRequest, res: Response) => {
    const input = loginSchema.parse(req.body)
    const result = await authService.login(input)
    res.status(200).json(result)
  })

  refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token obrigatório' })
    }
    const result = await authService.refreshToken(refreshToken)
    res.status(200).json(result)
  })

  me = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Não autenticado' })
    }
    const user = await authService.getUser(req.userId)
    res.status(200).json(user)
  })
}

export const authController = new AuthController()
