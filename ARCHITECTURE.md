# LK Analytics AI - Arquitetura do Sistema

## 🏗️ Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐ │
│  │   Dashboard     │  │  Criar          │  │  Visualizar      │ │
│  │   (Home)        │  │  Relatório      │  │  Relatório       │ │
│  │                 │  │  (Multi-step)   │  │  (com gráficos)  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘ │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │   Análises      │  │   Relatórios    │                       │
│  │   Consolidadas  │  │   (Listagem)    │                       │
│  └─────────────────┘  └─────────────────┘                       │
│                                                                   │
│  Componentes Reutilizáveis:                                      │
│  • Header, Sidebar, KPICard, ReportCard                          │
│  • ChartSection, InsightsSection, ActionPlanSection              │
└─────────────────────────────────────────────────────────────────┘
              ↓          ↓          ↓          ↓
         TypeScript  Tailwind   Framer    Recharts
         React 18    CSS 3      Motion    (Charts)
         Next.js 15

┌─────────────────────────────────────────────────────────────────┐
│                   API ROUTES (Next.js)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  POST /api/reports          - Upload de arquivos                 │
│         ↓ Processa formData e arquivos                           │
│         ↓ Chama OCR para cada imagem                             │
│         ↓ Retorna métricas extraídas                             │
│                                                                   │
│  POST /api/reports/analyze  - Análise com IA (futuro)            │
│  GET  /api/reports/:id      - Buscar relatório (futuro)          │
│  PUT  /api/reports/:id      - Atualizar relatório (futuro)       │
│  DELETE /api/reports/:id    - Deletar relatório (futuro)         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SERVIÇOS & UTILITÁRIOS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  lib/ocr.ts                                                       │
│  ├─ extractMetricsFromImage()  - OCR via Claude Vision           │
│  ├─ generateAIAnalysis()       - Análise estratégica             │
│  └─ generateExecutiveSummary() - Resumo executivo                │
│                                                                   │
│  lib/types.ts                                                     │
│  ├─ Report, Platform, Metrics                                    │
│  ├─ AnalysisData, Insight, ActionItem                            │
│  └─ OcrResult, UploadedFile                                      │
│                                                                   │
│  lib/database.ts (futuro)                                         │
│  ├─ saveReport()                                                 │
│  ├─ getReport()                                                  │
│  ├─ listReports()                                                │
│  └─ deleteReport()                                               │
│                                                                   │
│  lib/storage.ts (futuro)                                         │
│  ├─ uploadFile()                                                 │
│  ├─ getFile()                                                    │
│  └─ deleteFile()                                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────────┐
│               INTEGRAÇÕES EXTERNAS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐                                            │
│  │   Claude AI      │                                            │
│  │  (Anthropic)     │  - Vision/OCR                              │
│  │                  │  - Text Analysis                           │
│  │  Model:          │  - Insight Generation                      │
│  │  claude-3.5      │                                            │
│  │  -sonnet         │                                            │
│  └──────────────────┘                                            │
│           ↓                                                       │
│  ┌──────────────────────────────────────────┐                   │
│  │         BASE64 IMAGE DATA                │                   │
│  │  (PNG, JPG, PDF converted)               │                   │
│  └──────────────────────────────────────────┘                   │
│                                                                   │
│  Bancos de Dados (Futuro)                                        │
│  ├─ Supabase PostgreSQL - Relatórios, Usuários                  │
│  ├─ S3/GCS - Armazenamento de arquivos                          │
│  └─ Redis - Cache e sessões                                     │
│                                                                   │
│  APIs Reais (Futuro)                                             │
│  ├─ Instagram Business API                                      │
│  ├─ Facebook Graph API                                          │
│  └─ LinkedIn API                                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Fluxo de Dados

```
USUÁRIO
  ↓
[Dashboard]
  ├─ Visualiza relatórios anteriores
  ├─ Pesquisa por cliente
  └─ Clica "Novo Relatório"
  ↓
[Criar Relatório - Passo 1]
  ├─ Insere: Nome, Empresa, Mês, Ano, Objetivo
  └─ Clica "Próximo"
  ↓
[Criar Relatório - Passo 2]
  ├─ Seleciona plataformas (Instagram, FB, LinkedIn)
  └─ Clica "Próximo"
  ↓
[Criar Relatório - Passo 3]
  ├─ Arrasta arquivos
  └─ Clica "Gerar Relatório"
  ↓
[FRONTEND]
  ├─ Converte arquivos em base64
  └─ Envia para API
  ↓
[API: POST /api/reports]
  ├─ Recebe formData
  ├─ Para cada arquivo:
  │  ├─ Converte para base64
  │  ├─ Envia para Claude Vision (OCR)
  │  ├─ Extrai métricas
  │  └─ Armazena resultado
  └─ Retorna JSON com métricas
  ↓
[FRONTEND - Processamento]
  ├─ Combina dados de múltiplas imagens
  ├─ Agrupa por plataforma
  ├─ Calcula comparações
  └─ Chamadas paralelas para:
      ├─ generateAIAnalysis()
      ├─ generateExecutiveSummary()
      ├─ extractInsights()
      └─ generateActionPlan()
  ↓
[FRONTEND - Renderização]
  ├─ Header com informações do cliente
  ├─ Resumo Executivo (IA)
  ├─ KPI Cards (com trends)
  ├─ Gráficos Interativos (Recharts)
  ├─ Insights (Descobertas automáticas)
  ├─ Análise de IA (Perguntas/respostas)
  └─ Plano de Ação (Recomendações)
  ↓
[Usuário]
  ├─ Visualiza relatório completo
  ├─ Interage com gráficos
  ├─ Faz perguntas para IA
  └─ Exporta (PDF, PPT, Excel) ou compartilha
```

