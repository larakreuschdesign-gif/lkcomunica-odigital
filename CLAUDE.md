# LK Comunicação Digital - Sistema de Propostas Comerciais

## Visão Geral
Sistema web SaaS completo para geração automática de orçamentos e propostas comerciais personalizadas para agências de marketing digital, social media, branding e consultorias.

## Stack Tecnológico
- **Frontend**: React 18, Next.js 14, TypeScript, TailwindCSS, Shadcn/UI
- **Backend**: Node.js, Next.js API Routes, Prisma ORM
- **Banco de Dados**: PostgreSQL (pode usar Supabase)
- **PDF**: PDFKit / html2pdf
- **IA**: OpenAI API (Claude ou GPT-4) para sugestões inteligentes
- **Autenticação**: NextAuth.js
- **Email**: Resend ou SendGrid
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

## Estrutura de Diretórios
```
lkcomunica-odigital/
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Páginas de autenticação
│   ├── dashboard/                 # Dashboard principal
│   ├── propostas/                 # Gerenciamento de propostas
│   ├── clientes/                  # Cadastro de clientes
│   ├── servicos/                  # Biblioteca de serviços
│   ├── templates/                 # Templates de propostas
│   ├── configuracoes/             # Admin & configurações
│   ├── api/                       # API Routes
│   └── layout.tsx                 # Layout global
├── components/                    # Componentes reutilizáveis
│   ├── ui/                        # Componentes base (btn, input, etc)
│   ├── dashboard/                 # Componentes do dashboard
│   ├── propostas/                 # Componentes de propostas
│   └── comum/                     # Componentes comuns
├── lib/                           # Utilitários
│   ├── auth.ts                    # Configuração NextAuth
│   ├── db.ts                      # Cliente Prisma
│   ├── pricing-engine.ts          # Engine de precificação inteligente
│   ├── pdf-generator.ts           # Gerador de PDFs
│   ├── ai-service.ts              # Integração IA
│   └── utils.ts                   # Funções utilitárias
├── prisma/
│   └── schema.prisma              # Schema do banco de dados
├── public/                        # Arquivos estáticos
└── package.json
```

## Funcionalidades Principais

### 1. Dashboard
- Visão geral de propostas (em andamento, enviadas, aprovadas, recusadas)
- Métricas: valor vendido, ticket médio, taxa de conversão
- Gráficos de desempenho
- Atalhos rápidos (nova proposta, novo cliente, duplicar)

### 2. Gestão de Clientes
- Cadastro completo com validações
- Histórico de propostas por cliente
- Tags e segmentação
- Dados de contato integrados

### 3. Criação de Propostas
- Interface wizard intuitiva
- Seleção modular de serviços
- Cálculo automático de preços
- Preview em tempo real
- Validações inteligentes

### 4. Biblioteca de Serviços
- Catálogo editável de serviços
- Precificação por faixa (mínimo, ideal, premium)
- Descrições padronizadas
- Complexidade e tempo de execução

### 5. Engine de Precificação Inteligente
- Análise de mercado por região
- Ajustes por complexidade, urgência e porte da empresa
- Margens de lucro automáticas
- Sugestões de upsell
- Alertas de precificação

### 6. Gerador de PDF
- Templates profissionais
- Personalização por marca
- Capa dinâmica
- Assinatura digital
- Histórico de versões

### 7. IA Integrada
- Sugestões de escopo
- Melhoria de textos
- Recomendações de serviços
- Análise de perfil de cliente
- Argumentos de venda personalizados

## Modelo de Dados Principal

### Cliente
```
- id (UUID)
- nome_empresa (String)
- responsavel (String)
- email (String)
- whatsapp (String)
- segmento (String)
- cidade (String)
- estado (String)
- instagram (String)
- website (String)
- porte_empresa (Enum: startup, pequena, media, grande)
- observacoes (Text)
- data_criacao (DateTime)
- usuario_id (UUID)
```

### Proposta
```
- id (UUID)
- cliente_id (UUID)
- nome_projeto (String)
- objetivo (Text)
- descricao_escopo (Text)
- status (Enum: rascunho, enviada, visualizada, aprovada, recusada)
- valor_total (Decimal)
- margem_lucro (Decimal)
- taxa_extra (Decimal)
- desconto (Decimal)
- condicoes_pagamento (String)
- prazo (Int) # em dias
- urgencia (Enum: normal, alta, critica)
- data_criacao (DateTime)
- data_envio (DateTime)
- data_expiracao (DateTime)
- usuario_id (UUID)
- versao (Int)
```

