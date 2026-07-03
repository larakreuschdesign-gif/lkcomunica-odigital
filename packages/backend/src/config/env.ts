import 'dotenv/config'

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value && !defaultValue) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value || ''
}

export const env = {
  // App
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: parseInt(getEnv('PORT', '3001'), 10),
  logLevel: getEnv('LOG_LEVEL', 'debug'),

  // Database
  databaseUrl: getEnv('DATABASE_URL'),

  // JWT
  jwtSecret: getEnv('JWT_SECRET'),
  jwtExpireIn: getEnv('JWT_EXPIRE_IN', '7d'),
  jwtRefreshSecret: getEnv('JWT_REFRESH_SECRET'),
  jwtRefreshExpireIn: getEnv('JWT_REFRESH_EXPIRE_IN', '30d'),

  // OpenAI
  openaiApiKey: getEnv('OPENAI_API_KEY'),

  // CORS
  corsOrigin: getEnv('CORS_ORIGIN', 'http://localhost:5173'),

  // File Upload
  maxFileSize: parseInt(getEnv('MAX_FILE_SIZE', '10485760'), 10),
  uploadDir: getEnv('UPLOAD_DIR', './uploads'),
}

export const isDev = env.nodeEnv === 'development'
export const isProd = env.nodeEnv === 'production'
