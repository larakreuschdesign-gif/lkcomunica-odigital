// ═══════════════════════════════════════════════════════════
// FINANCIAL MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════

const API_BASE = 'http://localhost:3000/api';
let currentPage = 'dashboard';
let currentMonth = null;
let allData = {
  clients: [],
  fixedExpenses: [],
  companyExpenses: [],
  extraExpenses: [],
  thirdPartyExpenses: [],
  investments: [],
  settings: {}
};

// ═══════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
  initializeTheme();
  setupEventListeners();
  initializeMonthSelect();
  await loadAllData();
  renderPage('dashboard');
});

// ═══════════════════════════════════════════════════════════
// THEME MANAGEMENT
// ═══════════════════════════════════════════════════════════

function initializeTheme() {
  const html = document.documentElement;
  const isDark = localStorage.getItem('theme') === 'dark';

  if (isDark) {
    html.classList.add('dark-theme');
    document.getElementById('themeToggle').textContent = '☀️';
  } else {
    html.classList.remove('dark-theme');
    document.getElementById('themeToggle').textContent = '🌙';
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

// ═══════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav__item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      renderPage(page);
    });
  });

  // Theme
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Month Select
  document.getElementById('monthSelect').addEventListener('change', (e) => {
    currentMonth = e.target.value;
    loadAllData();
  });

  // Modals
  setupModalListeners('client');
  setupModalListeners('fixedExpense');
  setupModalListeners('companyExpense');
  setupModalListeners('extraExpense');
  setupModalListeners('thirdParty');
  setupModalListeners('investment');

  // Add buttons
  document.getElementById('addClientBtn')?.addEventListener('click', () => openModal('client'));
  document.getElementById('addFixedExpenseBtn')?.addEventListener('click', () => openModal('fixedExpense'));
  document.getElementById('addCompanyExpenseBtn')?.addEventListener('click', () => openModal('companyExpense'));
  document.getElementById('addExtraExpenseBtn')?.addEventListener('click', () => openModal('extraExpense'));
  document.getElementById('addThirdPartyBtn')?.addEventListener('click', () => openModal('thirdParty'));
  document.getElementById('addInvestmentBtn')?.addEventListener('click', () => openModal('investment'));

  // Filters
  document.getElementById('clientSearch')?.addEventListener('input', () => renderClientsTable());
  document.getElementById('clientStatusFilter')?.addEventListener('change', () => renderClientsTable());
  document.getElementById('fixedExpenseSearch')?.addEventListener('input', () => renderFixedExpensesTable());
  document.getElementById('fixedExpenseCategoryFilter')?.addEventListener('change', () => renderFixedExpensesTable());
  document.getElementById('companyExpenseSearch')?.addEventListener('input', () => renderCompanyExpensesTable());
  document.getElementById('companyExpenseCategoryFilter')?.addEventListener('change', () => renderCompanyExpensesTable());
  document.getElementById('extraExpenseSearch')?.addEventListener('input', () => renderExtraExpensesTable());
  document.getElementById('thirdPartySearch')?.addEventListener('input', () => renderThirdPartyTable());
  document.getElementById('thirdPartyStatusFilter')?.addEventListener('change', () => renderThirdPartyTable());
  document.getElementById('investmentSearch')?.addEventListener('input', () => renderInvestmentsTable());

  // Extra expense installment toggle
  document.getElementById('eexpIsInstallment')?.addEventListener('change', (e) => {
    const group = document.getElementById('eexpInstallmentGroup');
    group.style.display = e.target.value === 'true' ? 'block' : 'none';
  });

  // Export buttons
  document.getElementById('exportPdfBtn')?.addEventListener('click', () => exportReport('pdf'));
  document.getElementById('exportExcelBtn')?.addEventListener('click', () => exportReport('excel'));
  document.getElementById('exportCsvBtn')?.addEventListener('click', () => exportReport('csv'));

  // Overlay close
  document.getElementById('modalOverlay').addEventListener('click', closeAllModals);
}

function setupModalListeners(type) {
  const modal = document.getElementById(`${type}Modal`);
  const closeBtn = document.getElementById(`${type}ModalClose`);
  const cancelBtn = document.getElementById(`${type}ModalCancel`);
  const form = document.getElementById(`${type}Form`);

  closeBtn?.addEventListener('click', closeAllModals);
  cancelBtn?.addEventListener('click', closeAllModals);
  form?.addEventListener('submit', (e) => handleFormSubmit(e, type));
}

// ═══════════════════════════════════════════════════════════
// MONTH MANAGEMENT
// ═══════════════════════════════════════════════════════════

