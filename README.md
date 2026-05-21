# Roteiro Pro - Gerador de Roteiros Profissionais

🎬 Plataforma SaaS inteligente para geração automática de roteiros profissionais para vídeos em redes sociais, campanhas publicitárias e anúncios.

## 🌟 Funcionalidades

### Core Features
- ✨ **Geração por IA** - Claude integrado para criar roteiros estruturados em segundos
- 📝 **Editor Inteligente** - Edite e customize todos os aspectos do roteiro
- 📄 **Exportação Premium** - PDF profissional e DOCX prontos para apresentação
- 🎨 **Design Responsivo** - Interface moderna e intuitiva similar a Notion + Canva + ChatGPT
- 💾 **Organização Completa** - Salve, organize em pastas e busque seus roteiros
- 📱 **Multi-plataforma** - Otimizado para Reels, TikTok, YouTube Shorts, LinkedIn, Instagram

### Recursos Adicionais
- 📚 Biblioteca de templates por nicho
- 🎯 Sugestões automáticas de ganchos virais
- 🎬 Sugestões de enquadramento e edição
- 📊 Contador de palavras e cronômetro de duração
- 🌙 Modo escuro nativo
- 👥 Múltiplas plataformas em uma criação

## 🛠 Stack Tecnológico

### Frontend
- **Next.js 14** - Framework React com SSR/SSG
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Styling moderno
- **Framer Motion** - Animações suaves
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Backend & Dados
- **Next.js API Routes** - Backend integrado
- **Supabase** - Banco de dados PostgreSQL e autenticação
- **Anthropic Claude API** - IA para geração de roteiros

### PDF & Exportação
- **jsPDF** - Geração de PDFs
- **Puppeteer** - Renderização avançada (opcional)

## 📋 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── globals.css             # Estilos globais
│   ├── page.tsx               # Página inicial
│   ├── create/
│   │   └── page.tsx           # Criar novo roteiro
│   ├── dashboard/
│   │   └── page.tsx           # Dashboard de projetos
│   └── api/
│       ├── auth/              # Autenticação
│       ├── scripts/           # Geração de roteiros
│       └── projects/          # CRUD de projetos
├── components/
│   ├── ui/                    # Componentes base reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── layout/                # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── home/                  # Componentes da homepage
│   │   ├── Hero.tsx
│   │   └── Features.tsx
│   └── create/                # Componentes de criação
│       └── ScriptForm.tsx
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   ├── ai.ts                 # Serviços de IA
│   ├── pdf-generator.ts      # Geração de PDFs
│   └── utils.ts              # Utilitários
├── hooks/
│   └── useAuth.ts            # Hook de autenticação
├── types/
│   └── index.ts              # Tipos TypeScript
└── utils/
    └── validators.ts         # Validações
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase (gratuita)
- Chave de API Anthropic Claude

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/roteiro-pro.git
cd roteiro-pro
```

2. Instale as dependências
```bash
npm install
```

3. Configure variáveis de ambiente
```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
ANTHROPIC_API_KEY=sua_chave_anthropic
```

4. Execute o servidor de desenvolvimento
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📚 Guia de Uso

### Criar um Roteiro

1. Clique em "Criar Novo Roteiro"
2. Preencha as informações do projeto:
   - Nome do cliente
   - Título do vídeo
   - Objetivo
   - Plataformas alvo
   - Tipo de conteúdo
   - Tom de voz
   - Público-alvo
   - Detalhes adicionais

3. Clique em "Gerar com IA"
4. A IA gerará um roteiro completo com:
   - Gancho inicial
   - Objetivo estratégico
   - Cenas detalhadas
   - Sugestões criativas
   - Call-to-action

5. Edite conforme necessário
6. Exporte em PDF ou DOCX

## 🔧 Configuração do Banco de Dados

### Tabelas Necessárias

```sql
-- Tabela de Projetos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  client_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  input JSONB,
  script JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabela de Templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  structure JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabela de Sugestões (opcional)
CREATE TABLE suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  script_id UUID REFERENCES projects(id),
  hooks JSONB,
  ctas JSONB,
  music JSONB,
  created_at TIMESTAMP DEFAULT now()
);
```

## 📖 API Endpoints

### Autenticação
- `POST /api/auth/signup` - Registrar novo usuário
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout

### Projetos/Roteiros
- `GET /api/projects` - Listar roteiros do usuário
- `POST /api/projects` - Criar novo roteiro
- `GET /api/projects/:id` - Obter roteiro específico
- `PUT /api/projects/:id` - Atualizar roteiro
- `DELETE /api/projects/:id` - Deletar roteiro

### Geração
- `POST /api/scripts/generate` - Gerar roteiro com IA
- `POST /api/suggestions/generate` - Gerar sugestões criativas

### Exportação
- `POST /api/export/pdf` - Exportar como PDF
- `POST /api/export/docx` - Exportar como DOCX

## 🎨 Temas e Customização

### Cores da Marca
As cores podem ser customizadas em `tailwind.config.ts`:

```ts
colors: {
  brand: {
    500: '#8f39ff',
    600: '#7d1eff',
    // ...
  }
}
```

### Tipografia
- Fonte principal: Sistema padrão do SO
- Headings: Peso bold
- Body: Peso normal

## 📊 Métricas e Analytics (Planejado)

- Rastrear uso de IA
- Análise de plataformas mais utilizadas
- Estatísticas de criação
- Feedback do usuário

## 🔐 Segurança

- Autenticação com Supabase (JWT)
- Variáveis de ambiente protegidas
- Validação de entrada com Zod
- CORS configurado
- Rate limiting planejado

## 🚢 Deploy

### Vercel (Recomendado)

1. Push seu código para GitHub
2. Conecte seu repositório no Vercel
3. Configure variáveis de ambiente
4. Deploy automático

```bash
npm run build
npm run start
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Roteiro de Desenvolvimento

- [x] Setup inicial com Next.js
- [x] UI components base
- [x] Integração com Supabase
- [x] Integração com Claude API
- [x] Sistema de formulários
- [x] Geração de PDFs
- [ ] Dashboard completo
- [ ] Templates library
- [ ] Sistema de compartilhamento
- [ ] Analytics dashboard
- [ ] Suporte multilíngue
- [ ] API pública para integrações

## 🐛 Problemas Conhecidos

Nenhum no momento.

## 💬 Suporte

Para dúvidas ou problemas, entre em contato:
- Email: support@roteiropro.com
- GitHub Issues: [projeto/issues](https://github.com/seu-usuario/roteiro-pro/issues)

## 📄 Licença

MIT - Veja arquivo LICENSE para detalhes

## 👨‍💼 Autor

Desenvolvido por [Seu Nome/Empresa]

---

**Roteiro Pro** - Transformando ideias em roteiros profissionais ✨
