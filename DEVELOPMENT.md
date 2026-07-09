# Guia de Desenvolvimento - ROTEIRO AI

Este documento fornece instruções detalhadas para desenvolvedores que trabalham no projeto ROTEIRO AI.

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ (recomendado 20 LTS)
- npm ou yarn
- Git
- Editor de código (VS Code recomendado)

### Primeiro Setup

1. **Clone o repositório**
```bash
git clone <repo-url>
cd lkcomunica-odigital
```

2. **Instale dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Adicione sua API key**
Edite `.env`:
```
ANTHROPIC_API_KEY=sua_chave_aqui
PORT=5000
NODE_ENV=development
DATABASE_PATH=./data/scripts.db
```

Obtenha sua chave em: https://console.anthropic.com/

5. **Inicie o desenvolvimento**
```bash
npm run dev
```

Acesse:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

## 📁 Estrutura do Projeto Explicada

```
lkcomunica-odigital/
│
├── src/                          # Código frontend (React)
│   ├── components/              # Componentes reutilizáveis
│   │   └── Sidebar.tsx         # Navegação lateral
│   ├── pages/                   # Páginas completas
│   │   ├── Dashboard.tsx        # Home/Overview
│   │   ├── ScriptBuilder.tsx    # Formulário de criação
│   │   ├── ScriptResult.tsx     # Visualização do roteiro
│   │   ├── MyScripts.tsx        # Lista de roteiros
│   │   └── Settings.tsx         # Configurações
│   ├── hooks/                   # React hooks customizados
│   │   └── useApi.ts           # Hook para requisições HTTP
│   ├── store/                   # Estado global (Zustand)
│   │   └── useScriptStore.ts   # Store principal
│   ├── utils/                   # Funções utilitárias
│   │   └── scriptUtils.ts       # Helpers para scripts
│   ├── types/                   # Tipos TypeScript
│   │   └── index.ts            # Interfaces compartilhadas
│   ├── styles/                  # CSS global
│   │   └── index.css           # Design system
│   ├── App.tsx                  # Componente raiz
│   └── main.tsx                 # Entrada React
│
├── backend/                      # Código backend (Node.js)
│   ├── src/
│   │   ├── server.js           # Servidor Express
│   │   ├── routes/             # Endpoints API
│   │   │   └── scripts.js      # Rotas de scripts
│   │   └── services/           # Lógica de negócio
│   │       ├── database.js     # SQLite manager
│   │       ├── aiService.js    # Integração Claude
│   │       └── scriptAnalyzer.js # Análise de scripts
│   └── data/                   # Banco de dados (SQLite)
│
├── public/                      # Assets estáticos
│   └── index.html              # HTML base
│
├── package.json                 # Dependências Node
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração Vite
├── README.md                   # Documentação
└── DEVELOPMENT.md              # Este arquivo
```

## 🔄 Fluxo de Desenvolvimento

### Frontend

**Arquitetura:**
- React 18 com hooks
- Zustand para state management
- TypeScript para type safety
- Vite para dev server rápido

**Componentes:**
```typescript
// Exemplo: Criar novo componente
// src/components/MyComponent.tsx

interface MyComponentProps {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {onClick && <button onClick={onClick}>Clique</button>}
    </div>
  )
}
```

**Store Global:**
```typescript
import { useScriptStore } from '../store/useScriptStore'

export function MyComponent() {
  const { currentScript, updateScript } = useScriptStore()
  // Usar store...
}
```

**Chamadas API:**
```typescript
import { useApi } from '../hooks/useApi'

export function MyComponent() {
  const { post, loading, error } = useApi()

  const handleGenerate = async () => {
    try {
      const result = await post('/scripts/generate', { hook: 'meu gancho' })
      // sucesso
    } catch (err) {
      // erro
    }
  }
}
```

### Backend

**Arquitetura:**
- Express.js para API REST
- SQLite com WAL mode
- Claude AI para geração
- Middleware CORS configurado

**Criando um novo endpoint:**
```javascript
// backend/src/routes/scripts.js

router.post('/novo-endpoint', async (req, res) => {
  try {
    const db = getDatabase()
    const { dados } = req.body

    // Validação
    if (!dados) {
      return res.status(400).json({ error: 'Dados obrigatórios' })
    }

    // Processamento
    const resultado = processarDados(dados)

    // Resposta
    res.json({ success: true, resultado })
  } catch (error) {
    console.error('Erro:', error)
    res.status(500).json({ error: error.message })
  }
})
```

**Integrando com Claude:**
```javascript
import { generateScript } from '../services/aiService.js'

const result = await generateScript({
  hook: 'O gancho do vídeo',
  platform: 'Instagram Reels',
  tone: 'Conversacional',
  // mais parâmetros...
})
```