function initializeMonthSelect() {
  const now = new Date();
  const select = document.getElementById('monthSelect');

  // Add current month and next 11 months
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    const option = document.createElement('option');
    option.value = value;
    option.textContent = label.charAt(0).toUpperCase() + label.slice(1);

    if (i === 0) {
      option.selected = true;
      currentMonth = value;
    }

    select.appendChild(option);
  }

  updateCurrentDate();
}

function updateCurrentDate() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

// ═══════════════════════════════════════════════════════════
// DATA LOADING
// ═══════════════════════════════════════════════════════════

async function loadAllData() {
  try {
    const month = currentMonth || getCurrentMonth();

    const [clients, fixedExp, companyExp, extraExp, thirdParty, investments] = await Promise.all([
      fetch(`${API_BASE}/clients?month=${month}`).then(r => r.json()),
      fetch(`${API_BASE}/fixed-expenses?month=${month}`).then(r => r.json()),
      fetch(`${API_BASE}/company-expenses?month=${month}`).then(r => r.json()),
      fetch(`${API_BASE}/extra-expenses?month=${month}`).then(r => r.json()),
      fetch(`${API_BASE}/third-party-expenses?month=${month}`).then(r => r.json()),
      fetch(`${API_BASE}/investments?month=${month}`).then(r => r.json())
    ]);

    allData = {
      clients: clients || [],
      fixedExpenses: fixedExp || [],
      companyExpenses: companyExp || [],
      extraExpenses: extraExp || [],
      thirdPartyExpenses: thirdParty || [],
      investments: investments || []
    };

    updateDashboard();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// ═══════════════════════════════════════════════════════════
// PAGE RENDERING
// ═══════════════════════════════════════════════════════════

function renderPage(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

  // Show selected page
  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) {
    pageEl.style.display = 'block';
  }

  // Update active nav
  document.querySelectorAll('.nav__item').forEach(item => {
    item.classList.toggle('nav__item--active', item.dataset.page === page);
  });

  // Update title
  const titles = {
    dashboard: 'Dashboard',
    clients: 'Entradas - Clientes',
    'fixed-expenses': 'Gastos Fixos',
    'company-expenses': 'Gastos da Empresa',
    'extra-expenses': 'Gastos Extras',
    'third-party': 'Despesas de Terceiros',
    investments: 'Investimentos',
    summary: 'Resumo Financeiro',
    calendar: 'Calendário Financeiro',
    reports: 'Relatórios'
  };

  document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
  currentPage = page;

  // Render specific content
  if (page === 'dashboard') {
    updateDashboard();
  } else if (page === 'clients') {
    renderClientsTable();
  } else if (page === 'fixed-expenses') {
    renderFixedExpensesTable();
  } else if (page === 'company-expenses') {
    renderCompanyExpensesTable();
  } else if (page === 'extra-expenses') {
    renderExtraExpensesTable();
  } else if (page === 'third-party') {
    renderThirdPartyTable();
  } else if (page === 'investments') {
    renderInvestmentsPage();
  } else if (page === 'summary') {
    renderSummaryPage();
  } else if (page === 'calendar') {
    renderCalendar();
  } else if (page === 'reports') {
    renderReportsPage();
  }
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════

function updateDashboard() {
  const revenue = calculateRevenue();
  const expenses = calculateExpenses();
  const invested = calculateInvested();
  const balance = revenue.received - expenses.total;

  // Update KPIs
  document.getElementById('kpi-revenue').textContent = formatCurrency(revenue.received);
  document.getElementById('kpi-expenses').textContent = formatCurrency(expenses.total);
  document.getElementById('kpi-balance').textContent = formatCurrency(balance);
  document.getElementById('kpi-investments').textContent = formatCurrency(invested);
  document.getElementById('kpi-pending').textContent = formatCurrency(revenue.pending);
  document.getElementById('kpi-received').textContent = formatCurrency(revenue.received);
  document.getElementById('pending-count').textContent = allData.clients.filter(c => c.status === 'pending').length;
  document.getElementById('paid-count').textContent = allData.clients.filter(c => c.status === 'paid').length;

  // Render charts
  renderCharts();
}

function calculateRevenue() {
  const received = allData.clients
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.monthlyValue, 0);

  const pending = allData.clients
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.monthlyValue, 0);

  return { received, pending, total: received + pending };
}

