# Setup do Supabase

Guia completo para configurar o Supabase para a plataforma Roteiro Pro.

## 1. Criar Conta e Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub, Google ou email
4. Crie um novo projeto:
   - Name: `roteiro-pro`
   - Database Password: gere uma senha forte
   - Region: Escolha a mais próxima (São Paulo - sa-east-1)
   - Clique "Create new project"

## 2. Obter as Chaves de API

1. Acesse Settings → API
2. Copie:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service_role secret)

3. Adicione ao arquivo `.env.local`

## 3. Criar Tabelas

Acesse SQL Editor no Supabase e execute:

```sql
-- Habilitar UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Projetos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in-progress', 'completed', 'archived')),
  input JSONB NOT NULL,
  script JSONB,
  thumbnail TEXT,
  category TEXT,
  folder TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_status ON projects(status);

-- Tabela de Templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  platform TEXT[] NOT NULL,
  duration INTEGER,
  structure JSONB,
  hooks TEXT[],
  cta_examples TEXT[],
  thumbnail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para templates
CREATE INDEX idx_templates_category ON templates(category);

-- Tabela de Sugestões
CREATE TABLE suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  script_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  hook_ideas TEXT[],
  cta_suggestions TEXT[],
  music_suggestions TEXT[],
  camera_angle_suggestions TEXT[],
  editing_suggestions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para sugestões
CREATE INDEX idx_suggestions_script_id ON suggestions(script_id);

-- RLS (Row Level Security) - Políticas de Segurança

-- Projects: Usuários só veem seus próprios projetos
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Suggestions: Associadas ao usuário via script
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view suggestions for their scripts"
  ON suggestions FOR SELECT
  USING (
    script_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Templates: Públicos, leitura para todos
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates"
  ON templates FOR SELECT
  USING (true);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 4. Dados Iniciais (Templates)

```sql
-- Inserir templates iniciais
INSERT INTO templates (name, description, category, platform, duration, structure) VALUES
(
  'Gancho Viral Reels',
  'Template para criar reels com gancho impactante',
  'reels',
  ARRAY['reels']::text[],
  30,
  '{"gancho": "3 segundos máximo", "scenes": 3}'
),
(
  'Tutorial TikTok',
  'Template para tutoriais rápidos no TikTok',
  'tutorial',
  ARRAY['tiktok']::text[],
  45,
  '{"gancho": "Hook imediato", "steps": 5}'
),
(
  'Testimonial LinkedIn',
  'Template para depoimentos profissionais',
  'testimonial',
  ARRAY['linkedin']::text[],
  60,
  '{"intro": "Apresentação", "testimonial": "Histórico", "cta": "Call-to-action"}'
);
```

## 5. Configurar Autenticação

1. Acesse Authentication → Providers
2. Habilite os provedores desejados:
   - Email/Password
   - Google OAuth
   - GitHub OAuth

3. Configure URLs de redirect:
   - URL Site: `https://seu-dominio.com`
   - URLs Redirect Autorizadas:
     - `http://localhost:3000/auth/callback`
     - `https://seu-dominio.com/auth/callback`

## 6. Storage (Opcional - para logos e imagens)

1. Acesse Storage
2. Crie um novo bucket:
   - Name: `projects`
   - Public: Não
   - File size limit: 10MB

3. Crie outro bucket:
   - Name: `public-assets`
   - Public: Sim

## 7. Variáveis de Ambiente

Adicione ao `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=projects
NEXT_PUBLIC_SUPABASE_PUBLIC_ASSETS_BUCKET=public-assets
```

## 8. Testar Conexão

Execute no seu terminal:

```bash
npm run dev
```

E acesse `http://localhost:3000/api/health` para testar a conexão.

## Troubleshooting

### Erro de Conexão
- Verifique as variáveis de ambiente
- Confirme que o projeto Supabase está ativo
- Verifique as políticas RLS

### Erro de RLS
- Confirme que o usuário está autenticado
- Verifique as políticas de segurança
- Verifique os user_ids

### Problema de Performance
- Adicione mais índices conforme necessário
- Use `EXPLAIN ANALYZE` para queries lentas

## Próximos Passos

- [ ] Backup automático configurado
- [ ] Monitoramento ativado
- [ ] Logs configurados
- [ ] Replicação de banco de dados (se necessário)

Para mais detalhes, consulte a [documentação oficial do Supabase](https://supabase.com/docs).
