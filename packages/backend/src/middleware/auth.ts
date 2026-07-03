import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { logger } from '../utils/logger'

export interface AuthRequest extends Request {
  userId?: string
  token?: string
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      logger.warn('Missing authentication token')
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    jwt.verify(token, env.jwtSecret, (err, user: any) => {
      if (err) {
        logger.warn('Invalid token:', err.message)
        return res.status(403).json({ error: 'Token inválido' })
      }

      req.userId = user.sub
      req.token = token
      next()
    })
  } catch (error) {
    logger.error('Authentication error:', error)
    res.status(500).json({ error: 'Erro na autenticação' })
  }
}

export const optionalAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      jwt.verify(token, env.jwtSecret, (err, user: any) => {
        if (!err) {
          req.userId = user.sub
          req.token = token
        }
      })
    }

    next()
  } catch (error) {
    logger.error('Optional auth error:', error)
    next()
  }
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { sub: userId, type: 'access' },
    env.jwtSecret,
    { expiresIn: env.jwtExpireIn }
  )
}

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { sub: userId, type: 'refresh' },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpireIn }
  )
}

export const verifyRefreshToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, env.jwtRefreshSecret) as any
    return decoded.sub
  } catch {
    return null
  }
}