function calculateExpenses() {
  const fixed = allData.fixedExpenses.reduce((sum, e) => sum + e.value, 0);
  const company = allData.companyExpenses.reduce((sum, e) => sum + e.value, 0);
  const extra = allData.extraExpenses.reduce((sum, e) => sum + e.totalValue, 0);
  const thirdParty = allData.thirdPartyExpenses
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.value, 0);

  return {
    fixed,
    company,
    extra,
    thirdParty,
    total: fixed + company + extra + thirdParty
  };
}

function calculateInvested() {
  return allData.investments.reduce((sum, i) => sum + i.value, 0);
}

// ═══════════════════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════════════════

function renderCharts() {
  renderRevenueExpensesChart();
  renderExpensesByCategoryChart();
  renderEvolutionChart();
  renderInvestmentsChart();
}

function renderRevenueExpensesChart() {
  const canvas = document.getElementById('chartRevenueExpenses');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const revenue = calculateRevenue();
  const expenses = calculateExpenses();

  // Simple chart rendering (you'd use Chart.js in production)
  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const maxValue = Math.max(revenue.received, expenses.total);
  const scale = canvas.height / maxValue || 1;

  ctx.fillStyle = '#E8F0FF';
  ctx.fillRect(50, canvas.height - (revenue.received * scale), 100, revenue.received * scale);

  ctx.fillStyle = '#FEE2E2';
  ctx.fillRect(200, canvas.height - (expenses.total * scale), 100, expenses.total * scale);

  ctx.fillStyle = '#666';
  ctx.font = '14px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Receitas', 100, canvas.height - (revenue.received * scale) - 10);
  ctx.fillText('Despesas', 250, canvas.height - (expenses.total * scale) - 10);
}

function renderExpensesByCategoryChart() {
  const canvas = document.getElementById('chartExpensesByCategory');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const categories = {};
  allData.fixedExpenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.value;
  });

  // Simple pie chart visualization
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;

  const entries = Object.entries(categories);
  const total = entries.reduce((sum, [_, value]) => sum + value, 0);

  let currentAngle = 0;
  const colors = ['#0066FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  entries.forEach(([category, value], index) => {
    const sliceAngle = (value / total) * Math.PI * 2;

    ctx.fillStyle = colors[index % colors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    currentAngle += sliceAngle;
  });
}

function renderEvolutionChart() {
  const canvas = document.getElementById('chartEvolution');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const ctx = canvas.getContext('2d');
  const revenue = calculateRevenue();
  const expenses = calculateExpenses();
  const balance = revenue.received - expenses.total;

  // Simple line chart
  ctx.strokeStyle = '#0066FF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, canvas.height / 2);
  ctx.lineTo(canvas.width - 50, canvas.height / 3);
  ctx.stroke();

  ctx.fillStyle = '#111';
  ctx.font = '12px Inter';
  ctx.fillText('Evolução do Saldo', 50, 20);
  ctx.fillText(formatCurrency(balance), canvas.width - 150, 20);
}

function renderInvestmentsChart() {
  const canvas = document.getElementById('chartInvestments');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const ctx = canvas.getContext('2d');
  const invested = calculateInvested();
  const goal = 7500; // Default goal

  const progress = (invested / goal) * 100;
  const barWidth = canvas.width - 100;
  const barHeight = 30;
  const barX = 50;
  const barY = canvas.height / 2 - barHeight / 2;

  // Background bar
  ctx.fillStyle = '#E5E7EB';
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // Progress bar
  ctx.fillStyle = '#10B981';
  ctx.fillRect(barX, barY, (barWidth * progress) / 100, barHeight);

  // Text
  ctx.fillStyle = '#111';
  ctx.font = 'bold 16px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.min(progress, 100).toFixed(0)}%`, canvas.width / 2, canvas.height - 30);
}

// ═══════════════════════════════════════════════════════════
// CLIENTS TABLE
// ═══════════════════════════════════════════════════════════

function renderClientsTable() {
  const tbody = document.getElementById('clientsTableBody');
  const search = document.getElementById('clientSearch')?.value || '';
  const statusFilter = document.getElementById('clientStatusFilter')?.value || '';

  let filtered = allData.clients;

  if (search) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (statusFilter) {
    filtered = filtered.filter(c => c.status === statusFilter);
  }

  tbody.innerHTML = filtered.map(client => `
    <tr>
      <td>${client.name}</td>
      <td>${formatCurrency(client.monthlyValue)}</td>
      <td>${client.paymentDay}</td>
      <td><span class="status-badge ${client.status}">${client.status === 'paid' ? 'Pago' : 'Pendente'}</span></td>
      <td>${client.paidDate ? new Date(client.paidDate).toLocaleDateString('pt-BR') : '-'}</td>
      <td>${client.notes || '-'}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editClient('${client.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteClient('${client.id}')">Deletar</button>
        </div>
      </td>
    </tr>
  `).join('');

  // Update totals
  const totalPrevisto = allData.clients.reduce((sum, c) => sum + c.monthlyValue, 0);
  const totalRecebido = allData.clients.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.monthlyValue, 0);
  const totalPendente = allData.clients.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.monthlyValue, 0);

  document.getElementById('clientTotalPrevisto').textContent = formatCurrency(totalPrevisto);
  document.getElementById('clientTotalRecebido').textContent = formatCurrency(totalRecebido);
  document.getElementById('clientTotalPendente').textContent = formatCurrency(totalPendente);
}

