# Arquitetura Detalhada - Sistema de Propostas Comerciais LK

## 1. ARQUITETURA GERAL DO SISTEMA

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENTE (NAVEGADOR)                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Next.js Frontend (React 18 + TypeScript)       │   │
│  │  ├─ Pages (Dashboard, Propostas, Clientes, etc)        │   │
│  │  ├─ Components (UI, Dashboard, Forms)                   │   │
│  │  └─ Lib (Utils, Hooks, Services)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP/REST
                    ┌────────────┴────────────┐
                    │   API GATEWAY           │
                    │  (Next.js API Routes)   │
                    └────────────┬────────────┘
┌───────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js)                             │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  API Routes (/api)                                         │   │
│  │  ├─ /auth (login, registro, logout)                        │   │
│  │  ├─ /propostas (CRUD de propostas)                         │   │
│  │  ├─ /clientes (CRUD de clientes)                           │   │
│  │  ├─ /servicos (CRUD de serviços)                           │   │
│  │  ├─ /pricing (engine de precificação)                      │   │
│  │  ├─ /pdf (geração de PDFs)                                 │   │
│  │  └─ /ai (sugestões de IA)                                  │   │
│  └───────────────────────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  Serviços/Utils                                            │   │
│  │  ├─ PricingEngine (cálculo de preços)                      │   │
│  │  ├─ PDFGenerator (geração de PDFs)                         │   │
│  │  ├─ AIService (integração OpenAI)                          │   │
│  │  ├─ EmailService (envio de emails)                         │   │
│  │  └─ AuthService (autenticação)                             │   │
│  └───────────────────────────────────────────────────────────┘   │
└────────────────────┬───────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
    ┌───▼──┐  ┌──────▼────┐  ┌───▼──────┐
    │  DB  │  │  OpenAI   │  │ Resend   │
    │  PG  │  │   API     │  │ (Email)  │
    └──────┘  └───────────┘  └──────────┘
```

## 2. ESTRUTURA DO BANCO DE DADOS

### Diagrama Entidade-Relacionamento (ER)

```
┌─────────────────┐         ┌──────────────────┐
│     USER        │◄────────│   CLIENTE        │
├─────────────────┤1        ├──────────────────┤
│ id (PK)         │         │ id (PK)          │
│ email (UNIQUE)  │         │ userId (FK)      │
│ password        │         │ nomeEmpresa      │
│ companyName     │         │ responsavel      │
│ companyLogo     │         │ email            │
│ companyColor    │         │ whatsapp         │
│ planType        │         │ segmento         │
└─────────────────┘         │ cidade/estado    │
        │                   │ createdAt        │
        │                   └──────────────────┘
        │                          │
        │ 1                        │ 1
        │                    ┌─────▼─────────────┐
        │                    │    PROPOSTA       │
        │                    ├───────────────────┤
        │                    │ id (PK)           │
        │                    │ numero (UNIQUE)   │
        │                    │ clienteId (FK)    │
        │                    │ userId (FK)       │
        │                    │ nomeProjeto       │
        │                    │ descricaoEscopo   │
        │                    │ status            │
        │                    │ valorTotal        │
        │                    │ urgencia          │
        │                    │ prazo             │
        │                    │ createdAt         │
        │                    │ dataEnvio         │
        │                    │ dataVisualizacao  │
        │                    └───────────────────┘
        │                            │ N
        │                            │
        │                    ┌───────┴────────────────┐
        │                    │  SERVICO_PROPOSTAL     │
        │                    ├────────────────────────┤
        │                    │ id (PK)                │
        │                    │ propostaId (FK)        │
        │                    │ servicoId (FK)         │
        │                    │ quantidade             │
        │                    │ valorUnitario          │
        │                    │ valorTotal             │
        │                    └────────────────────────┘
        │                            │
        │                            │ N
        │                    ┌───────▼────────────────┐
        │                    │ SERVICO (Biblioteca)   │
        │                    ├────────────────────────┤
        │                    │ id (PK)                │
        │                    │ userId (FK)            │
        │                    │ nome                   │
        │                    │ categoria              │
        │                    │ valorMinimo            │
        │                    │ valorIdeal             │
        │                    │ valorPremium           │
        │                    │ complexidade           │
        │                    │ tempoMedioHoras        │
        │                    │ margemPadrao           │
        │                    └────────────────────────┘
        │
        │ 1
        │
    ┌───┴────────────────┐
    │   DOCUMENTO        │
    │   PROPOSTAL        │
    ├───────────────────┤
    │ id (PK)           │
    │ propostaId (FK)   │
    │ tipo (PDF, etc)   │
    │ url               │
    │ versao            │
    │ createdAt         │
    └───────────────────┘
        │
        │ 1
        │
    ┌───┴──────────────────┐
    │  HISTORICO_PROPOSTAL │
    ├──────────────────────┤
    │ id (PK)              │
    │ propostaId (FK)      │
    │ acao                 │
    │ descricao            │
    │ dadosAntigos (JSON)  │
    │ createdAt            │
    └──────────────────────┘
        │
        │ 1
        │
    ┌───┴────────────────┐
    │    TEMPLATE        │
    ├───────────────────┤
    │ id (PK)           │
    │ userId (FK)       │
    │ nome              │
    │ categoria         │
    │ estrutura (JSON)  │
    │ isPublico         │
    │ isDefault         │
    │ createdAt         │
    └───────────────────┘
