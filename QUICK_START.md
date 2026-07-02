# LK Analytics AI - Quick Start Guide

Guia rápido para começar a usar o LK Analytics AI em 5 minutos.

## ⚡ 1. Instalação (2 minutos)

```bash
# Clone o repositório
git clone https://github.com/larakreuschdesign-gif/lkcomunica-odigital.git
cd lkcomunica-odigital

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# ⚠️ IMPORTANTE: Adicione sua chave da API Anthropic
# Edite .env.local:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

## 🚀 2. Rodando o Desenvolvimento (1 minuto)

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📋 3. Primeiros Passos

### Criar um Relatório
1. Clique em **"Novo Relatório"** na página inicial
2. Preencha os dados:
   - **Nome do Cliente**: Ex: "Tech Startup XYZ"
   - **Empresa**: Ex: "Tech Startup"
   - **Mês**: Ex: "Junho"
   - **Ano**: Ex: "2024"
   - **Objetivo**: (opcional) Sua estratégia
3. Clique "Próximo"

### Selecionar Plataformas
1. Escolha uma ou mais plataformas:
   - ✅ Instagram
   - ✅ Facebook
   - ✅ LinkedIn
2. Clique "Próximo"

### Upload de Arquivos
1. Arraste seus prints de métricas para a área
2. Ou clique para selecionar arquivos
3. A plataforma aceita:
   - 📸 PNG, JPG
   - 📄 PDF
   - 📊 Excel, CSV
4. Clique "Gerar Relatório"

### Visualizar Relatório
Você verá:
- **Resumo Executivo** (gerado por IA)
- **KPIs** com indicadores de crescimento
- **Gráficos Interativos** (passe o mouse para detalhes)
- **Insights Automáticos** (descobertas)
- **Plano de Ação** (recomendações priorizadas)

## 🎨 4. Estrutura do Projeto

```
src/
├── app/              # Páginas principais
│   ├── page.tsx     # Dashboard
│   ├── create-report/page.tsx    # Criar relatório
│   ├── reports/[id]/page.tsx     # Ver relatório
│   ├── analytics/page.tsx        # Análises
│   └── globals.css  # Estilos globais
│
├── components/       # Componentes React
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── KPICard.tsx
│   ├── ChartSection.tsx
│   ├── InsightsSection.tsx
│   └── ActionPlanSection.tsx
│
└── lib/             # Lógica compartilhada
    ├── types.ts     # TypeScript interfaces
    ├── ocr.ts       # Processamento com IA
    └── database.ts  # (futuro)
```

## 🔑 5. Variáveis de Ambiente

```env
# Obrigatória
ANTHROPIC_API_KEY=sua_chave_aqui

# Opcional (com valores padrão)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Banco de dados (futuro)
DATABASE_URL=
STORAGE_BUCKET=
JWT_SECRET=
```

**Obter Chave Anthropic:**
1. Acesse [console.anthropic.com](https://console.anthropic.com)
2. Crie uma conta ou faça login
3. Vá para "API Keys"
4. Crie uma nova chave
5. Copie e cole em `.env.local`

## 📝 6. Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor local

# Build e Produção
npm run build            # Compila o projeto
npm start                # Roda versão produção
npm run lint             # Verifica código

# Type checking
npm run type-check       # Verifica tipos TypeScript

# Limpeza
rm -rf .next node_modules   # Remove cache
npm install                 # Reinstala dependências
```

## 🎯 7. Principais Recursos

### ✨ Funcionalidades Ativas
- ✅ Dashboard com listagem de relatórios
- ✅ Criação de relatório em 3 passos
- ✅ Upload automático de arquivos
- ✅ Análise de IA com OCR
- ✅ Visualização interativa com gráficos
- ✅ Insights estratégicos
- ✅ Plano de ação recomendado

### 🔜 Em Desenvolvimento
- 🔐 Autenticação (NextAuth.js)
- 💾 Banco de dados (Supabase)
- 📤 Exportação (PDF, PPT, Excel)
- 📱 App mobile
- 🌐 Integração com APIs reais

## 🐛 Troubleshooting

### "Failed to connect to Anthropic API"
```
❌ Erro: Sem chave da API
✅ Solução: Adicione ANTHROPIC_API_KEY em .env.local
```

### "Port 3000 is already in use"
```
❌ Erro: Outra aplicação usando porta 3000
✅ Solução: npm run dev -- -p 3001
```

### "Module not found"
```
❌ Erro: Dependências não instaladas
✅ Solução: rm -rf node_modules && npm install
```

### "Componente não renderiza"
```
❌ Erro: Use 'use client' para componentes interativos
✅ Solução: Adicione 'use client' no topo do arquivo
```

## 🎨 8. Customizar Cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  lk: {
    cream: '#F5EFEA',      // Fundo
    pink: '#E61E6E',       // Principal
    'pink-dark': '#B81253', // Hover
    'pink-medium': '#F25C93', // Accent
    'pink-soft': '#F88AFC',
    'gray-rose': '#D8CFCB',
  }
}
```

## 📚 9. Próximas Etapas

### Para Aprender
1. Leia `ARCHITECTURE.md` para entender a estrutura
2. Leia `EXTENDING.md` para adicionar features
3. Consulte `IMPLEMENTATION_GUIDE.md` para integrar BD

### Para Expandir
1. Implemente autenticação
2. Configure banco de dados
3. Integre APIs reais (Instagram, Facebook, LinkedIn)
4. Adicione exportação em PDF/PPT
5. Deploy para produção

### Recursos Úteis
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org)
- [Claude API](https://docs.anthropic.com)
- [Framer Motion](https://www.framer.com/motion)

## 🆘 Precisa de Ajuda?

1. **Consulte a documentação**: README.md, ARCHITECTURE.md, EXTENDING.md
2. **Verifique exemplos**: Código está bem comentado
3. **Issues**: [GitHub Issues](https://github.com/larakreuschdesign-gif/lkcomunica-odigital/issues)

## 📊 Exemplo de Dados

A plataforma extrai automaticamente:

```json
{
  "platform": "Instagram",
  "reach": 45230,
  "impressions": 128450,
  "engagement": 8.5,
  "followers": 5420,
  "likes": 10850,
  "comments": 1250,
  "shares": 890,
  "saves": 2340
}
```

## 🚢 Deploy em Produção

### Vercel (Recomendado)
```bash
# Conectar ao Vercel
npm install -g vercel
vercel login
vercel link

# Deploy
vercel

# Production
vercel deploy --prod
```

### Seu Servidor
```bash
# Build
npm run build

# Start
npm start
```

---

**Pronto para começar? Execute `npm run dev` agora! 🎉**

Para suporte detalhado, veja [README.md](./README.md)