### ServicoProposal (relacionamento)
```
- id (UUID)
- proposta_id (UUID)
- servico_id (UUID)
- quantidade (Int)
- valor_unitario (Decimal)
- valor_total (Decimal)
```

### Servico (Biblioteca)
```
- id (UUID)
- nome (String)
- descricao (Text)
- categoria (Enum)
- valor_minimo (Decimal)
- valor_ideal (Decimal)
- valor_premium (Decimal)
- tempo_medio_horas (Int)
- complexidade (Enum: baixa, media, alta)
- margem_padrao (Decimal)
- usuario_id (UUID)
```

## Fluxo de Usuário

### 1. Onboarding
- Login/Registro
- Preenchimento de dados da empresa
- Configuração de logo e cores
- Importação de serviços padrão

### 2. Criação de Proposta
- Selecionar cliente ou criar novo
- Escolher serviços (wizard com filtros)
- Sistema recomenda preços automaticamente
- Editar valores se necessário
- Visualizar proposta em tempo real
- Gerar PDF
- Enviar por email ou compartilhar link

### 3. Acompanhamento
- Ver status de visualização da proposta
- Receber notificações de aprovação/rejeição
- Histório de comunicações
- Follow-up automático

## Páginas Principais

1. **Dashboard** (`/dashboard`)
   - Overview de métricas
   - Lista recente de propostas
   - Clientes recentes
   - Atalhos rápidos

2. **Propostas** (`/propostas`)
   - Lista com filtros
   - Busca avançada
   - Bulk actions
   - Visualização da proposta

3. **Nova Proposta** (`/propostas/nova`)
   - Wizard passo a passo
   - Preview em tempo real
   - Geração e download de PDF

4. **Clientes** (`/clientes`)
   - Lista de clientes
   - Formulário de cadastro
   - Histórico de propostas
   - Análise por cliente

5. **Serviços** (`/servicos`)
   - Biblioteca editável
   - CRUD de serviços
   - Importação em massa

6. **Templates** (`/templates`)
   - Galeria de templates
   - Personalização
   - Preview

7. **Configurações** (`/configuracoes`)
   - Dados da empresa
   - Customização visual
   - Integração com APIs
   - Usuários e permissões
   - Backup e exportação

## Features de IA

### 1. Sugestão de Preço
- Análise de mercado
- Comparativo regional
- Recomendação automática

### 2. Geração de Conteúdo
- Escopo profissional
- Descrição de serviços
- Argumentos de venda
- Condições customizadas

### 3. Análise de Cliente
- Perfil ideal para serviços
- Sugestões de upsell
- Detecção de oportunidades
- Propostas análogas

## Automações

1. **Envio automático de email** com proposta em PDF
2. **Follow-up** após 7 dias se não visualizado
3. **Notificação** quando proposta é visualizada
4. **Duplicação** de propostas anteriores
5. **Versionamento** com histórico completo
6. **Expiração automática** de propostas
7. **Backup** diário dos dados

## Segurança

- Autenticação com JWT / NextAuth.js
- Criptografia de dados sensíveis
- HTTPS obrigatório
- Rate limiting em APIs
- CORS configurado
- Validação de input em todo sistema
- Auditoria de ações
- Permissões granulares por usuário

## Estratégia de Monetização SaaS (Futuro)

### Planos
1. **Starter** ($29/mês): Até 10 propostas/mês, 1 usuário
2. **Professional** ($99/mês): Unlimited propostas, 3 usuários, IA básica
3. **Enterprise** ($299/mês): Tudo + integrações, suporte prioritário

### Features Premium
- Assinatura digital avançada
- Integração com Stripe/PagSeguro
- Relatórios avançados
- IA avançada (análise profunda)
- White-label
- Integração Zapier
- API custom

## KPIs para Acompanhamento

1. Tempo médio de criação de proposta
2. Taxa de aprovação de propostas
3. Ticket médio
4. Valor total gerado por mês
5. Quantidade de propostas criadas
6. Taxa de conversão por cliente
7. Uso de IA por usuário
8. Tempo de resposta média do cliente

## Desenvolvimentoe Próximas Fases

**Fase 1** (MVP): Dashboard, criação básica de propostas, PDF, clientes
**Fase 2**: IA integrada, automações, templates avançados
**Fase 3**: App mobile, integrações externas, analytics avançado
**Fase 4**: Multi-tenant, white-label, APIs para parceiros

## Variáveis de Ambiente
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=...
EMAIL_API_KEY=...
```

## Comandos Úteis
```bash
npm install           # Instalar dependências
npm run dev          # Rodar em desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar em produção
npx prisma migrate dev  # Executar migrações
npx prisma generate    # Gerar cliente Prisma
```