```

### Índices para Performance

```sql
-- Índices de Busca Rápida
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_cliente_user ON "Cliente"(userId);
CREATE INDEX idx_proposta_cliente ON "Proposta"(clienteId);
CREATE INDEX idx_proposta_user ON "Proposta"(userId);
CREATE INDEX idx_proposta_status ON "Proposta"(status);
CREATE INDEX idx_proposta_data ON "Proposta"(createdAt DESC);
CREATE INDEX idx_servico_user ON "Servico"(userId);
CREATE INDEX idx_documento_proposta ON "DocumentoPropostal"(propostaId);
CREATE INDEX idx_historico_proposta ON "HistoricoPropostal"(propostaId);

-- Índices Compostos para Queries Complexas
CREATE INDEX idx_proposta_user_status ON "Proposta"(userId, status);
CREATE INDEX idx_proposta_cliente_user ON "Proposta"(clienteId, userId);
```

## 3. FLUXO DE USUÁRIO (UX FLOW)

### 1. Onboarding
```
Visitante
    ↓
Clica em "Começar Grátis"
    ↓
Preenche Cadastro (Email, Senha, Nome)
    ↓
Confirma Email
    ↓
Setup Inicial
├─ Dados da Empresa (Nome, CNPJ, Logo)
├─ Serviços Padrão (Importar biblioteca)
└─ Integração (APIs, Email, WhatsApp)
    ↓
Acesso ao Dashboard
```

### 2. Criar Nova Proposta (Wizard)
```
Dashboard
    ↓
Clica "+ Nova Proposta"
    ↓
STEP 1: Selecionar/Criar Cliente
├─ Buscar cliente existente OU
├─ Criar novo cliente
└─ Preencher dados de contato
    ↓
STEP 2: Selecionar Serviços
├─ Filtrar por categoria
├─ Adicionar serviços (quantidade)
└─ Visualizar descrições padrão
    ↓
STEP 3: Precificação Inteligente
├─ Sistema calcula automaticamente:
│  ├─ Valor mínimo (80% do ideal)
│  ├─ Valor recomendado (baseado em mercado)
│  └─ Valor premium (140% do ideal)
├─ IA sugere ajustes
├─ Usuário pode editar manualmente
└─ Sistema valida e alerta
    ↓
STEP 4: Finalizar
├─ Revisar informações
├─ Gerar PDF
├─ Compartilhar ou Enviar Email
└─ Salvar Proposta
    ↓
Dashboard (Proposta criada)
```

### 3. Ciclo de Vida da Proposta
```
RASCUNHO
├─ Usuário pode editar
└─ Não é enviada
    ↓
ENVIADA (quando clica "Enviar")
├─ Email enviado ao cliente
├─ Link de visualização criado
└─ Data de envio registrada
    ↓
VISUALIZADA (quando cliente acessa link)
├─ Timestamp de visualização
└─ Notificação ao usuário
    ↓
├─ APROVADA (cliente aceita)
│  └─ Registro de data/hora
│
├─ RECUSADA (cliente rejeita)
│  └─ Possibilidade de duplicar e revisar
│
└─ EXPIRADA (após X dias sem resposta)
   └─ Sugestão de follow-up
