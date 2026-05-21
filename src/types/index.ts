export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}

export type ContentPlatform = 'reels' | 'tiktok' | 'youtube' | 'linkedin' | 'instagram' | 'tiktok-shop'
export type ContentType = 'promotional' | 'educational' | 'entertainment' | 'testimonial' | 'tutorial' | 'behind-scenes'
export type ToneOfVoice = 'professional' | 'casual' | 'humorous' | 'inspirational' | 'playful' | 'authoritative'

export interface ProjectInput {
  clientName: string
  videoTitle: string
  objective: string
  platform: ContentPlatform[]
  contentType: ContentType
  duration: number
  toneOfVoice: ToneOfVoice
  targetAudience: string
  brandInfo?: string
  references?: string
  ctaText?: string
  mainIdeas?: string
  baseTexts?: string
  strategicNotes?: string
  logo?: string
  brandColors?: string[]
}

export interface Scene {
  number: number
  title: string
  duration: number
  description: string
  environment?: string
  expression?: string
  cameraMovement?: string
  voiceOver?: string
  onScreenText?: string
  emotions?: string
  creativeDirection?: string
  musicSuggestion?: string
}

export interface ScriptTemplate {
  title: string
  gancho: string
  strategicObjective: string
  scenes: Scene[]
  cta: string
  observations: string
  estimatedDuration: number
  wordCount: number
}

export interface Project {
  id: string
  userId: string
  clientName: string
  projectName: string
  status: 'draft' | 'in-progress' | 'completed' | 'archived'
  input: ProjectInput
  script: ScriptTemplate
  createdAt: string
  updatedAt: string
  thumbnail?: string
  category?: string
  folder?: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  platform: ContentPlatform[]
  duration: number
  structure: string
  hooks?: string[]
  ctaExamples?: string[]
  thumbnail?: string
}

export interface ScriptSuggestion {
  hookIdeas: string[]
  ctaSuggestions: string[]
  musicSuggestions: string[]
  cameraAngleSuggestions: string[]
  editingSuggestions: string[]
}
