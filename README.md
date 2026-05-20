# 🎯 LK Proposals - Sistema de Propostas Comerciais

Sistema SaaS profissional para geração automática de propostas e orçamentos comerciais com precificação inteligente baseada em IA.

> **Crie propostas comerciais profissionais em menos de 5 minutos.**

## 🚀 Features Principais

✅ **Dashboard Completo** - Visão geral de propostas, clientes e métricas  
✅ **Criação de Propostas** - Wizard intuitivo 4-step  
✅ **Precificação Inteligente** - IA que calcula preços automáticos  
✅ **Biblioteca de Serviços** - Catálogo editável de serviços  
✅ **Geração de PDF** - Propostas profissionais em PDF  
✅ **Automações** - Follow-up, duplicação, envio automático  
✅ **IA Integrada** - Sugestões de conteúdo e preço  
✅ **Gerenciamento de Clientes** - Histórico completo por cliente  

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn
- Git

## ⚙️ Configuração Local

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/lkcomunica-odigital.git
cd lkcomunica-odigital
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Preencha os valores em `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/proposal_system

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-aleatorio-aqui

# OpenAI (opcional, para IA)
OPENAI_API_KEY=sk-...

# Email (opcional)
RESEND_API_KEY=re_...
```

### 4. Configure o Banco de Dados

```bash
# Criar banco de dados
createdb proposal_system

# Executar migrações
npx prisma migrate dev --name init

# Gerar cliente Prisma
npx prisma generate

# (Opcional) Abrir Prisma Studio para visualizar dados
npx prisma studio
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
lkcomunica-odigital/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Páginas de autenticação
│   ├── dashboard/                # Dashboard principal
│   ├── propostas/                # Gerenciamento de propostas
│   │   └── nova/                 # Criar nova proposta
│   ├── clientes/                 # Cadastro de clientes
│   ├── servicos/                 # Biblioteca de serviços
│   ├── templates/                # Templates de propostas
│   ├── configuracoes/            # Configurações do sistema
│   ├── api/                      # API Routes
│   ├── layout.tsx                # Layout global
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Estilos globais
├── components/                   # Componentes React
│   ├── ui/                       # Componentes base (Button, Input, etc)
│   ├── dashboard/                # Componentes do dashboard
│   └── propostas/                # Componentes de propostas
├── lib/                          # Utilitários e serviços
│   ├── utils.ts                  # Funções utilitárias
│   ├── pricing-engine.ts         # Engine de precificação
│   ├── pdf-generator.ts          # Gerador de PDFs
│   └── ai-service.ts             # Integração com IA
├── prisma/
│   └── schema.prisma             # Schema do banco de dados
└── public/                       # Assets estáticos
```

## 🏗️ Arquitetura

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes completos da arquitetura, fluxo de dados e diagramas técnicos.

Ver [SAAS_STRATEGY.md](./SAAS_STRATEGY.md) para estratégia de precificação e modelo de negócio SaaS.

## 🎨 Design System

### Paleta de Cores
- **Primary**: `#2563eb` (Azul)
- **Secondary**: `#f5f5f5` (Cinza claro)
- **Destructive**: `#ef4444` (Vermelho)
- **Success**: `#16a34a` (Verde)
- **Warning**: `#eab308` (Amarelo)

### Tipografia
- **Font**: Inter
- **Base Size**: 14px
- **Line Height**: 1.5

### Componentes Principais
- Button
- Input
- Card
- Table
- Select
- Modal
- Sidebar
- Header

## 📖 Documentação

- [CLAUDE.md](./CLAUDE.md) - Visão geral do projeto e stack tecnológico
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura técnica completa
- [SAAS_STRATEGY.md](./SAAS_STRATEGY.md) - Estratégia de negócio e monetização

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Iniciar servidor de desenvolvimento
npm run build            # Build para produção
npm run start            # Iniciar servidor de produção
npm run lint             # Executar linter

# Database
npx prisma migrate dev   # Criar nova migração e executar
npx prisma generate     # Gerar cliente Prisma
npx prisma studio      # Abrir Prisma Studio (GUI)
npx prisma seed        # Popular dados iniciais (opcional)
```

## 📚 Fluxo de Desenvolvimento

### Criar Nova Proposta
1. **Usuário acessa** `/propostas/nova`
2. **Step 1 - Cliente**: Seleciona ou cria cliente
3. **Step 2 - Serviços**: Seleciona serviços do catálogo
4. **Step 3 - Precificação**: Sistema calcula preços com IA
5. **Step 4 - Finalizar**: Revisa e gera PDF
6. **Salvar/Enviar**: Opções para rascunho ou envio

### Precificação Inteligente
```typescript
// lib/pricing-engine.ts
const pricing = PricingEngine.calculatePrice({
  serviceName: 'gestao-instagram-mensal',
  basePrice: 1500,
  complexity: 'media',
  deliveryCount: 3,
  urgency: 'normal',
  region: 'SP',
  companySize: 'media'
});

// Retorna: { minimumViable, recommended, premium, alerts, suggestions }
```

## 🔐 Segurança

- ✅ Autenticação com NextAuth.js + JWT
- ✅ Senhas com hash bcrypt
- ✅ HTTPS obrigatório em produção
- ✅ Rate limiting em APIs
- ✅ Validação de input
- ✅ CORS configurado
- ✅ Row-level security no banco

## 📊 Banco de Dados

### Tabelas Principais
- **User** - Usuários do sistema
- **Cliente** - Clientes das agências
- **Proposta** - Propostas comerciais
- **Servico** - Biblioteca de serviços
- **ServicoPropostal** - Associação de serviços com propostas
- **DocumentoPropostal** - PDFs e documentos gerados
- **HistoricoPropostal** - Log de ações nas propostas
- **Template** - Templates de propostas

Ver [schema.prisma](./prisma/schema.prisma) para detalhes completos.

## 🚀 Deploy

### Vercel (Frontend)
```bash
npm install -g vercel
vercel --prod
```

### Railway/Render (Backend)
1. Conecte seu repositório GitHub
2. Configure variáveis de ambiente
3. Deploy automático na cada push

### Banco de Dados
Recomendado: **Supabase** (PostgreSQL managed)
```
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres
```

## 📈 Roadmap

### MVP (Fase 1) ✅
- [x] Dashboard
- [x] Criação de propostas
- [x] Cadastro de clientes
- [x] Biblioteca de serviços
- [ ] Geração de PDF

### Fase 2
- [ ] IA avançada
- [ ] Automações
- [ ] Email integrado
- [ ] Templates premium

### Fase 3
- [ ] App mobile (PWA)
- [ ] Integrações (WhatsApp, CRM)
- [ ] Assinatura digital
- [ ] Analytics avançado

### Fase 4 (SaaS)
- [ ] Pagamentos (Stripe)
- [ ] Planos de preços
- [ ] White-label
- [ ] API pública

## 📞 Suporte

Dúvidas? Abra uma [issue](https://github.com/seu-usuario/lkcomunica-odigital/issues) ou envie um email para `contato@lkcomunicacao.com`.

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para mais informações.

---

**Desenvolvido com ❤️ por LK Comunicação Digital**

[Website](https://lkcomunicacao.com) • [Instagram](https://instagram.com/lkcomunicacao) • [WhatsApp](https://wa.me/5547997219572)
