# 🚀 Quick Start Guide

## 1️⃣ Instalação Rápida

### Backend Setup (Terminal 1)
```bash
cd financial-system/backend
npm install
npm start
```

Você verá:
```
Financial System API running on http://localhost:3000
Database initialized successfully
```

### Frontend Setup (Terminal 2)
```bash
cd financial-system/frontend
# Abra index.html no navegador
# OU use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000/index.html
```

---

## 2️⃣ Primeiros Passos

### Adicionar um Cliente
1. Clique em **"Entradas"** na barra lateral
2. Clique em **"+ Adicionar Cliente"**
3. Preencha:
   - Nome do cliente
   - Valor mensal (ex: 1500.00)
   - Dia do pagamento (ex: 15)
   - Status (Pago/Pendente)
4. Clique em **"Salvar"**

### Registrar uma Despesa Fixa
1. Clique em **"Gastos Fixos"** na barra lateral
2. Clique em **"+ Adicionar Gasto"**
3. Preencha:
   - Descrição (ex: "Aluguel")
   - Valor (ex: 1200.00)
   - Categoria (escolha na lista)
   - Forma de pagamento (PIX, Boleto, etc)
   - Data do lançamento
4. Clique em **"Salvar"**

### Registrar um Investimento
1. Clique em **"Investimentos"** na barra lateral
2. Clique em **"+ Registrar Investimento"**
3. Preencha:
   - Nome do investimento
   - Categoria
   - Valor
   - Data
4. Veja o progresso em relação à meta de R$ 7.500

---

## 3️⃣ Dashboard em Tempo Real

Toda vez que você adiciona, edita ou deleta algo:
- ✅ Os gráficos atualizam automaticamente
- ✅ Os totais mudam em tempo real
- ✅ O saldo recalcula instantaneamente
- ✅ Os indicadores se atualizam

**Não precisa recarregar a página!**

---

## 4️⃣ Principais Seções

### 📊 Dashboard
- Visão geral com 6 KPIs
- 4 gráficos interativos
- Atualização a cada 5 segundos

### 👥 Entradas
- Gestão de clientes
- Filtro por status
- Totalizações automáticas
- Histórico de pagamentos

### 🏠 Gastos Fixos
- 11 categorias pré-definidas
- Gráfico de distribuição
- Filtro por categoria

### 💼 Empresa
- Despesas separadas
- Categorias específicas

### 🎁 Gastos Extras
- Controle de parcelamento
- Acompanhamento de parcelas

### 🤝 Terceiros
- Registro de quem deve
- Controle de recebimento

### 📈 Investimentos
- Meta mensal (padrão: R$ 7.500)
- Barra de progresso visual
- Histórico mensal

### 📋 Resumo
- Consolidação de tudo
- 4 indicadores chave
- Análise comparativa

### 📅 Calendário
- Visualização por dia
- Eventos de receita/despesa
- Vencimentos destacados

### 📑 Relatórios
- Exportar em CSV
- Filtros avançados

---

## 5️⃣ Dicas de Uso

### 💡 Dica 1: Configurar Meta de Investimento
Na página de Investimentos, você pode ver a meta padrão de R$ 7.500. Para ajustar:
```javascript
// Edite a variável no código (futuro)
const INVESTMENT_GOAL = 8000; // Seu valor
```

### 💡 Dica 2: Buscar Rapidamente
Em qualquer tabela, use o campo de busca:
- Busca por nome do cliente
- Busca por descrição de despesa
- Busca em tempo real

### 💡 Dica 3: Filtrar por Mês
Use o seletor no topo direito para:
- Ver dados de meses passados
- Comparar períodos
- Analisar tendências

### 💡 Dica 4: Tema Escuro
Clique no ícone de lua 🌙 no rodapé da barra lateral para ativar modo escuro.

### 💡 Dica 5: Editar Registros
Clique em "Editar" em qualquer linha para modificar dados sem perder informações.

---

## 6️⃣ Estrutura de Dados

### Um Mês Completo Inclui:
- **Clientes**: Quem vai pagar você
- **Gastos Fixos**: Aluguel, internet, comida, etc
- **Gastos Empresa**: Despesas do negócio
- **Gastos Extras**: Compras eventuais
- **Terceiros**: O que outras pessoas devem
- **Investimentos**: Aplicações financeiras

### Totalizações Automáticas:
```
Receita Total = Clientes Pagos + Pendentes
Despesas Total = Fixas + Empresa + Extras + Terceiros
Saldo = Receita - Despesas - Investimentos
```

---

## 7️⃣ Atalhos de Teclado

| Ação | Como Fazer |
|------|-----------|
| Abrir modal | Clique no botão "+ Adicionar" |
| Fechar modal | ESC ou clique no X |
| Buscar | Ctrl+F ou use o campo de search |
| Mudar tema | Clique na lua 🌙 |
| Sair modal | ESC ou clique no overlay |

---

## 8️⃣ Troubleshooting

### ❌ Problema: "Não consigo conectar ao servidor"
**Solução:**
```bash
# Terminal 1: Inicie o backend
cd backend
npm start
# Veja se aparece: "running on http://localhost:3000"
```

### ❌ Problema: "Os dados não aparecem"
**Solução:**
1. Abra o DevTools (F12)
2. Vá para Network
3. Veja se as requisições vão para http://localhost:3000/api
4. Se não conseguir, o backend não está rodando

### ❌ Problema: "Adicionei algo mas não aparece"
**Solução:**
```javascript
// O dashboard atualiza a cada 5 segundos
// Se quiser forçar, execute no console:
loadAllData();
```

### ❌ Problema: "Banco de dados corrompido"
**Solução:**
```bash
# Delete o arquivo de dados
rm backend/financial.db
# Reinicie o servidor
npm start
```

---

## 9️⃣ Funções Úteis no Console

Abra o DevTools (F12) e execute:

```javascript
// Ver todos os dados
console.log(allData);

// Ver clientes do mês
console.log(allData.clients);

// Ver total de despesas
console.log(calculateExpenses());

// Recarregar dados
loadAllData();

// Mudar página
renderPage('dashboard');
```

---

## 🔟 Padrões de Uso

### Uso Pessoal
1. Adicione seus clientes no início do mês
2. Registre gastos diários
3. Marque como pago ao receber
4. Acompanhe investimentos mensais

### Uso Empresarial
1. Gerencie múltiplos clientes
2. Separe gastos por departamento
3. Controle despesas operacionais
4. Analise rentabilidade

### Controle de Projetos
1. Use clientes como "projetos"
2. Registre despesas por projeto
3. Gere relatórios comparativos
4. Acompanhe lucratividade

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se backend está rodando
2. Limpe cache do navegador (Ctrl+Shift+Del)
3. Recarregue a página (Ctrl+R ou Cmd+R)
4. Abra o console (F12) e veja os erros

---

## 🎉 Pronto!

Você está pronto para usar o sistema! 

**Próximos passos:**
- ✅ Adicione seus clientes
- ✅ Registre suas despesas
- ✅ Acompanhe investimentos
- ✅ Gere relatórios

**Divirta-se gerenciando suas finanças!** 💰✨

---

*Desenvolvido com ❤️ para simplificar sua vida financeira*
