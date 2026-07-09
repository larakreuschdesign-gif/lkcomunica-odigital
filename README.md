# ROTEIRO AI - Sistema Inteligente de Geração de Roteiros

Uma aplicação web moderna, rápida e profissional que transforma um gancho em um roteiro completo e pronto para gravação usando IA especializada em conteúdo para redes sociais.

## 🎯 Características Principais

- **Geração Instantânea**: De um gancho para um roteiro profissional em segundos
- **Inteligência Criativa**: IA especializada em estratégia, storytelling e copywriting para redes sociais
- **Pronto para Gravação**: Cada roteiro inclui direção de câmera, movimentos, expressões e textos completos
- **Interface Moderna**: Design minimalista, responsivo e intuitivo
- **Edição Completa**: Editar qualquer parte do roteiro gerado
- **Histórico de Roteiros**: Salve, gerencie e reutilize seus roteiros
- **Gestão de Marcas**: Configure contextos de marca para geração personalizada
- **Múltiplas Visualizações**: Modo estratégico e modo gravação

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- API key do Claude (Anthropic)

### Instalação

1. **Clone o repositório**
```bash
git clone <repo-url>
cd lkcomunica-odigital
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
cp .env.example .env
```

Edite `.env` e adicione sua chave da API:
```
ANTHROPIC_API_KEY=your_key_here
PORT=5000
DATABASE_PATH=./data/scripts.db
NODE_ENV=development
```

4. **Inicie o desenvolvimento**
```bash
npm run dev
```

Acesse:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Estrutura do Projeto

