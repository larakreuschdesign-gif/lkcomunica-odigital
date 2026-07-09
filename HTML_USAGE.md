# Como Usar o Arquivo HTML

## 📂 Arquivo Criado: `index.html`

Este é um arquivo HTML **standalone** que funciona completamente no navegador. Você pode abrir diretamente ou servir via HTTP.

## 🚀 Como Usar

### Opção 1: Abrir Direto no Navegador (Mais Fácil)
```bash
# Abra o arquivo no navegador:
# Arraste o arquivo index.html para o navegador
# OU
# Clique duas vezes no index.html
```

**Funcionalidades Disponíveis:**
- ✅ Dashboard com features
- ✅ Formulário de novo roteiro
- ✅ Visualização de roteiros
- ✅ Armazenamento local (localStorage)
- ✅ UI responsiva e moderna
- ✅ Dark mode automático

**Limitação:** Geração de roteiros via IA requer o backend rodando.

### Opção 2: Com Backend (Funcionalidade Completa)

#### Passo 1: Inicie o Backend
```bash
npm install
npm run dev:backend
# Ou: npm run dev (frontend + backend juntos)
```

#### Passo 2: Abra o HTML
```bash
# Opção A: Direto no navegador
abrir index.html

# Opção B: Via servidor local
npx http-server
# Acesse: http://localhost:8080
```

#### Passo 3: Use a Aplicação
- Clique em "Novo Roteiro"
- Insira um gancho
- Configure opções
- Clique em "Gerar"
- Aguarde a IA gerar o roteiro

## 📱 Funcionalidades Implementadas

### ✅ Implementadas (Funcionam)
- Dashboard com visão geral
- Sidebar de navegação
- Formulário de novo roteiro
- Visualização de roteiros
- Armazenamento em localStorage
- Interface responsiva
- Dark mode automático
- Cópia de roteiro
- Histórico de roteiros

### 🔌 Requer Backend
- Geração via Claude AI
- Análise de roteiros
- Variações de hooks
- Variações de roteiros
- Sugestões de melhoria

## 🎨 Características do HTML

### Design
- ✨ Interface moderna e profissional
- 🎨 Paleta sofisticada (Indigo, Rose, Amber)
- 📱 Totalmente responsivo
- 🌙 Dark mode automático
- ⚡ Sem dependências externas (puro HTML/CSS/JS)

### Armazenamento
- LocalStorage para salvar roteiros
- Dados persistem entre sessões
- Sem servidor necessário

### API Endpoints Suportados
Se o backend estiver rodando:
- `POST /api/scripts/generate` - Gerar novo roteiro
- `GET /api/scripts` - Buscar roteiros
- Todos os outros endpoints disponíveis

## 🔧 Personalização

### Mudar Cores
No `<style>`, modifique as variáveis CSS:
```css
:root {
  --primary: #6366f1;      /* Azul Índigo */
  --secondary: #ec4899;    /* Rosa */
  --accent: #f59e0b;       /* Âmbar */
}
```

### Adicionar Opções
No formulário, modifique os `<select>`:
```html
<select id="platform" class="select">
  <option value="Sua Plataforma">Sua Plataforma</option>
</select>
```

## 📊 Estrutura do Arquivo

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta tags e título -->
    <!-- Estilos CSS (inline) -->
  </head>
  <body>
    <!-- Sidebar de navegação -->
    <!-- Páginas (Dashboard, Builder, Result, Scripts) -->
    <!-- Scripts JavaScript (inline) -->
  </body>
</html>
```

## 🌐 Integração com Backend

### Configuração
Por padrão, o arquivo aponta para:
```javascript
apiUrl: 'http://localhost:5000/api'
```

Se sua API está em outro lugar, modifique:
```javascript
const app = {
  apiUrl: 'http://seu-servidor.com/api'
}
```

### Fluxo de Geração
1. Usuário preenche formulário
2. JavaScript envia dados para `/api/scripts/generate`
3. Backend (Claude AI) gera roteiro
4. Roteiro é exibido na página
5. Roteiro é salvo em localStorage

## 💾 LocalStorage

Roteiros são salvos automaticamente em localStorage:
```javascript
// Visualizar no console
localStorage.getItem('scripts')

