# 🏗️ Arquitetura do Sistema Financeiro

## Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Frontend)                  │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  HTML5 (DOM)                                      │   │
│  │  - Sidebar Navigation                             │   │
│  │  - Pages (Dashboard, Clients, Expenses, etc)     │   │
│  │  - Modal Forms                                    │   │
│  │  - Tables com Filtros                             │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  CSS3 (Styling)                                   │   │
│  │  - CSS Variables para Tema                        │   │
│  │  - Grid & Flexbox                                │   │
│  │  - Media Queries (Responsivo)                    │   │
│  │  - Animações e Transições                        │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  JavaScript (Logic)                               │   │
│  │  - Event Listeners                                │   │
│  │  - API Communication                              │   │
│  │  - Data Management                                │   │
│  │  - DOM Rendering                                  │   │
│  │  - Charts (Canvas)                                │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↕ HTTP/JSON
┌─────────────────────────────────────────────────────────┐
│                 BACKEND (Node.js + Express)              │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  API Routes                                       │   │
│  │  - /api/clients                                   │   │
│  │  - /api/fixed-expenses                            │   │
│  │  - /api/company-expenses                          │   │
│  │  - /api/extra-expenses                            │   │
│  │  - /api/third-party-expenses                      │   │
│  │  - /api/investments                               │   │
│  │  - /api/settings                                  │   │
│  │  - /api/dashboard                                 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Business Logic                                   │   │
│  │  - CRUD Operations                                │   │
│  │  - Data Validation                                │   │
│  │  - Calculations                                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↕ SQL
┌─────────────────────────────────────────────────────────┐
│               DATABASE (SQLite3)                         │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Tables                                           │   │
│  │  - clients                                        │   │
│  │  - fixedExpenses                                  │   │
│  │  - companyExpenses                                │   │
│  │  - extraExpenses                                  │   │
│  │  - thirdPartyExpenses                             │   │
│  │  - investments                                    │   │
│  │  - settings                                       │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 📁 Estrutura de Arquivos

```
financial-system/
├── backend/
│   ├── package.json           # Dependências Node.js
│   ├── server.js             # Express server & routes
│   ├── database.js           # SQLite config & init
│   └── financial.db          # Banco de dados (auto-gerado)
│
├── frontend/
│   ├── index.html            # Estrutura HTML
│   ├── css/
│   │   └── main.css          # Estilos CSS
│   ├── js/
│   │   └── app.js            # Lógica JavaScript
│   └── assets/               # Imagens (futuro)
│
├── README.md                 # Documentação principal
├── QUICK_START.md           # Guia rápido
├── ARCHITECTURE.md          # Este arquivo
└── .gitignore               # Git ignore
```

## 🔄 Fluxo de Dados

### 1. Inicialização (Page Load)
```
1. HTML carrega
2. CSS aplica estilos
3. JS executa:
   - initializeTheme() → Aplica tema salvo
   - setupEventListeners() → Registra eventos
   - initializeMonthSelect() → Popula meses
   - loadAllData() → Busca dados do servidor
   - renderPage('dashboard') → Exibe dashboard
```

### 2. Adicionar um Registro
```
User clica "Adicionar"
    ↓
Modal abre (resetForm)
    ↓
User preenche formulário
    ↓
User clica "Salvar"
    ↓
handleFormSubmit(e, type)
    ↓
Fetch POST /api/{endpoint}
    ↓
Backend valida dados
    ↓
Backend insere no BD
    ↓
Frontend fecha modal
    ↓
loadAllData() atualiza cache
    ↓
renderPage() atualiza UI
```

### 3. Atualizar Dashboard
```
loadAllData() executa
    ↓
Parallel fetches para todos os endpoints
    ↓
allData objeto atualizado
    ↓
updateDashboard() chamado
    ↓
Calcula:
  - calculateRevenue()
  - calculateExpenses()
  - calculateInvested()
    ↓
Atualiza KPI cards
    ↓
renderCharts() atualiza gráficos
    ↓
UI sincronizada em tempo real
```

## 💾 Modelo de Dados

### Tabela: clients
```sql
CREATE TABLE clients (
  id TEXT PRIMARY KEY,                    -- UUID
  name TEXT NOT NULL,                     -- "João da Silva"
  monthlyValue REAL NOT NULL,             -- 1500.00
  paymentDay INTEGER NOT NULL,            -- 15 (1-31)
  status TEXT DEFAULT 'pending',          -- 'pending' | 'paid'
  paidDate TEXT,                          -- '2024-07-15'
  notes TEXT,                             -- Observações
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  month TEXT NOT NULL                     -- '2024-07'
);
```

### Tabela: fixedExpenses
```sql
CREATE TABLE fixedExpenses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  paymentMethod TEXT NOT NULL,
  category TEXT NOT NULL,
  value REAL NOT NULL,
  date TEXT NOT NULL,
  notes TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  month TEXT NOT NULL
);
```

### Tabela: investments
```sql
CREATE TABLE investments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  value REAL NOT NULL,
  date TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  month TEXT NOT NULL
);
```

## 🎨 Camadas de Apresentação

### 1. Tema & Cores
```css
:root {
  --primary: #0066FF;           /* Azul principal */
  --success: #10B981;           /* Verde */
  --danger: #EF4444;            /* Vermelho */
  --warning: #F59E0B;           /* Amarelo */
  --text-primary: #111827;      /* Cinza escuro */
  --bg-primary: #FFFFFF;        /* Branco */
}

html.dark-theme {
  --text-primary: #F9FAFB;      /* Branco */
  --bg-primary: #111827;        /* Preto */
  /* ... mais cores */
}
```

### 2. Grid Layout
```css
.sidebar { width: 280px; }
.main-content { flex: 1; }
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
```

