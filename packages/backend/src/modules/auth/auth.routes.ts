import { Router } from 'express'
import { authController } from './auth.controller'
import { authenticateToken } from '../../middleware/auth'

export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/refresh-token', authController.refreshToken)
authRouter.get('/me', authenticateToken, authController.me)