## 🗄️ Banco de Dados

**Tabelas:**

### scripts
```sql
id (PK), title, hook, objective, summary, generalDescription,
ctaFinal, creativDirection, musicSuggestion, observations,
brand, niche, platform, tone, format, duration,
createdAt, updatedAt
```

### scenes
```sql
id (PK), scriptId (FK), sceneIndex, duration, objective,
environment, description, framing, expression, bodyMovement,
cameraMovement, spokenText, onScreenText, emotion,
creativeDirection, transition
```

**Migrações:**
O banco é criado automaticamente em `backend/src/services/database.js`.

Para alterar schema:
1. Modifique o SQL em `initializeDatabase()`
2. Delete `backend/data/scripts.db`
3. Reinicie o servidor

## 🚀 APIs & Endpoints

### Scripts

**GET** `/api/scripts`
- Retorna todos os roteiros

**GET** `/api/scripts/:id`
- Retorna um roteiro específico

**POST** `/api/scripts/generate`
```json
{
  "hook": "string",
  "platform": "string",
  "objective": "string",
  "tone": "string",
  "format": "string",
  "duration": "string",
  "brand": "string (opcional)",
  "niche": "string (opcional)",
  "requiredInfo": "string (opcional)",
  "restrictions": "string (opcional)"
}
```

**PATCH** `/api/scripts/:id`
- Atualiza um roteiro

**DELETE** `/api/scripts/:id`
- Deleta um roteiro

**POST** `/api/scripts/:id/hook-variations`
```json
{ "hook": "string" }
```

**POST** `/api/scripts/:id/analyze`
- Analisa qualidade do roteiro

**POST** `/api/scripts/:id/variations`
```json
{ "variationType": "provocative|shorter|emotional|professional|viral|sophisticated|natural|commercial|educational|retentive" }
```

**POST** `/api/scripts/:id/improvements`
- Sugere melhorias para o roteiro

## 🎨 Design System

**Variáveis CSS:**
```css
--primary: #6366f1      /* Indigo - botões, seleção */
--secondary: #ec4899    /* Rose - destaques */
--accent: #f59e0b       /* Amber - complemento */
--background: #ffffff   /* Fundo principal */
--surface: #f9fafb      /* Fundo secundário */
--text-primary: #111827 /* Texto principal */
--text-secondary: #6b7280 /* Texto secundário */
--text-tertiary: #9ca3af /* Texto terciário */
```

**Componentes Principais:**
- `.btn` - Botões
- `.card` - Cards
- `.input` - Inputs
- `.textarea` - Textareas
- `.badge` - Badges
- `.form-group` - Grupos de formulário

## 🧪 Testando

**Testes Manuais:**
1. Gerar roteiro com gancho simples
2. Editar cenas
3. Exportar em diferentes formatos
4. Testar responsividade (F12 > Device Toolbar)
5. Testar em mobile real

**Verificar Tipos:**
```bash
npm run type-check  # (adicionar em package.json)
```

## 📝 Commit & PR

**Mensagens de Commit:**
```
feat: descrição breve da feature
fix: descrição breve do fix
refactor: descrição breve do refactor
docs: descrição breve da documentação
```

**Exemplo:**
```bash
git commit -m "feat: adicionar análise automática de scripts"
```

## 🔍 Debugging

**Frontend (Vite):**
- DevTools disponível em dev
- Source maps habilitados
- React DevTools recomendado

**Backend:**
```bash
npm run dev:backend  # Usa --watch
```

**Verificar API:**
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/scripts
```

## 🚢 Deploy

**Preparação:**
1. Build: `npm run build`
2. Testar build: `npm run preview`
3. Verificar variáveis de ambiente
4. Push para repo

**Produção:**
- Backend serve frontend estático
- SQLite persiste em `/data/`
- Logs em console

## 📚 Recursos Úteis

- [React Docs](https://react.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [Express.js](https://expressjs.com)
- [Claude API](https://docs.anthropic.com)
- [SQLite](https://www.sqlite.org)
- [Vite](https://vitejs.dev)

## 🆘 Troubleshooting

**Porta já em uso:**
```bash
# Mudar porta no .env
PORT=5001
```

**API key inválida:**
- Verificar .env
- Testar em https://console.anthropic.com/

**Banco de dados corrompido:**
```bash
rm backend/data/scripts.db
npm run dev  # Recria banco
```

**Dependências quebradas:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Contato

Para dúvidas de desenvolvimento, abra uma issue no repositório.

---

**Happy coding! 🚀**