// ═══════════════════════════════════════════════════════════
// FIXED EXPENSES TABLE
// ═══════════════════════════════════════════════════════════

function renderFixedExpensesTable() {
  const tbody = document.getElementById('fixedExpensesTableBody');
  const search = document.getElementById('fixedExpenseSearch')?.value || '';
  const categoryFilter = document.getElementById('fixedExpenseCategoryFilter')?.value || '';

  let filtered = allData.fixedExpenses;

  if (search) {
    filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (categoryFilter) {
    filtered = filtered.filter(e => e.category === categoryFilter);
  }

  tbody.innerHTML = filtered.map(expense => `
    <tr>
      <td>${expense.name}</td>
      <td>${formatCurrency(expense.value)}</td>
      <td>${expense.category}</td>
      <td>${expense.paymentMethod}</td>
      <td>${new Date(expense.date).toLocaleDateString('pt-BR')}</td>
      <td><span class="status-badge ${expense.status}">${expense.status === 'paid' ? 'Pago' : 'Pendente'}</span></td>
      <td>${expense.notes || '-'}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editFixedExpense('${expense.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteFixedExpense('${expense.id}')">Deletar</button>
        </div>
      </td>
    </tr>
  `).join('');

  const total = allData.fixedExpenses.reduce((sum, e) => sum + e.value, 0);
  document.getElementById('fixedExpensesTotal').textContent = formatCurrency(total);

  renderFixedExpensesCategoryChart();
}

function renderFixedExpensesCategoryChart() {
  const canvas = document.getElementById('chartFixedByCategory');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const categories = {};
  allData.fixedExpenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.value;
  });

  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;

  const entries = Object.entries(categories);
  const total = entries.reduce((sum, [_, value]) => sum + value, 0);

  if (total === 0) {
    ctx.fillStyle = '#999';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Sem dados para exibir', centerX, centerY);
    return;
  }

  let currentAngle = 0;
  const colors = ['#0066FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

  entries.forEach(([_, value], index) => {
    const sliceAngle = (value / total) * Math.PI * 2;

    ctx.fillStyle = colors[index % colors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    currentAngle += sliceAngle;
  });
}

// ═══════════════════════════════════════════════════════════
// COMPANY EXPENSES TABLE
// ═══════════════════════════════════════════════════════════

function renderCompanyExpensesTable() {
  const tbody = document.getElementById('companyExpensesTableBody');
  const search = document.getElementById('companyExpenseSearch')?.value || '';
  const categoryFilter = document.getElementById('companyExpenseCategoryFilter')?.value || '';

  let filtered = allData.companyExpenses;

  if (search) {
    filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (categoryFilter) {
    filtered = filtered.filter(e => e.category === categoryFilter);
  }

  tbody.innerHTML = filtered.map(expense => `
    <tr>
      <td>${expense.name}</td>
      <td>${formatCurrency(expense.value)}</td>
      <td>${expense.category}</td>
      <td>${expense.paymentMethod}</td>
      <td>${new Date(expense.date).toLocaleDateString('pt-BR')}</td>
      <td><span class="status-badge ${expense.status}">${expense.status === 'paid' ? 'Pago' : 'Pendente'}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editCompanyExpense('${expense.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteCompanyExpense('${expense.id}')">Deletar</button>
        </div>
      </td>
    </tr>
  `).join('');

  const total = allData.companyExpenses.reduce((sum, e) => sum + e.value, 0);
  document.getElementById('companyExpensesTotal').textContent = formatCurrency(total);
}

// ═══════════════════════════════════════════════════════════
// EXTRA EXPENSES TABLE
// ═══════════════════════════════════════════════════════════

function renderExtraExpensesTable() {
  const tbody = document.getElementById('extraExpensesTableBody');
  const search = document.getElementById('extraExpenseSearch')?.value || '';

  let filtered = allData.extraExpenses;

  if (search) {
    filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  }

  tbody.innerHTML = filtered.map(expense => `
    <tr>
      <td>${expense.name}</td>
      <td>${formatCurrency(expense.totalValue)}</td>
      <td>${expense.category}</td>
      <td>${expense.paymentMethod}</td>
      <td>${expense.isInstallment ? `${expense.currentInstallment}/${expense.installmentCount}` : 'Não'}</td>
      <td>${new Date(expense.date).toLocaleDateString('pt-BR')}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editExtraExpense('${expense.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteExtraExpense('${expense.id}')">Deletar</button>
        </div>
      </td>
    </tr>
  `).join('');

  const total = allData.extraExpenses.reduce((sum, e) => sum + e.totalValue, 0);
  document.getElementById('extraExpensesTotal').textContent = formatCurrency(total);
}

// ═══════════════════════════════════════════════════════════
// THIRD PARTY TABLE
// ═══════════════════════════════════════════════════════════

function renderThirdPartyTable() {
  const tbody = document.getElementById('thirdPartyTableBody');
  const search = document.getElementById('thirdPartySearch')?.value || '';
  const statusFilter = document.getElementById('thirdPartyStatusFilter')?.value || '';

  let filtered = allData.thirdPartyExpenses;

  if (search) {
    filtered = filtered.filter(e =>
      e.personName.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (statusFilter) {
    filtered = filtered.filter(e => e.status === statusFilter);
  }

  tbody.innerHTML = filtered.map(expense => `
    <tr>
      <td>${expense.personName}</td>
      <td>${expense.description}</td>
      <td>${formatCurrency(expense.value)}</td>
      <td>${expense.category}</td>
      <td>${expense.paymentMethod}</td>
      <td><span class="status-badge ${expense.status}">${expense.status === 'received' ? 'Recebido' : 'Pendente'}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editThirdParty('${expense.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteThirdParty('${expense.id}')">Deletar</button>
        </div>
      </td>
    </tr>
  `).join('');

  const total = allData.thirdPartyExpenses
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.value, 0);
  document.getElementById('thirdPartyTotal').textContent = formatCurrency(total);
}

// ═══════════════════════════════════════════════════════════
// INVESTMENTS PAGE
// ═══════════════════════════════════════════════════════════

function renderInvestmentsPage() {
  renderInvestmentsTable();
  updateInvestmentGoal();
  renderInvestmentHistoryChart();
}

function renderInvestmentsTable() {
  const tbody = document.getElementById('investmentsTableBody');
  const search = document.getElementById('investmentSearch')?.value || '';

  let filtered = allData.investments;

  if (search) {
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  tbody.innerHTML = filtered.map(investment => `
    <tr>
      <td>${investment.name}</td>
      <td>${investment.category}</td>
      <td>${formatCurrency(investment.value)}</td>
      <td>${new Date(investment.date).toLocaleDateString('pt-BR')}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" onclick="editInvestment('${investment.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteInvestment('${investment.id}')">Deletar</button>
        </div>
      </td>
    </tr>
  `).join('');

  const total = allData.investments.reduce((sum, i) => sum + i.value, 0);
  const average = allData.investments.length > 0 ? total / allData.investments.length : 0;

  document.getElementById('investmentsTotal').textContent = formatCurrency(total);
  document.getElementById('investmentsAverage').textContent = formatCurrency(average);
}

function updateInvestmentGoal() {
  const invested = calculateInvested();
  const goal = 7500;
  const progress = Math.min((invested / goal) * 100, 100);

  document.getElementById('investmentProgressBar').style.width = `${progress}%`;
  document.getElementById('investmentInvested').textContent = formatCurrency(invested);
  document.getElementById('investmentGoalAmount').textContent = formatCurrency(goal);
}

function renderInvestmentHistoryChart() {
  const canvas = document.getElementById('chartInvestmentHistory');
  if (!canvas) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const invested = calculateInvested();
  const goal = 7500;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0066FF';
  ctx.font = 'bold 16px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(`Total Investido: ${formatCurrency(invested)}`, canvas.width / 2, 30);
  ctx.fillText(`Meta: ${formatCurrency(goal)}`, canvas.width / 2, 60);
}

// ═══════════════════════════════════════════════════════════
// SUMMARY PAGE
// ═══════════════════════════════════════════════════════════

function renderSummaryPage() {
  const revenue = calculateRevenue();
  const expenses = calculateExpenses();
  const invested = calculateInvested();
  const netRevenue = revenue.received - expenses.total;
  const savings = revenue.received - expenses.total - invested;

  // Revenue
  document.getElementById('summaryTotalReceived').textContent = formatCurrency(revenue.received);
  document.getElementById('summaryTotalPending').textContent = formatCurrency(revenue.pending);
  document.getElementById('summaryTotalRevenue').textContent = formatCurrency(revenue.total);

  // Expenses
  document.getElementById('summaryFixedExpenses').textContent = formatCurrency(expenses.fixed);
  document.getElementById('summaryCompanyExpenses').textContent = formatCurrency(expenses.company);
  document.getElementById('summaryExtraExpenses').textContent = formatCurrency(expenses.extra);
  document.getElementById('summaryThirdPartyExpenses').textContent = formatCurrency(expenses.thirdParty);
  document.getElementById('summaryTotalExpenses').textContent = formatCurrency(expenses.total);

  // Investments
  document.getElementById('summaryInvestments').textContent = formatCurrency(invested);

  // Balance
  document.getElementById('summaryNetRevenue').textContent = formatCurrency(netRevenue);
  document.getElementById('summaryFinalBalance').textContent = formatCurrency(netRevenue);

  // Indicators
  const expenseRatio = revenue.total > 0 ? (expenses.total / revenue.total) * 100 : 0;
  const investmentRatio = revenue.total > 0 ? (invested / revenue.total) * 100 : 0;

  document.getElementById('indicatorExpenseRatio').textContent = `${expenseRatio.toFixed(1)}%`;
  document.getElementById('indicatorExpenseRatioBar').style.width = `${Math.min(expenseRatio, 100)}%`;

  document.getElementById('indicatorInvestmentRatio').textContent = `${investmentRatio.toFixed(1)}%`;
  document.getElementById('indicatorInvestmentRatioBar').style.width = `${Math.min(investmentRatio, 100)}%`;

  document.getElementById('indicatorSavings').textContent = formatCurrency(savings);
  document.getElementById('indicatorComparison').textContent = formatCurrency(netRevenue);
}

// ═══════════════════════════════════════════════════════════
// CALENDAR
// ═══════════════════════════════════════════════════════════

function renderCalendar() {
  const container = document.getElementById('calendarContainer');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  let html = `
    <div class="calendar">
      <div class="calendar-header">
        <h3>${firstDay.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
        <button onclick="console.log('prev')">← Anterior</button>
        <button onclick="console.log('next')">Próximo →</button>
      </div>
      <div class="calendar-grid">
  `;

  const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
  weekdays.forEach(day => {
    html += `<div class="calendar-weekday">${day}</div>`;
  });

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const isOtherMonth = date.getMonth() !== month;
    const isToday = date.toDateString() === today.toDateString();

    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    let items = '';
    allData.clients.forEach(c => {
      if (c.paymentDay === date.getDate() && c.status === 'pending') {
        items += `<span class="calendar-day-item">📥 ${c.name}</span>`;
      }
    });

    allData.fixedExpenses.forEach(e => {
      if (new Date(e.date).getDate() === date.getDate()) {
        items += `<span class="calendar-day-item">💸 ${e.name}</span>`;
      }
    });

    html += `
      <div class="calendar-day ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}">
        <div class="calendar-day-number">${date.getDate()}</div>
        <div class="calendar-day-items">${items}</div>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
// REPORTS
// ═══════════════════════════════════════════════════════════

function renderReportsPage() {
  // Generate report content
  const revenue = calculateRevenue();
  const expenses = calculateExpenses();
  const invested = calculateInvested();

  const content = `
    <div style="margin-top: 24px;">
      <h3>Relatório Financeiro</h3>
      <p>Período: ${currentMonth || getCurrentMonth()}</p>

      <h4>Resumo</h4>
      <ul>
        <li>Receitas: ${formatCurrency(revenue.received)}</li>
        <li>Despesas: ${formatCurrency(expenses.total)}</li>
        <li>Investimentos: ${formatCurrency(invested)}</li>
        <li>Saldo: ${formatCurrency(revenue.received - expenses.total)}</li>
      </ul>
    </div>
  `;

  document.getElementById('reportContent').innerHTML = content;
}

function exportReport(format) {
  const revenue = calculateRevenue();
  const expenses = calculateExpenses();
  const invested = calculateInvested();

  const data = {
    period: currentMonth || getCurrentMonth(),
    revenue,
    expenses,
    investments: invested,
    balance: revenue.received - expenses.total
  };

  if (format === 'csv') {
    const csv = 'Período,Receitas,Despesas,Investimentos,Saldo\n' +
      `${data.period},${data.revenue.received},${data.expenses.total},${data.investments},${data.balance}`;

    downloadFile(csv, 'relatorio.csv', 'text/csv');
  } else if (format === 'excel') {
    alert('Excel export coming soon!');
  } else if (format === 'pdf') {
    alert('PDF export coming soon!');
  }
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════
// MODAL MANAGEMENT
// ═══════════════════════════════════════════════════════════

function openModal(type) {
  document.getElementById(`${type}Modal`).classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
  resetForm(type);
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.getElementById('modalOverlay').classList.remove('active');
}

function resetForm(type) {
  const form = document.getElementById(`${type}Form`);
  if (form) form.reset();
}

async function handleFormSubmit(e, type) {
  e.preventDefault();

  try {
    if (type === 'client') {
      const data = {
        name: document.getElementById('clientName').value,
        monthlyValue: parseFloat(document.getElementById('clientValue').value),
        paymentDay: parseInt(document.getElementById('clientDay').value),
        status: document.getElementById('clientStatus').value,
        paidDate: document.getElementById('clientPaidDate').value,
        notes: document.getElementById('clientNotes').value
      };

      const res = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        closeAllModals();
        await loadAllData();
        renderClientsTable();
      }
    } else if (type === 'fixedExpense') {
      const data = {
        name: document.getElementById('fexpName').value,
        value: parseFloat(document.getElementById('fexpValue').value),
        category: document.getElementById('fexpCategory').value,
        paymentMethod: document.getElementById('fexpPaymentMethod').value,
        date: document.getElementById('fexpDate').value,
        status: document.getElementById('fexpStatus').value,
        notes: document.getElementById('fexpNotes').value
      };

      const res = await fetch(`${API_BASE}/fixed-expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        closeAllModals();
        await loadAllData();
        renderFixedExpensesTable();
      }
    } else if (type === 'companyExpense') {
      const data = {
        name: document.getElementById('cexpName').value,
        value: parseFloat(document.getElementById('cexpValue').value),
        category: document.getElementById('cexpCategory').value,
        paymentMethod: document.getElementById('cexpPaymentMethod').value,
        date: document.getElementById('cexpDate').value,
        status: document.getElementById('cexpStatus').value
      };

      const res = await fetch(`${API_BASE}/company-expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        closeAllModals();
        await loadAllData();
        renderCompanyExpensesTable();
      }
    } else if (type === 'extraExpense') {
      const isInstallment = document.getElementById('eexpIsInstallment').value === 'true';
      const totalValue = parseFloat(document.getElementById('eexpValue').value);
      const installmentCount = isInstallment ? parseInt(document.getElementById('eexpInstallmentCount').value) : 1;

      const data = {
        name: document.getElementById('eexpName').value,
        category: document.getElementById('eexpCategory').value,
        paymentMethod: document.getElementById('eexpPaymentMethod').value,
        isInstallment,
        installmentCount: isInstallment ? installmentCount : null,
        currentInstallment: 1,
        totalValue,
        installmentValue: isInstallment ? totalValue / installmentCount : totalValue,
        date: document.getElementById('eexpDate').value
      };

      const res = await fetch(`${API_BASE}/extra-expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        closeAllModals();
        await loadAllData();
        renderExtraExpensesTable();
      }
    } else if (type === 'thirdParty') {
      const data = {
        personName: document.getElementById('tpPersonName').value,
        description: document.getElementById('tpDescription').value,
        value: parseFloat(document.getElementById('tpValue').value),
        category: document.getElementById('tpCategory').value,
        paymentMethod: document.getElementById('tpPaymentMethod').value,
        status: document.getElementById('tpStatus').value,
        isInstallment: false
      };

      const res = await fetch(`${API_BASE}/third-party-expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        closeAllModals();
        await loadAllData();
        renderThirdPartyTable();
      }
    } else if (type === 'investment') {
      const data = {
        name: document.getElementById('invName').value,
        category: document.getElementById('invCategory').value,
        value: parseFloat(document.getElementById('invValue').value),
        date: document.getElementById('invDate').value
      };

      const res = await fetch(`${API_BASE}/investments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        closeAllModals();
        await loadAllData();
        renderInvestmentsPage();
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ═══════════════════════════════════════════════════════════
// DELETE OPERATIONS
// ═══════════════════════════════════════════════════════════

async function deleteClient(id) {
  if (confirm('Tem certeza que deseja deletar este cliente?')) {
    await fetch(`${API_BASE}/clients/${id}`, { method: 'DELETE' });
    await loadAllData();
    renderClientsTable();
  }
}

async function deleteFixedExpense(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    await fetch(`${API_BASE}/fixed-expenses/${id}`, { method: 'DELETE' });
    await loadAllData();
    renderFixedExpensesTable();
  }
}

async function deleteCompanyExpense(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    await fetch(`${API_BASE}/company-expenses/${id}`, { method: 'DELETE' });
    await loadAllData();
    renderCompanyExpensesTable();
  }
}

async function deleteExtraExpense(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    await fetch(`${API_BASE}/extra-expenses/${id}`, { method: 'DELETE' });
    await loadAllData();
    renderExtraExpensesTable();
  }
}

async function deleteThirdParty(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    await fetch(`${API_BASE}/third-party-expenses/${id}`, { method: 'DELETE' });
    await loadAllData();
    renderThirdPartyTable();
  }
}

async function deleteInvestment(id) {
  if (confirm('Tem certeza que deseja deletar?')) {
    await fetch(`${API_BASE}/investments/${id}`, { method: 'DELETE' });
    await loadAllData();
    renderInvestmentsPage();
  }
}

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
}

