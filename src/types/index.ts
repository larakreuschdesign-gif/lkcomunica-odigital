export interface Scene {
  id: string
  duration: string
  objective: string
  environment: string
  description: string
  framing: string
  expression: string
  bodyMovement: string
  cameraMovement: string
  spokenText: string
  onScreenText: string
  emotion: string
  creativeDirection: string
  transition: string
}

export interface ScriptMetadata {
  brand?: string
  niche?: string
  platform: string
  objective: string
  tone: string
  format: string
  duration: string
  createdAt: Date
  updatedAt: Date
}

export interface Script {
  id: string
  title: string
  hook: string
  hookedOptimized?: string
  objective: string
  summary: string
  generalDescription: string
  scenes: Scene[]
  ctaFinal: string
  creativDirection: string
  musicSuggestion: string
  observations: string
  metadata: ScriptMetadata
}

export interface GenerateScriptRequest {
  hook: string
  brand?: string
  niche?: string
  product?: string
  audience?: string
  platform: string
  objective: string
  tone: string
  format: string
  duration: string
  cta?: string
  requiredInfo?: string
  restrictions?: string
  scenes?: string
}

export interface HookVariation {
  category: string
  hook: string
}

export interface Brand {
  id: string
  name: string
  niche: string
  tone?: string
  audience?: string
  products?: string[]
  diferencials?: string[]
  preferredWords?: string[]
  forbiddenWords?: string[]
  preferredCTAs?: string[]
}

export interface ScriptAnalysis {
  score: number
  hookStrength: number
  clarity: number
  retention: number
  naturalness: number
  shareability: number
  saveability: number
  ctaStrength: number
  easeOfFilming: number
  narrativeCoherence: number
  diagnosis: string
  recommendations: string[]
}
