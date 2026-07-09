# ROTEIRO AI - Quick Start Guide

Comece a gerar roteiros em menos de 5 minutos! 🚀

## ⚡ Setup Express (5 minutos)

### 1. Obter API Key
Acesse: https://console.anthropic.com/
- Crie conta ou faça login
- Copie sua API key

### 2. Clonar & Instalar
```bash
git clone <repo-url>
cd lkcomunica-odigital
npm install
```

### 3. Configurar Variáveis
```bash
cp .env.example .env
```

Edite `.env` e adicione sua chave:
```
ANTHROPIC_API_KEY=sk-ant-...sua-chave-aqui...
```

### 4. Iniciar Aplicação
```bash
npm run dev
```

### 5. Acessar
Abra no navegador:
```
http://localhost:5173
```

✅ **Pronto! Você já pode gerar roteiros!**

---

## 🎬 Seu Primeiro Roteiro (2 minutos)

### Passo 1: Dashboard
Clique em **"Gerar Roteiro Completo"**

### Passo 2: Insira o Gancho
Digite no campo principal. Exemplo:
```
"Você pode estar pagando imposto demais como PJ sem nem saber"
```

### Passo 3: Configure (Opcional)
Expanda as seções para configurar:
- Plataforma: Instagram Reels
- Objetivo: Engajamento
- Tom: Provocativo
- Formato: Talking Head

### Passo 4: Gerar
Clique em **"Gerar Roteiro Completo"**

Aguarde alguns segundos... ✨

### Passo 5: Visualizar
Você verá o roteiro com:
- Cenas estruturadas
- Textos para falar
- Direção de câmera
- Transições
- CTA final

### Passo 6: Modo Gravação
Clique em **"Modo Gravação"** para ver o texto formatado para ler durante a gravação.

### Passo 7: Editar (Opcional)
Clique em **"Editar"** em qualquer cena para fazer ajustes.

### Passo 8: Usar
- Copie para clipboard
- Exporte como PDF
- Use direto no teleprompter

---

## 💡 Dicas Rápidas

### Para Melhor Resultado

**Gancho Bom:** ✅
```
"A maioria dos empreendedores comete esse erro com impostos"
"Você talvez desista de ser PJ depois de conhecer isso"
"Se você ganha acima de R$5k/mês, precisa saber disto"
```

**Gancho Ruim:** ❌
```
"Vou falar sobre impostos" (genérico)
"Olá pessoal" (sem tensão)
"Saiba mais" (vago)
```

### Configurações que Funcionam

| Objetivo | Tom | Formato |
|----------|-----|---------|
| Engajamento | Provocativo | Talking Head |
| Conversão | Profissional | Storytelling |
| Educação | Conversacional | Tutorial |
| Viral | Humor inteligente | POV |
| Autoridade | Sofisticado | Cinematográfico |

### Plataformas Recomendadas

- **Instagram Reels**: 30-60s, Tom conversacional
- **TikTok**: 15-45s, Tom provocativo
- **YouTube Shorts**: 45-60s, Tom educativo
- **LinkedIn**: 30-60s, Tom profissional

---

## 🎯 Workflow Completo

```
DASHBOARD
    ↓
[Gerar Novo Roteiro]
    ↓
SCRIPT BUILDER
    ├─ Gancho: "Seu texto aqui"
    ├─ Plataforma: Instagram Reels
    ├─ Objetivo: Engajamento
    └─ Clique: "Gerar"
    ↓
AGUARDAR IA (5-10s)
    ↓
SCRIPT RESULT
    ├─ Modo Estratégico (análise completa)
    └─ Modo Gravação (texto formatado)
    ↓
EDITAR (opcional)
    ├─ Modificar cenas
    ├─ Adicionar/remover cenas
    └─ Salvar
    ↓
USAR
    ├─ Copiar texto
    ├─ Exportar PDF
    └─ Gravar vídeo
```

---

## 🔍 Troubleshooting Rápido

### "Erro: API key inválida"
- Verifique se copiou a chave inteira
- Verifique se está em `.env` (não .env.example)
- Tente uma nova chave do console Anthropic

### "Porta 5173 já em uso"
Frontend:
```bash
npm run dev:frontend -- --port 5174
```

### "Porta 5000 já em uso"
Backend:
```bash
PORT=5001 npm run dev:backend
```

### "Banco de dados corrompido"
```bash
rm backend/data/scripts.db
npm run dev  # Recria automaticamente
```

### "Nada aparece"
- Espere 5-10 segundos para IA gerar
- Verifique console (F12)
- Verifique se API key está ok

---

## 📱 Usar no Celular

A aplicação funciona perfeitamente em mobile!

1. No mesmo WiFi:
2. No PC: `npm run dev`
3. No celular: acesse `http://SEU_IP:5173`
   - Encontre seu IP: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)

---

## 📚 Próximos Passos

Após gerar seu primeiro roteiro:

1. **Testar Variações**
   - Clique em "Gerar Variações de Gancho"
   - Escolha uma alternativa
   - Veja como muda o roteiro

2. **Analisar Qualidade**
   - Clique em "Analisar Qualidade"
   - Veja o score 0-100
   - Leia recomendações

3. **Explorar Meus Roteiros**
   - Acesse "Meus Roteiros" no menu
   - Veja histórico
   - Reutilize roteiros anteriores

4. **Configurar Marcas**
   - Acesse "Configurações"
   - Adicione sua marca
   - Customize contexto

---

## 🎓 Recursos Adicionais

- **README.md** - Documentação completa
- **DEVELOPMENT.md** - Para desenvolvedores
- **PROJECT_SUMMARY.md** - Visão geral do projeto

---

## 🚀 Vamos Lá!

```bash
npm install
npm run dev
# Acesse http://localhost:5173
# Insira gancho
# Clique "Gerar"
# Gravação! 🎬
```

**Seu primeiro roteiro está pronto em segundos!**

---

*Dúvidas? Abra uma issue no repositório.*