### 3. Componentes
- **KPI Cards**: Mostram números com ícones
- **Tables**: Mostram listas com filtros
- **Charts**: Gráficos Canvas
- **Modals**: Formulários em popup
- **Status Badges**: Indicadores com cores

## 🔌 API Endpoints

### Padrão REST
```
GET    /api/[resource]          → Listar todos
POST   /api/[resource]          → Criar novo
PUT    /api/[resource]/:id      → Atualizar
DELETE /api/[resource]/:id      → Deletar
```

### Query Parameters
```
/api/clients?month=2024-07      → Filtrar por mês
```

### Response Format
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Cliente",
  "value": 1500.00,
  "month": "2024-07"
}
```

## 📊 Cálculos Automáticos

### Receita
```javascript
revenue.received = sum(clients where status='paid')
revenue.pending = sum(clients where status='pending')
revenue.total = received + pending
```

### Despesas
```javascript
expenses.total = fixed + company + extra + thirdParty
```

### Saldo
```javascript
balance = revenue.received - expenses.total
```

### Indicadores
```javascript
expenseRatio = (expenses.total / revenue.total) * 100
investmentRatio = (invested / revenue.total) * 100
savings = revenue.received - expenses.total - invested
```

## 🔐 Segurança

### Frontend
- Validação de entrada em formulários
- CSRF prevenção implícita (SPA)
- XSS prevenção (textContent vs innerHTML)
- Sem armazenamento de dados sensíveis

### Backend
- Validação de tipos
- Prepared statements (SQLite)
- CORS configurado
- Sem exposição de estrutura interna
- UUIDs para IDs (não previsíveis)

## ⚡ Performance

### Otimizações Frontend
- **Lazy Loading**: Dados carregam sob demanda
- **Caching**: allData armazenado em memória
- **Auto-refresh**: A cada 5 segundos apenas se necessário
- **CSS Variables**: Tema muda sem reload
- **Canvas Charts**: Renderização eficiente

### Otimizações Backend
- **SQLite**: Banco leve e rápido
- **Connection Pool**: Reutiliza conexões
- **Parallel Requests**: Frontend faz requests em paralelo
- **Indexing**: (futuro) Índices em month, status
- **Query Optimization**: JOINs eficientes

## 📈 Escalabilidade Futura

### Banco de Dados
```
SQLite → PostgreSQL/MySQL
  ↓
Multi-tenant support
  ↓
Replicação de dados
  ↓
Cache distribuído (Redis)
```

### Backend
```
Single server → Múltiplos servidores
  ↓
Load balancer
  ↓
Microserviços
  ↓
Message queue (Bull, Kafka)
```

### Frontend
```
SPA Vanilla JS → React/Vue
  ↓
State management (Redux)
  ↓
TypeScript
  ↓
Service Workers (PWA)
```

## 🧪 Testes (Futuro)

### Backend
```javascript
// Jest / Mocha
describe('POST /api/clients', () => {
  it('should create a client', () => {
    // teste
  });
});
```

### Frontend
```javascript
// Cypress / Playwright
describe('Client Form', () => {
  it('should submit valid data', () => {
    // teste E2E
  });
});
```

## 📡 Integração Externa (Futuro)

```
├─ Bancos (Open Banking)
├─ APIs de Câmbio
├─ Provedores de Email (Notificações)
├─ Cloud Storage (Backups)
├─ Analytics (Mixpanel, GA)
└─ Payment Gateways (Stripe, PayPal)
```

## 🎯 Decisões Arquiteturais

### Por que SQLite?
- ✅ Leve e rápido para single-user
- ✅ Sem server externo
- ✅ Fácil de fazer backup
- ✅ Suporte completo a transações

### Por que Vanilla JS?
- ✅ Sem dependências externas
- ✅ Carregamento instantâneo
- ✅ Controle total do código
- ✅ Menor bundle size

### Por que Express?
- ✅ Simples e direto
- ✅ Middleware pattern poderoso
- ✅ Grande comunidade
- ✅ Fácil de estender

### Por que Canvas API?
- ✅ Sem dependência de Chart.js
- ✅ Controle total da renderização
- ✅ Performance nativa
- ✅ Responsivo naturalmente

## 🔄 Fluxo de Atualização do Tema

```javascript
toggleTheme()
  ↓
html.classList.toggle('dark-theme')
  ↓
CSS variables mudam automaticamente
  ↓
:root[dark-theme] ativa estilos alternativos
  ↓
localStorage.setItem('theme', 'dark')
  ↓
Interface atualizada instantaneamente
```

## 📱 Responsividade

### Breakpoints
```css
Desktop:    > 1024px  (3 colunas, sidebar aberta)
Tablet:     768-1024px (2 colunas, sidebar flutuante)
Mobile:     < 768px   (1 coluna, sidebar drawer)
Pequeno:    < 480px   (Ajustes de tipografia)
```

### Mobile Considerations
- Sidebar vira drawer
- Tabelas scrolláveis horizontalmente
- Botões maiores para touch
- Inputs otimizados para mobile
- Gráficos redimensionam automaticamente

## 🚀 Próximos Passos de Desenvolvimento

1. **Curto prazo** (1-2 semanas)
   - Melhorar gráficos com Chart.js
   - Adicionar autenticação
   - Exportação PDF/Excel real
   - Testes unitários

2. **Médio prazo** (1-2 meses)
   - Migrações para React
   - TypeScript
   - Testes E2E
   - CI/CD com GitHub Actions

3. **Longo prazo** (3+ meses)
   - PostgreSQL
   - Multi-tenant
   - App mobile
   - Integrações com bancos

---

**Desenvolvido para ser simples, rápido e escalável** 🚀
