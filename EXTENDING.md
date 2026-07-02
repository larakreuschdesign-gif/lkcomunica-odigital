# LK Analytics AI - Guia de Extensão

Como adicionar novas funcionalidades ao sistema.

## 🔄 Adicionar Nova Seção ao Relatório

### 1. Criar o Componente
```typescript
// src/components/MyNewSection.tsx
'use client'

import { motion } from 'framer-motion'

export default function MyNewSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Minha Nova Seção
      </h2>
      {/* Seu conteúdo aqui */}
    </motion.div>
  )
}
```

### 2. Importar no Relatório
```typescript
// src/app/reports/[id]/page.tsx
import MyNewSection from '@/components/MyNewSection'

export default function ReportView() {
  return (
    <div>
      {/* Outras seções... */}
      <MyNewSection />
    </div>
  )
}
```

## 📈 Adicionar Novo Gráfico

### Com Recharts
```typescript
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  // ...
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          fill="#E61E6E" 
          stroke="#B81253" 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
```

## 🤖 Estender Análise de IA

### Adicionar Novo Tipo de Análise
```typescript
// lib/ai-prompts.ts
export const ANALYSIS_PROMPTS = {
  strategic: `Você é um estrategista de marketing...`,
  technical: `Você é um analista de dados técnico...`,
  creative: `Você é um criativo focado em tendências...`,
}

// lib/ocr.ts
export async function generateCustomAnalysis(
  metrics: PlatformMetrics,
  analysisType: keyof typeof ANALYSIS_PROMPTS
): Promise<string> {
  const prompt = ANALYSIS_PROMPTS[analysisType]
  
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `${prompt}\n\nDados: ${JSON.stringify(metrics)}`,
      },
    ],
  })
  
  return response.content[0].type === 'text' ? response.content[0].text : ''
}
```

## 🗄️ Integrar Banco de Dados

### Supabase
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Operações
export async function saveReport(report: Report) {
  return await supabase.from('reports').insert([report])
}

export async function getReport(id: string) {
  return await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single()
}

export async function listReports(userId: string) {
  return await supabase
    .from('reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}
```

### Usar nos Componentes
```typescript
'use client'

import { useEffect, useState } from 'react'
import { getReport } from '@/lib/supabase'

export default function ReportView({ id }: { id: string }) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReport(id).then((data) => {
      setReport(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div>Carregando...</div>

  return <div>{/* Renderizar relatório */}</div>
}
```

## 🔐 Adicionar Autenticação

### NextAuth.js
```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub
      return session
    },
  },
}

export default NextAuth(authOptions)
```

### Proteger Rotas
```typescript
// src/app/reports/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ReportsPage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return <div>{/* Conteúdo protegido */}</div>
}
```

## 📤 Implementar Exportação

### PDF
```typescript
// lib/export.ts
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(
  elementId: string,
  filename: string
) {
  const element = document.getElementById(elementId)
  if (!element) return

  const canvas = await html2canvas(element)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const imgData = canvas.toDataURL('image/png')
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
  pdf.save(filename)
}
```

### PowerPoint
```typescript
// lib/pptx.ts
import PptxGenJS from 'pptxgenjs'

export function exportToPowerPoint(report: Report) {
  const prs = new PptxGenJS()

  // Slide 1: Título
  prs.addSlide().addText(report.clientName, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 1,
    fontSize: 44,
    bold: true,
    color: 'E61E6E',
  })

  // Slide 2: Resumo
  prs.addSlide().addText(report.analysis.executiveSummary, {
    x: 0.5,
    y: 1,
    w: 9,
    h: 5,
    fontSize: 14,
  })

  prs.save(`${report.clientName}-Report.pptx`)
}
```

## 🎯 Adicionar Notificações

### Toast Notifications
```typescript
// lib/toast.ts
import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info') => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    []
  )

  return { toasts, addToast }
}

// Usar em componentes
const { addToast } = useToast()
addToast('Relatório criado com sucesso!', 'success')
```

## 🔌 Integrar APIs Externas

### Instagram Business API
```typescript
// lib/instagram.ts
export async function getInstagramInsights(
  accessToken: string,
  instagramBusinessAccountId: string
) {
  const response = await fetch(
    `https://graph.instagram.com/${instagramBusinessAccountId}/insights?metrics=impressions,engagement,profile_views&access_token=${accessToken}`
  )

  return response.json()
}
```

### Facebook Graph API
```typescript
// lib/facebook.ts
export async function getFacebookPageInsights(
  pageId: string,
  accessToken: string
) {
  const response = await fetch(
    `https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_impressions&access_token=${accessToken}`
  )

  return response.json()
}
```

## 📊 Adicionar Novo Tipo de Métrica

### 1. Atualizar Tipos
```typescript
// lib/types.ts
export interface PlatformMetrics {
  // ... métricas existentes
  videoViews?: number
  videoDuration?: number
  videoEngagement?: number
  storiesViews?: number
  storiesReplies?: number
}
```

### 2. Atualizar OCR
```typescript
// lib/ocr.ts
const PLATFORM_PATTERNS = {
  instagram: {
    keywords: ['instagram', ...],
    metrics: [..., 'video_views', 'stories_views'],
  },
}
```

### 3. Atualizar KPI Cards
```typescript
// src/app/reports/[id]/page.tsx
<KPICard
  label="Visualizações de Vídeo"
  value={report.metrics.videoViews?.toLocaleString() || '0'}
  variation={12}
  icon={Video}
  index={4}
/>
```

## 🧪 Testing

### Unit Tests
```typescript
// __tests__/ocr.test.ts
import { extractMetricsFromImage } from '@/lib/ocr'

describe('OCR', () => {
  it('should extract metrics from image', async () => {
    const result = await extractMetricsFromImage(base64Image, 'test.png')
    expect(result).toHaveProperty('platform')
    expect(result).toHaveProperty('extractedData')
  })
})
```

### Component Tests
```typescript
// __tests__/KPICard.test.tsx
import { render, screen } from '@testing-library/react'
import KPICard from '@/components/KPICard'

describe('KPICard', () => {
  it('renders KPI data correctly', () => {
    render(
      <KPICard
        label="Test"
        value="1000"
        variation={10}
        icon={() => null}
        index={0}
      />
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
  })
})
```

## 📦 Deployment

### Vercel
```bash
# Conectar repositório
vercel link

# Deploy
vercel

# Deploy com variáveis de ambiente
vercel env add ANTHROPIC_API_KEY
vercel deploy --prod
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🎨 Customizar Design

### Tema Customizado
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#E61E6E',
        secondary: '#B81253',
        accent: '#F25C93',
      },
    },
  },
}
```

### Componente Reutilizável
```typescript
// src/components/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = 'rounded-xl font-semibold transition-all'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  )
}
```

---

**Dúvidas? Consulte a documentação oficial ou o README.md**