```

## 4. SISTEMA DE PRECIFICAÇÃO INTELIGENTE

### Algoritmo de Cálculo

```typescript
precificacao = basePrice × multiplicadores

multiplicadores = {
  complexidade: {
    baixa: 1.0,
    media: 1.3,
    alta: 1.6
  },
  urgencia: {
    normal: 1.0,
    alta: 1.2,
    critica: 1.5
  },
  regiao: {
    SP: 1.15,
    RJ: 1.12,
    SC: 1.07,
    ...
  },
  tamanhoEmpresa: {
    startup: 0.9,
    pequena: 1.0,
    media: 1.1,
    grande: 1.25
  },
  desconto_por_volume: {
    10+: 0.85,
    5+: 0.90,
    3+: 0.95
  }
}
```

### Exemplo Prático

```
Serviço: Gestão de Instagram Mensal
Preço Base: R$ 1.500

Aplicando Multiplicadores:
├─ Complexidade (média): 1.3
├─ Urgência (normal): 1.0
├─ Região (SP): 1.15
├─ Tamanho (media): 1.1
└─ Quantidade (3x): 0.95

Cálculo: 1.500 × 1.3 × 1.0 × 1.15 × 1.1 × 0.95 = R$ 2.143

Sugestão do Sistema:
├─ Mínimo Viável: R$ 1.714
├─ Recomendado: R$ 2.143 ✓
└─ Premium: R$ 3.000

Margem Estimada: 40% (R$ 857 de lucro)
```

## 5. COMPONENTES DE UI/UX

### Design System
- **Paleta de Cores**: Azul (#2563eb) como primary, cinza para neutral
- **Tipografia**: Inter, 14px base
- **Espaçamento**: Sistema 4px (2, 4, 6, 8, 12, 16, 24, 32...)
- **Componentes**: Button, Input, Card, Table, Select, Modal
- **Ícones**: Lucide React (24px default)

### Componentes Principais

1. **Dashboard**
   - StatsCards (revenue, propostas, clientes, conversão)
   - PropostasRecentes (tabela)
   - QuickActions (atalhos)
   - UpcomingActions (próximas ações)

2. **Propostas**
   - Nova Proposta Wizard (4 steps)
   - PropostasList (tabela com filtros)
   - PropostaPreview (visualização)
   - PDFGenerator (exportação)

3. **Clientes**
   - ClientesList (grid ou tabela)
   - ClienteForm (cadastro/edição)
   - ClienteHistorico (propostas)

4. **Serviços**
   - ServicosList (tabela)
   - ServicoForm (CRUD)
   - PricingMatrix (visualizar preços)

## 6. INTEGRAÇÕES

### OpenAI (Claude/GPT-4)
```typescript
// Sugestões de conteúdo
POST /api/ai/suggest-scope
POST /api/ai/suggest-price
POST /api/ai/improve-text
POST /api/ai/sales-arguments

Exemplo de Resposta:
{
  "suggestion": "Adicionar consultoria estratégica",
  "reason": "Cliente é de grande porte e investe em marketing",
  "estimatedImpact": "+R$ 1.500"
}
```

### Email (Resend)
```typescript
// Enviar proposta por email
POST /api/email/send-proposal
{
  clientEmail: "client@company.com",
  propostaId: "xxx",
  pdfUrl: "...",
  message: "custom message"
}
```

### Assinatura Digital (Futuro)
```
Integração com DocuSign ou similar
Para assinatura direto na proposta PDF
```

## 7. FLUXO DE DADOS

### Criar Proposta
```
User Submit (Frontend)
    ↓ POST /api/propostas
    ↓
Backend Validation
├─ Validar cliente
├─ Validar serviços
├─ Validar preços
└─ Validar escopo
    ↓
Salvar no Database
├─ Create Proposta
├─ Create ServicoPropostal (cada serviço)
└─ Create HistoricoPropostal (log)
    ↓
Generate PDF (opcional)
├─ Render HTML template
├─ Convert to PDF
└─ Save to Storage (S3/Supabase)
    ↓
Return Response
{
  id, numero, pdf_url, status
}
```

### Enviar Proposta
```
User Click "Enviar"
    ↓ POST /api/propostas/{id}/send
    ↓
Update Status → "enviada"
    ↓
Generate Shareable Link
├─ Token unique gerado
├─ URL criada: /view/{token}
└─ Stored in DB
    ↓