## 🔄 Componentes Principais

### Frontend
```
┌── src/app/
│   ├── page.tsx (Dashboard)
│   ├── create-report/ (Wizard de criação)
│   ├── reports/
│   │   ├── page.tsx (Lista)
│   │   └── [id]/ (Visualização)
│   ├── analytics/ (Consolidação)
│   ├── layout.tsx (Layout raiz)
│   └── globals.css (Estilos globais)
│
├── src/components/ (Componentes reutilizáveis)
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── ReportCard.tsx
│   ├── KPICard.tsx
│   ├── ChartSection.tsx
│   ├── InsightsSection.tsx
│   └── ActionPlanSection.tsx
│
├── src/lib/ (Lógica compartilhada)
│   ├── types.ts (TypeScript interfaces)
│   ├── ocr.ts (OCR e análises IA)
│   ├── database.ts (futuro)
│   ├── storage.ts (futuro)
│   └── auth.ts (futuro)
│
└── src/api/ (API routes)
    └── reports/route.ts (Upload e processamento)
```

## 🎨 Design System

```
PALETA DE CORES
├─ Rosa LK (#E61E6E) - Primária, CTAs, destaque
├─ Rosa Profundo (#B81253) - Hover, secundário
├─ Creme (#F5EFEA) - Fundo, cards
├─ Rosa Médio (#F25C93) - Accent
├─ Rosa Suave (#F88AFC) - Background suave
└─ Cinza Rosado (#D8CFCB) - Borders, subtle

TIPOGRAFIA
├─ Heading 1 (4xl, bold) - Títulos principais
├─ Heading 2 (2xl, bold) - Seções
├─ Heading 3 (lg, bold) - Cards
├─ Body (base, regular) - Conteúdo
└─ Small (sm, regular) - Labels, hints

ESPAÇAMENTO
├─ Padding: 2rem, 1.5rem, 1rem, 0.75rem
├─ Gap: 2rem, 1.5rem, 1rem, 0.5rem
└─ Border-radius: 28px (cards), 20px (elementos)

SOMBRAS
├─ soft: 0 2px 8px rgba(0,0,0,0.08)
├─ soft-md: 0 4px 12px rgba(0,0,0,0.1)
└─ soft-lg: 0 8px 24px rgba(0,0,0,0.12)

ANIMAÇÕES
├─ Fade-in: 300ms ease-out
├─ Slide-in: 300ms ease-out
└─ Hover: 200ms transition
```

## 🔐 Segurança

```
CAMADAS DE SEGURANÇA

1. Frontend
   ├─ Validação de input
   ├─ Sanitização de dados
   └─ HTTPS only

2. API
   ├─ Rate limiting (futuro)
   ├─ Autenticação JWT (futuro)
   └─ Validação de uploads

3. Backend
   ├─ Verificação de tipos
   ├─ Tratamento de erros
   └─ Logging de segurança

4. Dados
   ├─ Criptografia em trânsito (HTTPS)
   ├─ Criptografia em repouso (futuro)
   └─ Isolamento de dados por usuário (futuro)
```

## 📈 Escalabilidade

```
ESTRATÉGIAS DE ESCALABILIDADE

1. Frontend
   ├─ Code splitting por rota
   ├─ Image optimization
   ├─ Lazy loading de componentes
   └─ ISR (Incremental Static Regeneration)

2. Backend
   ├─ Serverless Functions
   ├─ Caching de resultados de OCR
   ├─ Processamento assíncrono
   └─ Queue para processamento em massa

3. Dados
   ├─ Índices otimizados
   ├─ Paginação
   ├─ Cache distribuído
   └─ CDN para assets estáticos

4. IA
   ├─ Batching de requisições
   ├─ Cache de análises similares
   └─ Rate limiting inteligente
```

## 📱 Responsividade

```
BREAKPOINTS
├─ Mobile: 0 - 640px (único coluna)
├─ Tablet: 641px - 1024px (2 colunas)
├─ Desktop: 1025px+ (3+ colunas)
└─ Wide: 1280px+ (layout completo)

AJUSTES
├─ Sidebar: colapsável em tablet/mobile
├─ Header: Menu hambúrguer em mobile
├─ Gráficos: Responsive com ResponsiveContainer
├─ Tabelas: Scroll horizontal em mobile
└─ Cards: Grid dinâmico
```

## 🚀 Deployment

```
AMBIENTES

Development
└─ npm run dev
   └─ Localhost:3000

Staging (Futuro)
├─ Vercel Preview Deployment
├─ Staging database
└─ Testes pré-produção

Production
├─ Vercel
├─ Production database
├─ CDN global
└─ CI/CD automático

VARIÁVEIS DE AMBIENTE
├─ NEXT_PUBLIC_* (Frontend)
├─ ANTHROPIC_API_KEY (Backend)
├─ DATABASE_URL (Backend)
├─ STORAGE_BUCKET (Backend)
└─ JWT_SECRET (Backend)
```

## 🔗 Dependências Externas

```
PRODUÇÃO
├─ @anthropic-ai/sdk - API de IA
├─ react, react-dom - Framework UI
├─ next - Framework full-stack
├─ tailwindcss - Estilização
├─ recharts - Gráficos
├─ framer-motion - Animações
├─ zustand - Estado global (futuro)
├─ next-auth - Autenticação (futuro)
└─ date-fns - Datas

DESENVOLVIMENTO
├─ typescript - Type safety
├─ eslint - Linting
├─ prettier - Formatação
└─ tailwindcss - Estilização
```

---

**Esta arquitetura é escalável, type-safe e preparada para crescimento.**
