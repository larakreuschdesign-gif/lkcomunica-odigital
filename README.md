# LK Analytics AI

Uma plataforma premium de Business Intelligence que transforma prints de métricas de redes sociais em relatórios completos e interativos automaticamente.

## 🎯 Visão Geral

LK Analytics AI é um software SaaS de nível empresarial que permite criar relatórios executivos profissionais em poucos cliques. A plataforma utiliza IA e OCR para extrair automaticamente dados de screenshots de redes sociais e gerar análises estratégicas.

## ✨ Recursos Principais

- **Upload Automático**: Arraste e solte dezenas de prints (PNG, JPG, PDF, Excel, CSV)
- **OCR Inteligente**: Extração automática de todas as métricas via IA
- **Análise Estratégica**: Geração automática de análises com insights profundos
- **Dashboards Interativos**: Gráficos modernos e responsivos com dados em tempo real
- **Relatórios Executivos**: Resumos estratégicos prontos para apresentação ao cliente
- **Insights Automáticos**: Descoberta de padrões e oportunidades nos dados
- **Plano de Ação**: Recomendações priorizadas baseadas em dados
- **Exportação Múltipla**: PDF, PowerPoint, Excel, Canva e compartilhamento de links

## 🏗️ Arquitetura

### Frontend
- **Next.js 15** com TypeScript
- **Tailwind CSS** para estilação premium
- **Recharts** para visualização de dados
- **Framer Motion** para animações suaves
- **Zustand** para gerenciamento de estado

### Backend
- **API Routes Next.js** para serverless functions
- **Claude AI (Anthropic)** para OCR e análises
- **Processamento de imagens** com base64

### Design
- **Identidade Visual LK Comunicação Digital**
- Paleta de cores: Rosa LK (#E61E6E), Creme (#F5EFEA)
- Fonte: Inter, SF Pro Display, Manrope
- Estilo: Clean, minimalista, premium

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App router (Next.js)
│   ├── page.tsx                 # Dashboard/Home
│   ├── create-report/page.tsx   # Criar novo relatório
│   ├── reports/
│   │   ├── page.tsx            # Lista de relatórios
│   │   └── [id]/page.tsx       # Visualizar relatório
│   ├── analytics/page.tsx       # Análises consolidadas
│   ├── layout.tsx              # Layout raiz
│   └── globals.css             # Estilos globais
│
├── components/                   # Componentes reutilizáveis
│   ├── Header.tsx              # Cabeçalho da aplicação
│   ├── Sidebar.tsx             # Menu lateral
│   ├── ReportCard.tsx          # Card de relatório
│   ├── KPICard.tsx             # Card de KPI
│   ├── ChartSection.tsx        # Seção de gráficos
│   ├── InsightsSection.tsx     # Seção de insights
│   └── ActionPlanSection.tsx   # Plano de ação
│
├── lib/                          # Utilitários e tipos
│   ├── types.ts                # Interfaces TypeScript
│   └── ocr.ts                  # Processamento de imagens com IA
│
└── api/                          # API Routes
    └── reports/route.ts        # Endpoint de upload de relatórios
```

## 🚀 Como Começar

### Instalação

```bash
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
ANTHROPIC_API_KEY=sua_chave_aqui
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm run start
```

## 🎨 Design System

### Cores
- **Principal**: Rosa LK (#E61E6E)
- **Secundária**: Rosa Profundo (#B81253)
- **Fundo**: Creme Claro (#F5EFEA)
- **Suporte**: Rosa Médio, Rosa Suave, Cinza Rosado

### Componentes
- **Cards**: Brancos, bordas arredondadas (20-28px), sombras suaves
- **Botões**: Estados hover, active com transições suaves
- **Gráficos**: Linhas arredondadas, paleta baseada na marca
- **Animações**: Transições discretas, fade-in suaves

## 📱 Páginas Principais

### 1. Dashboard (Home)
- Visão geral dos últimos relatórios
- Busca de clientes
- Filtros por mês e plataforma
- Botão destacado "Novo Relatório"

### 2. Criar Relatório
- **Passo 1**: Informações do cliente (nome, empresa, mês, ano, objetivo)
- **Passo 2**: Seleção de plataformas (Instagram, Facebook, LinkedIn)
- **Passo 3**: Upload com drag-and-drop
- Processamento automático com OCR

### 3. Visualizar Relatório
- **Resumo Executivo**: Análise profissional gerada pela IA
- **KPIs**: Cards com métricas principais
- **Gráficos**: Evolução, comparativos, distribuição
- **Insights**: Descobertas automáticas
- **Plano de Ação**: Recomendações priorizadas
- **IA Chat**: Perguntas ao modelo

### 4. Análises
- Visão consolidada de todos os clientes
- Estatísticas gerais
- Comparativas (em desenvolvimento)

## 🤖 IA e OCR

A plataforma utiliza Claude 3.5 Sonnet para:
- Extrair dados de screenshots via visão computacional
- Gerar análises estratégicas profundas
- Criar resumos executivos
- Identificar padrões e oportunidades
- Responder perguntas sobre os dados

## 📊 Exemplo de Dados Extraídos

```json
{
  "platform": "Instagram",
  "metrics": {
    "reach": 45230,
    "impressions": 128450,
    "followers": 5420,
    "engagement": 8.5,
    "likes": 10850,
    "comments": 1250,
    "shares": 890,
    "saves": 2340,
    "clicks": 3450
  },
  "confidence": 0.95
}
```

## 🔄 Fluxo de Uso

1. **Criar Relatório**: Cliente fornece informações básicas
2. **Upload**: Arrasta prints de todas as plataformas
3. **Processamento**: IA extrai dados automaticamente
4. **Análise**: Sistema gera análises e insights
5. **Visualização**: Dashboard interativo com gráficos
6. **Exportação**: Gera PDF, PPT, Excel ou link compartilhável

## 🛠️ Tecnologias

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Visualização**: Recharts, Framer Motion
- **IA**: Claude 3.5 Sonnet (Anthropic)
- **Processamento**: OCR com visão de IA
- **Banco de Dados**: (Preparado para Supabase/Firebase)
- **Deploy**: Vercel

## 📈 Roadmap

- [ ] Integração com Facebook Graph API
- [ ] Integração com Instagram Insights API
- [ ] Integração com LinkedIn API
- [ ] Banco de dados persistente
- [ ] Autenticação e autorização
- [ ] Exportação em tempo real
- [ ] Agendamento de relatórios
- [ ] Comparativos benchmarking
- [ ] White-label customization
- [ ] Mobile app

## 💡 Recursos Diferenciais

✅ **Premium Design**: Software SaaS de nível empresarial  
✅ **OCR Automático**: Extração de dados sem digitação manual  
✅ **Análise de IA**: Insights estratégicos, não apenas números  
✅ **Relatórios Executivos**: Prontos para apresentação ao cliente  
✅ **Interativo**: Gráficos animados e responsivos  
✅ **Múltiplas Plataformas**: Instagram, Facebook, LinkedIn integrados  
✅ **Exportação Múltipla**: PDF, PowerPoint, Excel, Canva  
✅ **Interface Intuitiva**: Sem necessidade de treinamento  

## 📝 Licença

Proprietário - LK Comunicação Digital

## 👤 Desenvolvido por

**Lara Kreusch Design** - Product Designer Sênior, UX Designer e Desenvolvedor Full Stack
