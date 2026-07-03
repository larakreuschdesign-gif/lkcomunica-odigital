import { ScriptContent } from './script.types'

export interface Template {
  id: string
  userId?: string // null for global templates
  name: string
  category: string
  description?: string
  thumbnail?: string
  content: ScriptContent
  promptGuide?: string
  isPublic: boolean
  createdAt: Date
}

export interface CreateTemplateInput {
  name: string
  category: string
  description?: string
  thumbnail?: string
  content: ScriptContent
  promptGuide?: string
  isPublic?: boolean
}

export interface TemplateListQuery {
  category?: string
  search?: string
  limit?: number
  offset?: number
}