// Edit functions (placeholders - implement as needed)
function editClient(id) {
  const client = allData.clients.find(c => c.id === id);
  if (client) {
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientValue').value = client.monthlyValue;
    document.getElementById('clientDay').value = client.paymentDay;
    document.getElementById('clientStatus').value = client.status;
    document.getElementById('clientPaidDate').value = client.paidDate || '';
    document.getElementById('clientNotes').value = client.notes || '';
    openModal('client');
  }
}

function editFixedExpense(id) {
  const expense = allData.fixedExpenses.find(e => e.id === id);
  if (expense) {
    document.getElementById('fexpName').value = expense.name;
    document.getElementById('fexpValue').value = expense.value;
    document.getElementById('fexpCategory').value = expense.category;
    document.getElementById('fexpPaymentMethod').value = expense.paymentMethod;
    document.getElementById('fexpDate').value = expense.date;
    document.getElementById('fexpStatus').value = expense.status;
    document.getElementById('fexpNotes').value = expense.notes || '';
    openModal('fixedExpense');
  }
}

function editCompanyExpense(id) {
  const expense = allData.companyExpenses.find(e => e.id === id);
  if (expense) {
    document.getElementById('cexpName').value = expense.name;
    document.getElementById('cexpValue').value = expense.value;
    document.getElementById('cexpCategory').value = expense.category;
    document.getElementById('cexpPaymentMethod').value = expense.paymentMethod;
    document.getElementById('cexpDate').value = expense.date;
    document.getElementById('cexpStatus').value = expense.status;
    openModal('companyExpense');
  }
}

