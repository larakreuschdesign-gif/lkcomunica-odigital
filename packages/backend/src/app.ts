import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './utils/logger'

// Routes
import { authRouter } from './modules/auth/auth.routes'
import { scriptRouter } from './modules/scripts/script.routes'

const app = express()

// Middleware
app.use(cors({ origin: env.corsOrigin }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/scripts', scriptRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// Error handler (must be last)
app.use(errorHandler)

export default app
