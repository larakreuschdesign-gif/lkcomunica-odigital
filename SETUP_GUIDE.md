# 🚀 Guia de Setup - LK Proposals

Este guia orienta você através de cada etapa para configurar e rodar o sistema localmente.

## ✅ Pré-requisitos

Certifique-se de que você tem instalado:

```bash
# Verificar Node.js (deve ser 18+)
node --version

# Verificar npm
npm --version

# Verificar PostgreSQL (deve estar rodando)
psql --version
```

Se não tiver PostgreSQL instalado, recomendo usar Docker:

```bash
# Docker para PostgreSQL
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

## 📝 Configuração Inicial (5 minutos)

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

Copie o arquivo de exemplo:
```bash
cp .env.example .env.local
```

Edite `.env.local` e configure:
```env
# Local (desenvolvimento)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/proposal_system

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-random-secret-aqui-pode-ser-qualquer-coisa
```

### 3. Criar Banco de Dados

```bash
# Criar o banco
createdb proposal_system

# Executar migrações
npx prisma migrate dev --name init
```

Isso vai:
- Criar todas as tabelas
- Gerar o cliente Prisma
- Preparar o banco

### 4. Iniciar o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

Você verá:
- ✅ Landing page profissional
- ✅ Botões "Entrar" e "Começar Grátis"
- ✅ Descrição de features

## 🎯 Primeiros Passos no App

### 1. Acessar Dashboard

```
URL: http://localhost:3000/dashboard
```

Você verá:
- 📊 4 cards de estatísticas
- 📝 Tabela de propostas recentes
- ⚡ Ações rápidas (Nova proposta, Novo cliente)
- 📈 Próximas ações

### 2. Criar Nova Proposta

```
Clique em "+ Nova Proposta" → /propostas/nova
```

O wizard terá 4 etapas:

**Etapa 1: Cliente**
- Nome da empresa
- Email
- WhatsApp
- Nome do projeto

**Etapa 2: Serviços**
- Selecione serviços
- Defina quantidade

**Etapa 3: Precificação**
- Sistema calcula automaticamente
- Vê sugestões de preço
- IA sugere upsells

**Etapa 4: Finalizar**
- Revise a proposta
- Gere PDF
- Envie ou salve rascunho

### 3. Gerenciar Clientes

```
http://localhost:3000/clientes
```

Aqui você pode:
- 👥 Ver todos os clientes
- 📞 Acessar contatos (email, WhatsApp, website)
- 📊 Ver histórico de propostas
- 💰 Total vendido por cliente

### 4. Biblioteca de Serviços

```
http://localhost:3000/servicos
```

Aqui você pode:
- 📚 Ver todos os serviços cadastrados
- ✏️ Editar serviços
- 🔑 Definir preços (mínimo, ideal, premium)
- 🕐 Configurar tempo estimado

### 5. Templates

```
http://localhost:3000/templates
```

- 📋 Ver templates disponíveis
- 🎨 Customizar templates
- ♻️ Usar template para nova proposta

### 6. Configurações

```
http://localhost:3000/configuracoes
```

Configure:
- 🏢 Dados da empresa
- 🎨 Identidade visual (logo, cores)
- 🔌 Integrações (APIs)

## 🧪 Testar Funcionalidades

### Criar Proposta de Teste

1. Acesse `/propostas/nova`
2. Preencha o formulário:
   - Cliente: "Tech Solutions Inc"
   - Email: "contato@tech.com"
   - Projeto: "Estratégia Digital"
3. Avance para Serviços
4. Selecione 2-3 serviços
5. Veja a precificação automática
6. Finalize

### Ver Dashboard com Dados

Após criar propostas, o dashboard mostrará:
- ✅ Propostas criadas
- ✅ Clientes adicionados
- ✅ Valor total
- ✅ Estatísticas

## 🛠️ Próximas Etapas de Desenvolvimento

### Curto Prazo (Próximas semanas)

```bash
# 1. Implementar geração de PDF
npm install jspdf html2canvas

# 2. Implementar autenticação (NextAuth)
npm install next-auth bcrypt

# 3. Integração com email
npm install resend

# 4. Adicionar IA
npm install openai
```

### Tarefas Principais

- [ ] API de autenticação (login/signup)
- [ ] Gerador de PDF funcional
- [ ] Integração OpenAI para IA
- [ ] Envio de email automático
- [ ] Integração WhatsApp (webhook)
- [ ] Dashboard com gráficos reais
- [ ] CRUD completo de clientes
- [ ] CRUD completo de serviços
- [ ] Validações e tratamento de erro

## 📚 Estrutura de Arquivos Importantes

```
# Páginas do App
app/dashboard/page.tsx          → Dashboard principal
app/propostas/page.tsx          → Lista de propostas
app/propostas/nova/page.tsx     → Wizard de criação
app/clientes/page.tsx           → Gerenciamento de clientes
app/servicos/page.tsx           → Biblioteca de serviços
app/templates/page.tsx          → Templates
app/configuracoes/page.tsx      → Configurações

# Componentes Reutilizáveis
components/ui/button.tsx        → Botão
components/ui/input.tsx         → Input
components/ui/card.tsx          → Card
components/dashboard/sidebar.tsx → Sidebar de navegação
components/dashboard/header.tsx  → Header com título

# Lógica de Negócio
lib/pricing-engine.ts           → Cálculo de preços
lib/utils.ts                    → Utilitários
lib/auth.ts                     → Autenticação (futura)

# Banco de Dados
prisma/schema.prisma            → Schema do BD
```

## 🔍 Verificar Dados no Banco

Para ver dados diretamente no banco:

```bash
# Abrir Prisma Studio (interface gráfica)
npx prisma studio
```

Abrirá em `http://localhost:5555`

Ou usar CLI:

```bash
# Ver usuários
psql proposal_system -c "SELECT * FROM \"User\";"

# Ver propostas
psql proposal_system -c "SELECT * FROM \"Proposta\";"

# Ver clientes
psql proposal_system -c "SELECT * FROM \"Cliente\";"
```

## 🚀 Deploy (Quando Pronto)

### Vercel (Frontend)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Banco de Dados

Use **Supabase** (PostgreSQL gerenciado):
1. Crie conta em supabase.com
2. Copie a URL do banco
3. Use em `DATABASE_URL` de produção

## ❓ Troubleshooting

### Erro: "Cannot find module..."

```bash
# Instalar dependências novamente
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Database connection failed"

```bash
# Verificar se PostgreSQL está rodando
psql postgres

# Se usar Docker
docker ps  # ver se container está rodando
docker logs postgres  # ver logs
```

### Erro: "Port 3000 already in use"

```bash
# Usar porta diferente
npm run dev -- -p 3001
```

### "Prisma not found"

```bash
# Regenerar Prisma
npx prisma generate
```

## 📞 Suporte

- 📧 Email: `contato@lkcomunicacao.com`
- 📱 WhatsApp: `(47) 99721-9572`
- 💻 GitHub: `github.com/larakreuschdesign-gif/lkcomunica-odigital`

## 📖 Referências

- [CLAUDE.md](./CLAUDE.md) - Visão geral do projeto
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura técnica
- [SAAS_STRATEGY.md](./SAAS_STRATEGY.md) - Estratégia de negócio
- [README.md](./README.md) - Documentação principal
- [Next.js Docs](https://nextjs.org)
- [Prisma Docs](https://prisma.io)
- [TailwindCSS Docs](https://tailwindcss.com)

---

**Pronto para começar? 🚀**

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000
