export type ScriptStatus = 'DRAFT' | 'GENERATED' | 'EDITING' | 'FINALIZED' | 'ARCHIVED'
export type Platform = 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE' | 'LINKEDIN' | 'OTHER'

export interface Scene {
  id: string
  order: number
  title: string
  description: string
  duration: number // em segundos
  spokenText: string
  screenText: string
  environment: string
  expression: string
  cameraMovement: string
  emotions: string[]
  creativeDirection: string
  musicSuggestion: string
  notes: string
}

export interface ScriptContent {
  videoTitle: string
  hook: string
  strategicObjective: string
  scenes: Scene[]
  finalCTA: string
  observations: string
  estimatedDuration: number
  wordCount: number
  readingTime: number
}

export interface Script {
  id: string
  userId: string
  projectId?: string
  title: string
  status: ScriptStatus
  clientName: string
  objective: string
  platform: Platform
  contentType: string
  duration: number
  voiceTone: string
  targetAudience: string
  structure?: string
  cta?: string
  references: string[]
  ideas?: string
  script: ScriptContent
  wordCount: number
  readingTime: number
  shareToken?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateScriptInput {
  projectId?: string
  clientName: string
  objective: string
  platform: Platform
  contentType: string
  duration: number
  voiceTone: string
  targetAudience: string
  structure?: string
  cta?: string
  references: string[]
  ideas?: string
}

export interface UpdateScriptInput {
  title?: string
  status?: ScriptStatus
  clientName?: string
  objective?: string
  platform?: Platform
  contentType?: string
  duration?: number
  voiceTone?: string
  targetAudience?: string
  structure?: string
  cta?: string
  references?: string[]
  ideas?: string
  script?: ScriptContent
}

export interface ScriptListQuery {
  page?: number
  limit?: number
  status?: ScriptStatus
  platform?: Platform
  projectId?: string
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
}