```
lkcomunica-odigital/
├── src/
│   ├── components/          # Componentes React
│   │   └── Sidebar.tsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.tsx
│   │   ├── ScriptBuilder.tsx
│   │   ├── ScriptResult.tsx
│   │   ├── MyScripts.tsx
│   │   └── Settings.tsx
│   ├── store/              # Estado global (Zustand)
│   │   └── useScriptStore.ts
│   ├── styles/             # CSS global
│   │   └── index.css
│   ├── App.tsx             # Componente raiz
│   └── main.tsx            # Entrada React
├── backend/
│   ├── src/
│   │   ├── server.js       # Servidor Express
│   │   ├── routes/         # Endpoints API
│   │   │   └── scripts.js
│   │   └── services/       # Serviços de negócio
│   │       ├── database.js
│   │       └── aiService.js
│   └── data/              # Banco de dados SQLite
├── public/                 # Arquivos estáticos
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎬 Fluxo de Uso

1. **Dashboard**: Visão geral e acesso rápido para novo roteiro
2. **Novo Roteiro**: 
   - Insira o gancho (obrigatório)
   - Configure opções (plataforma, objetivo, tom, etc.)
   - Gere o roteiro completo
3. **Visualizar Roteiro**:
   - Modo Estratégico: Análise completa
   - Modo Gravação: Formato otimizado para gravação
4. **Editar**: Modifique qualquer cena ou informação
5. **Exportar**: Copie, baixe PDF ou abra no modo teleprompter

## 📝 Campos de Entrada

### Obrigatório
- **Gancho Principal**: A ideia central do vídeo

### Opcional
- **Informações da Marca**: Nome, nicho, produto, público-alvo
- **Plataforma**: Instagram Reels, TikTok, YouTube Shorts, LinkedIn, Anúncio
- **Objetivo**: Alcance, Engajamento, Autoridade, Educação, Conversão, Venda, Leads, Posicionamento
- **Tom de Voz**: Profissional, Conversacional, Provocativo, Sofisticado, Educativo, Emocional, Inspirador, Premium, Humor inteligente
- **Formato**: Talking Head, Storytelling, POV, Entrevista, Vlog, Cinematográfico, UGC, Tutorial, Bastidores, Institucional, Lista, Comparativo, Quebra de objeção
- **Duração**: 15s, 30s, 45s, 60s, 90s
- **Informações Obrigatórias**: Dados, números, nomes que devem aparecer
- **Restrições**: Palavras proibidas, limitações da marca

## 🏗️ Estrutura do Roteiro Gerado

Cada roteiro inclui:
- **Título**: Identificação estratégica
- **Gancho**: Principal + versão otimizada
- **Objetivo Estratégico**: O que o vídeo pretende gerar
- **Resumo Criativo**: Conceito e progressão narrativa
- **Descrição Geral**: Ambiente, enquadramento, ritmo, energia
- **Cenas Detalhadas**:
  - Duração estimada
  - Objetivo da cena
  - Ambiente e descrição visual
  - Enquadramento (Close, Plano médio, etc.)
  - Expressão facial e energia corporal
  - Movimento corporal
  - Movimento de câmera
  - Texto falado (natural e gravável)
  - Texto na tela
  - Emoção principal
  - Direção criativa
  - Transição para próxima cena
- **CTA Final**: Específico e contextual
- **Direção Criativa**: Ritmo, estética, cortes, B-roll, legendas, elementos gráficos
- **Sugestão Musical**: Estilo, BPM, energia, momentos
- **Observações**: Cuidados, pontos críticos, pausas importantes

## 🤖 Integração com Claude AI

A aplicação usa o modelo Claude 3.5 Sonnet via API Anthropic para gerar roteiros. O sistema:

1. Analisa o gancho silenciosamente
2. Identifica tensão central, curiosidade, dor e desejo
3. Determina progressão narrativa ideal
4. Gera roteiro específico e estratégico
5. Garante texto falado natural e gravável

### Características da IA:
- Especializada em estratégia de conteúdo para redes sociais
- Prioriza retenção e padrão-breaking
- Evita conteúdo genérico e artificial
- Preserva identidade da marca
- Não inventa dados ou benefícios

## 💾 Banco de Dados

SQLite com duas tabelas principais:

**scripts**: Armazena informações gerais do roteiro
**scenes**: Armazena dados de cada cena

O banco é criado automaticamente no diretório `backend/data/`.

## 🔐 Segurança

- Variáveis sensíveis em `.env` (nunca commitar)
- API key do Claude segura no backend
- CORS configurado para desenvolvimento
- Validação de entrada nos endpoints

## 📱 Responsividade

Layout totalmente responsivo:
- **Desktop**: Layout horizontal com sidebar
- **Tablet**: Sidebar colapsível
- **Mobile**: Sidebar horizontal, cards empilhados

## 🎨 Design System

- **Cores**: Primário (Indigo), Secundário (Rose), Accent (Amber)
- **Tipografia**: Inter (corpo), espaçamento consistente
- **Componentes**: Buttons, Cards, Inputs, Badges
- **Dark Mode**: Suporte a tema escuro do sistema

## 🛠️ Desenvolvimento

### Scripts disponíveis

```bash
npm run dev              # Inicia frontend + backend
npm run dev:frontend    # Apenas frontend (Vite)
npm run dev:backend     # Apenas backend (Node watch)
npm run build           # Build para produção
npm run preview         # Preview da build
npm start              # Inicia servidor de produção
```

## 🚢 Deployment

### Preparação para produção

1. Build frontend:
```bash
npm run build
```

2. Variáveis de ambiente de produção:
```
NODE_ENV=production
ANTHROPIC_API_KEY=<seu-valor>
DATABASE_PATH=/path/to/scripts.db
PORT=<porta-desejada>
```

3. Iniciar:
```bash
npm start
```

O backend servirá tanto a API quanto os arquivos estáticos do frontend.

## 📊 Roadmap Futuro

- [ ] Sistema de templates
- [ ] Análise automática de qualidade (score 0-100)
- [ ] Geração de variações de roteiros
- [ ] Integração com Canva para designer
- [ ] Colaboração em tempo real
- [ ] Análise de performance de conteúdos publicados
- [ ] Sugestões de melhoria baseadas em analytics
- [ ] Integração com plataformas de publicação

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Commit com mensagens claras
3. Push e abra um Pull Request

## 📄 Licença

MIT

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 🙏 Créditos

Desenvolvido com IA e ❤️ para criadores de conteúdo profissional.

---

**ROTEIRO AI** - Transformando ganhos em roteiros prontos para gravação.