function editExtraExpense(id) {
  const expense = allData.extraExpenses.find(e => e.id === id);
  if (expense) {
    document.getElementById('eexpName').value = expense.name;
    document.getElementById('eexpValue').value = expense.totalValue;
    document.getElementById('eexpCategory').value = expense.category;
    document.getElementById('eexpPaymentMethod').value = expense.paymentMethod;
    document.getElementById('eexpIsInstallment').value = expense.isInstallment ? 'true' : 'false';
    if (expense.isInstallment) {
      document.getElementById('eexpInstallmentCount').value = expense.installmentCount;
      document.getElementById('eexpInstallmentGroup').style.display = 'block';
    }
    document.getElementById('eexpDate').value = expense.date;
    openModal('extraExpense');
  }
}

function editThirdParty(id) {
  const expense = allData.thirdPartyExpenses.find(e => e.id === id);
  if (expense) {
    document.getElementById('tpPersonName').value = expense.personName;
    document.getElementById('tpDescription').value = expense.description;
    document.getElementById('tpValue').value = expense.value;
    document.getElementById('tpCategory').value = expense.category;
    document.getElementById('tpPaymentMethod').value = expense.paymentMethod;
    document.getElementById('tpStatus').value = expense.status;
    openModal('thirdParty');
  }
}

function editInvestment(id) {
  const investment = allData.investments.find(i => i.id === id);
  if (investment) {
    document.getElementById('invName').value = investment.name;
    document.getElementById('invCategory').value = investment.category;
    document.getElementById('invValue').value = investment.value;
    document.getElementById('invDate').value = investment.date;
    openModal('investment');
  }
}

// Auto-refresh data every 5 seconds
setInterval(() => {
  if (currentPage === 'dashboard') {
    loadAllData();
  }
}, 5000);