// Limpar dados
localStorage.clear()
```

## 🐛 Troubleshooting

### "Erro ao gerar roteiro"
- ✅ Verifique se backend está rodando: `npm run dev`
- ✅ Confirme que API key está configurada em `.env`
- ✅ Abra DevTools (F12) e veja a mensagem de erro

### "Estilos não carregam"
- ✅ O arquivo já tem CSS embutido, não precisa de arquivos externos
- ✅ Verifique se o arquivo não foi modificado

### "Roteiros não salvam"
- ✅ Cheque se localStorage está habilitado
- ✅ Abra DevTools > Application > LocalStorage

### "Backend não conecta"
- ✅ Inicie com: `npm run dev:backend`
- ✅ Verifique se está rodando em `http://localhost:5000`
- ✅ Verifique CORS (deve estar habilitado)

## 📝 Exemplo de Uso Completo

### 1. Setup Completo
```bash
npm install
npm run dev
```

### 2. Abrir em Browser
```
http://localhost:5173  (React/Vite - mais completo)
ou
abrir index.html (HTML puro - mais simples)
```

### 3. Gerar Primeiro Roteiro
- Clique em "Novo Roteiro"
- Digite: "Você está desperdiçando dinheiro com marketing"
- Selecione: Instagram Reels / Engajamento / Conversacional
- Clique em "Gerar"
- Aguarde 5-10 segundos

### 4. Visualizar Resultado
- Veja as cenas estruturadas
- Leia o texto para falar
- Copie para usar em outro lugar

## 🔒 Segurança

- ✅ Sem API keys expostas no HTML
- ✅ CORS habilitado no backend
- ✅ Dados salvos apenas localmente
- ✅ Sem envio de dados para terceiros

## 📱 Uso em Mobile

O arquivo funciona perfeitamente em mobile:

```bash
# No computador
npx http-server

# No celular (mesmo WiFi)
abra http://SEU_IP:8080
```

Encontre seu IP:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

## 🎯 Casos de Uso

### Caso 1: Desenvolvimento
```bash
npm run dev  # React completo + backend
```

### Caso 2: Demo / Apresentação
```bash
# Abra index.html direto no navegador
# Funciona sem internet (use localStorage)
```

### Caso 3: Integração em Website
```html
<!-- Copie o conteúdo do index.html -->
<!-- Adpte conforme necessário -->
```

### Caso 4: PWA / App
```html
<!-- Adicione manifest.json -->
<!-- Funciona offline com service workers -->
```

## 🚀 Deploy

### Opção A: GitHub Pages
```bash
# Crie gh-pages branch
# Coloque index.html lá
# Acesse seu-user.github.io/seu-repo
```

### Opção B: Servidor Simples
```bash
# Python
python -m http.server 8000

# Node
npx http-server

# PHP
php -S localhost:8000
```

### Opção C: Com React/Vite
```bash
npm run build
npm start
```

## 📖 Documentação Relacionada

- **README.md** - Visão geral do projeto
- **QUICK_START.md** - Setup rápido
- **DEVELOPMENT.md** - Para desenvolvedores
- **PROJECT_SUMMARY.md** - Resumo completo

---

## ✨ Resumo

| Aspecto | Descrição |
|---------|-----------|
| **Arquivo** | `index.html` (único arquivo) |
| **Tamanho** | ~50KB (todo conteúdo embutido) |
| **Dependências** | Nenhuma (puro HTML/CSS/JS) |
| **Backend Necessário** | Opcional (para geração IA) |
| **Armazenamento** | LocalStorage (no navegador) |
| **Responsividade** | 100% mobile-friendly |
| **Dark Mode** | Automático |
| **Suporte | Todos os navegadores modernos |

---

**Pronto para usar! 🚀**

Abra `index.html` no navegador e comece a gerar roteiros agora mesmo!