Send Email
├─ Via Resend API
├─ Template customizado
└─ PDF anexado
    ↓
Log Event
└─ HistoricoPropostal.create()
    ↓
Return Confirmation
```

## 8. SEGURANÇA

### Autenticação
- NextAuth.js com JWT
- Hash de senhas com bcrypt
- Session tokens com expiração

### Autorização
- Row Level Security (RLS)
- Usuários só acessam suas propostas
- Clientes acessam via token de visualização

### Dados Sensíveis
- Email do cliente criptografado
- Chaves API armazenadas com hash
- Senhas nunca em logs

### Rate Limiting
```
- Login: 5 tentativas por 15min
- API geral: 100 req/min por usuário
- Upload: 50MB máximo
```

## 9. PERFORMANCE

### Otimizações
- Cache de serviços padrão (Redis)
- Lazy loading de tabelas
- Paginação de resultados (20 por página)
- Índices estratégicos no DB
- Compressão de PDFs

### Monitoramento
- Logs de operações críticas
- Métricas de uso por usuário
- Alertas de erros em tempo real
- Dashboard interno de analytics

## 10. ESCALABILIDADE (SaaS)

### Arquitetura Multi-Tenant
```
Database Compartilhado
├─ Column user_id em todas as tabelas
└─ Row Level Security ativado

Isolamento de Dados
├─ Cada query filtra por userId
├─ Storage por usuário
└─ Índices user_id + campo

Limites por Plano
├─ Free: 10 propostas/mês
├─ Pro: Unlimited
└─ Enterprise: API custom
```

### Load Balancing
```
Frontend (Vercel)
├─ Auto-scaling
└─ CDN global

Backend (Render/Railway)
├─ Múltiplas instâncias
├─ Load balancer
└─ Database pooling

Database (PostgreSQL)
├─ Read replicas
├─ Backup automático
└─ Scaling vertical
```

## 11. ROADMAP DE DESENVOLVIMENTO

### MVP (Fase 1) - Semanas 1-4
- [x] Dashboard básico
- [x] Criação de propostas
- [x] Cadastro de clientes
- [x] Biblioteca de serviços
- [ ] Geração de PDF
- [ ] Email básico

### Phase 2 - Semanas 5-8
- [ ] IA integrada (preços e conteúdo)
- [ ] Automações (follow-up, duplicar)
- [ ] Templates avançados
- [ ] Analytics e relatórios
- [ ] App mobile (PWA)

### Phase 3 - Semanas 9-12
- [ ] Integrações (WhatsApp, Slack, Zapier)
- [ ] Assinatura digital
- [ ] White-label para agências
- [ ] API pública
- [ ] System de notificações

### Phase 4 - SaaS Comercial
- [ ] Pagamento (Stripe)
- [ ] Gerenciamento de planos
- [ ] Suporte ao cliente
- [ ] Marketing e Growth
- [ ] Marketplace de templates

## 12. MÉTRICAS E KPIs

```
Operacionais:
├─ Tempo médio de criação de proposta: < 5 min
├─ Taxa de conversão de propostas: > 60%
├─ Ticket médio: R$ 5.000+
└─ Propostas por mês: > 20

Negócio:
├─ Receita gerada/mês
├─ NPS (Net Promoter Score)
├─ Retenção de usuários
└─ Churn rate

Técnicos:
├─ Uptime: > 99.5%
├─ Page load time: < 2s
├─ API response time: < 200ms
└─ Database query time: < 100ms
```

## 13. DEPLOYMENT

### Environments
```
Development (localhost)
├─ DATABASE_URL=postgresql://localhost:5432/dev
└─ NODE_ENV=development

Staging (staging.lkproposals.com)
├─ DATABASE_URL=staging.supabase.co
├─ NODE_ENV=staging
└─ API_ENV=staging

Production (app.lkproposals.com)
├─ DATABASE_URL=prod.supabase.co
├─ NODE_ENV=production
└─ API_ENV=production
```

### CI/CD Pipeline
```
Push to GitHub
    ↓
Run Tests
    ↓
Build Check
    ↓
Deploy to Staging (Vercel Preview)
    ↓
Manual Approval
    ↓
Deploy to Production
    ├─ Vercel (Frontend)
    └─ Railway (Backend)
```

---

Este documento fornece a visão técnica completa do sistema. Para dúvidas ou ajustes, veja CLAUDE.md para mais contexto.
