# Roteirista.IA

Sistema SaaS inteligente para geração automatizada de roteiros profissionais para vídeos usando IA.

## 🚀 Features

- ✨ **Geração com IA**: Cria roteiros estruturados automaticamente com inteligência artificial
- 📊 **Dashboard Completo**: Visualize, edite e organize seus roteiros
- 📥 **Exportação**: Exporte em PDF ou DOCX com design profissional
- 🎥 **Múltiplas Plataformas**: TikTok, Instagram, YouTube, LinkedIn
- 🔄 **Compartilhamento**: Compartilhe roteiros com sua equipe
- 📱 **Interface Moderna**: Design responsivo e intuitivo

## 🏗️ Arquitetura

Este é um **monorepo** com `pnpm workspaces` contendo:

### Packages

- **`packages/backend`** - API Node.js com Express
- **`packages/frontend`** - React + Vite
- **`packages/shared`** - Tipos e schemas compartilhados

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Zustand (state management)
- React Hook Form
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- OpenAI API
- JWT Authentication

### Database
- PostgreSQL

## 📋 Requisitos

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- PostgreSQL 14+
- OpenAI API Key

## 🚀 Getting Started

### 1. Instalação de Dependências

```bash
pnpm install
```

### 2. Configuração do Backend

```bash
cd packages/backend

# Copiar arquivo de ambiente
cp .env.example .env.local

# Preencher as variáveis:
# - DATABASE_URL=postgresql://user:password@localhost:5432/roteirista
# - OPENAI_API_KEY=sk-...
# - JWT_SECRET=seu-secret-aqui
```

### 3. Setup do Banco de Dados

```bash
pnpm db:push
```

### 4. Configuração do Frontend

```bash
cd packages/frontend

# Copiar arquivo de ambiente
cp .env.example .env.local
```

### 5. Executar em Desenvolvimento

**Terminal 1 - Backend:**
```bash
pnpm backend
```

**Terminal 2 - Frontend:**
```bash
pnpm frontend
```

Acesse:
- Frontend: http://localhost:5173
- API: http://localhost:3001
- Docs: http://localhost:3001/health

## 📁 Estrutura de Pastas

```
lkcomunica-odigital/
├── packages/
│   ├── backend/          # API REST Node.js
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── middleware/
│   │   │   ├── modules/  # auth, scripts, ai, etc
│   │   │   └── utils/
│   │   ├── prisma/       # ORM Schema
│   │   └── package.json
│   ├── frontend/         # React SPA
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   └── styles/
│   │   └── package.json
│   └── shared/           # Tipos compartilhados
│       ├── src/
│       │   ├── types/
│       │   ├── schemas/
│       │   └── constants/
│       └── package.json
├── pnpm-workspace.yaml
└── package.json
```

## 🔐 Autenticação

O sistema usa **JWT** para autenticação:

1. Usuário se registra/loga
2. Backend retorna `accessToken` + `refreshToken`
3. Frontend armazena tokens no localStorage
4. Todos os requests incluem token no header: `Authorization: Bearer <token>`
5. Tokens expiram automaticamente e são renovados

## 🚀 API Endpoints

### Auth
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/refresh-token` - Renovar token
- `GET /api/auth/me` - Dados do usuário

### Scripts
- `POST /api/scripts` - Criar roteiro
- `GET /api/scripts` - Listar roteiros
- `GET /api/scripts/:id` - Obter roteiro
- `PATCH /api/scripts/:id` - Atualizar roteiro
- `DELETE /api/scripts/:id` - Deletar roteiro
- `POST /api/scripts/:id/generate` - Gerar com IA
- `POST /api/scripts/:id/share-token` - Gerar link compartilhado

## 🤖 Integração com IA

O sistema usa **OpenAI GPT-4** para gerar roteiros:

1. Usuário preenche formulário com briefing
2. Frontend envia dados para backend
3. Backend cria prompt estruturado
4. OpenAI API gera roteiro em JSON
5. Backend salva na database
6. Frontend exibe roteiro estruturado

## 📦 Build & Deploy

### Build para Produção

```bash
pnpm build
```

Gera:
- `packages/backend/dist/` - API compilada
- `packages/frontend/dist/` - SPA compilada

### Docker

```bash
docker-compose up
```

## 🧪 Testing

```bash
pnpm test
```

## 📝 Desenvolvimento

### Adicionar Nova Feature

1. Criar tipo em `packages/shared/src/types/`
2. Criar schema em `packages/shared/src/schemas/` (Zod)
3. Implementar service no backend
4. Criar controller e rotas
5. Desenvolver componentes no frontend
6. Integrar com API via service

### Type Safety

Como é um monorepo TypeScript, tipos são compartilhados:

```typescript
// packages/shared/src/types/script.types.ts
export interface Script {
  id: string
  title: string
  // ...
}

// packages/backend/src/modules/scripts/script.service.ts
import { Script } from '@roteirista/shared'

// packages/frontend/src/services/script.service.ts
import { Script } from '@roteirista/shared'
```

## 🔒 Variáveis de Ambiente

Veja `.env.example` em cada package para todas as variáveis necessárias.

**Backend Critical:**
- `DATABASE_URL` - String de conexão PostgreSQL
- `JWT_SECRET` - Chave secreta para assinar JWTs
- `OPENAI_API_KEY` - Chave da API OpenAI

**Frontend Critical:**
- `VITE_API_URL` - URL da API (deve conter porta correta)

## 🤝 Contribuindo

1. Crie um branch para sua feature: `git checkout -b feature/amazing-feature`
2. Commit suas mudanças: `git commit -m 'Add amazing feature'`
3. Push para o branch: `git push origin feature/amazing-feature`
4. Abra um Pull Request

## 📄 License

MIT

## 🆘 Suporte

Para dúvidas ou issues, entre em contato: larakreuschdesign@gmail.com

---

**Made with ❤️ by LK Comunicação Digital**
