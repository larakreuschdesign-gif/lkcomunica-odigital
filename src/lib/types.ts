export interface Report {
  id: string
  clientName: string
  company?: string
  month: string
  year: string
  objective?: string
  platforms: Platform[]
  metrics: Metrics
  analysis: AnalysisData
  createdAt: Date
  updatedAt: Date
}

export interface Platform {
  name: 'Instagram' | 'Facebook' | 'LinkedIn'
  metrics: PlatformMetrics
}

export interface PlatformMetrics {
  reach: number
  impressions: number
  followers: number
  engagement: number
  likes: number
  comments: number
  shares: number
  saves: number
  clicks: number
  profileVisits: number
  accountsReached: number
  accountsEngaged: number
}

export interface Metrics {
  totalReach: number
  totalImpressions: number
  totalEngagement: number
  newFollowers: number
  totalLikes: number
  totalComments: number
  totalShares: number
  totalSaves: number
  growthRate: number
  previousPeriodComparison: number
}

export interface AnalysisData {
  executiveSummary: string
  insights: Insight[]
  actionPlan: ActionItem[]
  aiAnalysis: string
}

export interface Insight {
  title: string
  description: string
  metric: string
}

export interface ActionItem {
  problem: string
  impact: 'Alto' | 'Médio' | 'Baixo'
  recommendation: string
  priority: 'Alta' | 'Média' | 'Baixa'
  deadline: string
}

export interface OcrResult {
  platform: 'Instagram' | 'Facebook' | 'LinkedIn'
  type: 'insights' | 'analytics' | 'posts'
  extractedData: PlatformMetrics
  confidence: number
}

export interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  ocrResult?: OcrResult
}
