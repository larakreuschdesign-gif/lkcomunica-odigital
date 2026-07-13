# 💰 Gestor Financeiro Premium

Um sistema web financeiro completo, moderno e profissional para gestão de finanças pessoais e empresariais em tempo real.

## ✨ Características Principais

### Dashboard
- 📊 Visão geral completa do mês com KPIs
- 📈 Gráficos interativos em tempo real
- 🎯 Indicadores de receita, despesa, investimento e saldo

### 📥 Entradas (Clientes)
- Gestão completa de clientes
- Controle de recebimentos
- Status: Pago/Pendente
- Filtros por status e mês
- Histórico de pagamentos

### 🏠 Gastos Fixos
- Categorização automática
- 11 categorias pré-configuradas
- Formas de pagamento: PIX, Boleto, Cartão, Dinheiro, Outro
- Gráficos de distribuição por categoria
- Análise de tendências

### 💼 Gastos da Empresa
- Separação clara de despesas empresariais
- Categorias: Despesas de Trabalho e Assinaturas
- Rastreamento de pagamentos
- Relatórios consolidados

### 🎁 Gastos Extras
- Controle de despesas eventuais
- Sistema de parcelamento automático
- Tracking de parcelas
- Próximas parcelas destacadas

### 🤝 Despesas de Terceiros
- Registro de valores emprestados
- Rastreamento de quem deve
- Status de recebimento
- Controle de parcelamento

### 📈 Investimentos
- Meta mensal configurável
- Indicador de progresso visual
- Histórico de investimentos
- Análise de evolução
- Média mensal calculada automaticamente

### 📋 Resumo Financeiro
- Consolidação de todas as informações
- Indicadores chave:
  - % Despesas vs Receitas
  - % Destinado a Investimentos
  - Economia do mês
  - Comparativo Receita vs Despesas

### 📅 Calendário Financeiro
- Visualização interativa por dia
- Recebimentos previstos
- Despesas agendadas
- Vencimentos destacados
- Criação de lançamentos rápidos

### 📑 Relatórios
- Filtros por período, categoria, tipo
- Exportação em:
  - CSV (Excel)
  - PDF (em desenvolvimento)
  - Excel (em desenvolvimento)

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn

### Instalação

1. **Clone ou navegue até o diretório do projeto**
```bash
cd financial-system
```

2. **Instale as dependências do backend**
```bash
cd backend
npm install
```

3. **Inicie o servidor backend**
```bash
npm start
# ou com watch mode
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

4. **Em outro terminal, acesse o frontend**
```bash
cd frontend
# Abra o arquivo index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

## 🎨 Design & UX

- **Tema Claro/Escuro**: Alternância automática de tema
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Performance**: Carregamento instantâneo e sem lag
- **Animações**: Transições suaves e naturais
- **Tipografia**: Inter 400-800 weight
- **Cores**: Paleta premium com primária azul (#0066FF)

## 🔧 Tecnologias

### Backend
- **Express.js**: Framework web rápido
- **SQLite3**: Banco de dados leve e eficiente
- **UUID**: Geração de IDs únicos
- **CORS**: Suporte a requisições cross-origin

### Frontend
- **HTML5**: Semântica moderna
- **CSS3**: Grid, Flexbox, Custom Properties
- **JavaScript Vanilla**: Sem dependências externas
- **Canvas API**: Gráficos nativos
- **LocalStorage**: Persistência de preferências

## 📡 API Endpoints

### Clientes
- `GET /api/clients?month=YYYY-MM`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

### Gastos Fixos
- `GET /api/fixed-expenses?month=YYYY-MM`
- `POST /api/fixed-expenses`
- `PUT /api/fixed-expenses/:id`
- `DELETE /api/fixed-expenses/:id`

### Gastos Empresa
- `GET /api/company-expenses?month=YYYY-MM`
- `POST /api/company-expenses`
- `PUT /api/company-expenses/:id`
- `DELETE /api/company-expenses/:id`

### Gastos Extras
- `GET /api/extra-expenses?month=YYYY-MM`
- `POST /api/extra-expenses`
- `PUT /api/extra-expenses/:id`
- `DELETE /api/extra-expenses/:id`

### Despesas Terceiros
- `GET /api/third-party-expenses?month=YYYY-MM`
- `POST /api/third-party-expenses`
- `PUT /api/third-party-expenses/:id`
- `DELETE /api/third-party-expenses/:id`

### Investimentos
- `GET /api/investments?month=YYYY-MM`
- `POST /api/investments`
- `PUT /api/investments/:id`
- `DELETE /api/investments/:id`

### Dashboard
- `GET /api/dashboard`

## 💾 Persistência de Dados

Todos os dados são salvos automaticamente em banco de dados SQLite:
- **Arquivo**: `backend/financial.db`
- **Sincronização**: Instantânea após cada operação
- **Backup**: Realizado automaticamente

## 🎯 Funcionalidades Futuras

- [ ] Gráficos avançados com Chart.js
- [ ] Exportação PDF com design profissional
- [ ] Exportação Excel com formatação
- [ ] Autenticação de usuários
- [ ] Sincronização em nuvem
- [ ] App mobile (React Native)
- [ ] Integração com bancos
- [ ] Análise preditiva
- [ ] Notificações de vencimentos
- [ ] Multi-usuário

## 📊 Estrutura de Dados

### Clientes
```javascript
{
  id: UUID,
  name: string,
  monthlyValue: number,
  paymentDay: number (1-31),
  status: 'pending' | 'paid',
  paidDate: date | null,
  notes: string,
  month: YYYY-MM
}
```

### Despesas
```javascript
{
  id: UUID,
  name: string,
  value: number,
  category: string,
  paymentMethod: 'PIX' | 'Boleto' | 'Cartão' | 'Dinheiro' | 'Outro',
  status: 'pending' | 'paid',
  date: date,
  month: YYYY-MM
}
```

### Investimentos
```javascript
{
  id: UUID,
  name: string,
  category: string,
  value: number,
  date: date,
  month: YYYY-MM
}
```

## 🔐 Segurança

- Validação de entrada no backend
- CORS configurado
- SQLite com prepared statements
- Sem exposição de dados sensíveis

## 📝 Uso Recomendado

1. **Início do mês**: Adicione seus clientes e despesas fixas
2. **Diariamente**: Registre gastos e investimentos conforme ocorram
3. **A cada pagamento**: Atualize status de clientes
4. **Fim do mês**: Gere relatórios e analise performance

## 🆘 Troubleshooting

### Porta 3000 já em uso
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Banco de dados corrompido
```bash
# Delete e recrie
rm backend/financial.db
npm start
```

### Dados não atualizam
- Verifique se o backend está rodando
- Limpe o cache do navegador (F12 > Application > Clear)
- Verifique a conexão de rede

## 📄 Licença

MIT License - Livre para usar e modificar

## 👥 Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📧 Contato

Para dúvidas e sugestões, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para uma gestão financeira mais inteligente**
