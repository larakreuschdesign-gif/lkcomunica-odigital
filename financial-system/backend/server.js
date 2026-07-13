import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { initDatabase } from './database.js';
import db from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Initialize database on startup
await initDatabase();

// ═════════════════════════════════════════════
// HELPERS
// ═════════════════════════════════════════════

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// ═════════════════════════════════════════════
// CLIENTES (ENTRADAS)
// ═════════════════════════════════════════════

app.get('/api/clients', async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();
    const rows = await db.all(
      'SELECT * FROM clients WHERE month = ? ORDER BY paymentDay ASC',
      [month]
    );
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { name, monthlyValue, paymentDay, status, paidDate, notes } = req.body;
    const month = getCurrentMonth();
    const id = uuid();

    await db.run(
      `INSERT INTO clients (id, name, monthlyValue, paymentDay, status, paidDate, notes, month)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, monthlyValue, paymentDay, status || 'pending', paidDate || null, notes || null, month]
    );

    res.json({ id, name, monthlyValue, paymentDay, status, paidDate, notes, month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const { name, monthlyValue, paymentDay, status, paidDate, notes } = req.body;

    await db.run(
      `UPDATE clients SET name = ?, monthlyValue = ?, paymentDay = ?, status = ?, paidDate = ?, notes = ? WHERE id = ?`,
      [name, monthlyValue, paymentDay, status, paidDate || null, notes || null, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM clients WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// GASTOS FIXOS
// ═════════════════════════════════════════════

app.get('/api/fixed-expenses', async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();
    const rows = await db.all(
      'SELECT * FROM fixedExpenses WHERE month = ? ORDER BY date DESC',
      [month]
    );
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/fixed-expenses', async (req, res) => {
  try {
    const { name, status, paymentMethod, category, value, date, notes } = req.body;
    const month = getCurrentMonth();
    const id = uuid();

    await db.run(
      `INSERT INTO fixedExpenses (id, name, status, paymentMethod, category, value, date, notes, month)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, status || 'pending', paymentMethod, category, value, date, notes || null, month]
    );

    res.json({ id, name, status, paymentMethod, category, value, date, notes, month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/fixed-expenses/:id', async (req, res) => {
  try {
    const { name, status, paymentMethod, category, value, date, notes } = req.body;

    await db.run(
      `UPDATE fixedExpenses SET name = ?, status = ?, paymentMethod = ?, category = ?, value = ?, date = ?, notes = ? WHERE id = ?`,
      [name, status, paymentMethod, category, value, date, notes || null, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/fixed-expenses/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM fixedExpenses WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// GASTOS DA EMPRESA
// ═════════════════════════════════════════════

app.get('/api/company-expenses', async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();
    const rows = await db.all(
      'SELECT * FROM companyExpenses WHERE month = ? ORDER BY date DESC',
      [month]
    );
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/company-expenses', async (req, res) => {
  try {
    const { name, status, paymentMethod, category, value, date } = req.body;
    const month = getCurrentMonth();
    const id = uuid();

    await db.run(
      `INSERT INTO companyExpenses (id, name, status, paymentMethod, category, value, date, month)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, status || 'pending', paymentMethod, category, value, date, month]
    );

    res.json({ id, name, status, paymentMethod, category, value, date, month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/company-expenses/:id', async (req, res) => {
  try {
    const { name, status, paymentMethod, category, value, date } = req.body;

    await db.run(
      `UPDATE companyExpenses SET name = ?, status = ?, paymentMethod = ?, category = ?, value = ?, date = ? WHERE id = ?`,
      [name, status, paymentMethod, category, value, date, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/company-expenses/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM companyExpenses WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// GASTOS EXTRAS
// ═════════════════════════════════════════════

app.get('/api/extra-expenses', async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();
    const rows = await db.all(
      'SELECT * FROM extraExpenses WHERE month = ? ORDER BY date DESC',
      [month]
    );
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/extra-expenses', async (req, res) => {
  try {
    const { name, category, paymentMethod, isInstallment, installmentCount, currentInstallment, totalValue, installmentValue, date } = req.body;
    const month = getCurrentMonth();
    const id = uuid();

    await db.run(
      `INSERT INTO extraExpenses (id, name, category, paymentMethod, isInstallment, installmentCount, currentInstallment, totalValue, installmentValue, date, month)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, category, paymentMethod, isInstallment ? 1 : 0, installmentCount || null, currentInstallment || 1, totalValue, installmentValue, date, month]
    );

    res.json({ id, name, category, paymentMethod, isInstallment, installmentCount, currentInstallment, totalValue, installmentValue, date, month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/extra-expenses/:id', async (req, res) => {
  try {
    const { name, category, paymentMethod, isInstallment, installmentCount, currentInstallment, totalValue, installmentValue, date } = req.body;

    await db.run(
      `UPDATE extraExpenses SET name = ?, category = ?, paymentMethod = ?, isInstallment = ?, installmentCount = ?, currentInstallment = ?, totalValue = ?, installmentValue = ?, date = ? WHERE id = ?`,
      [name, category, paymentMethod, isInstallment ? 1 : 0, installmentCount || null, currentInstallment, totalValue, installmentValue, date, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/extra-expenses/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM extraExpenses WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// DESPESAS DE TERCEIROS
// ═════════════════════════════════════════════

app.get('/api/third-party-expenses', async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();
    const rows = await db.all(
      'SELECT * FROM thirdPartyExpenses WHERE month = ? ORDER BY createdAt DESC',
      [month]
    );
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/third-party-expenses', async (req, res) => {
  try {
    const { personName, description, category, paymentMethod, isInstallment, installmentCount, value, status } = req.body;
    const month = getCurrentMonth();
    const id = uuid();

    await db.run(
      `INSERT INTO thirdPartyExpenses (id, personName, description, category, paymentMethod, isInstallment, installmentCount, value, status, month)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, personName, description, category, paymentMethod, isInstallment ? 1 : 0, installmentCount || null, value, status || 'pending', month]
    );

    res.json({ id, personName, description, category, paymentMethod, isInstallment, installmentCount, value, status, month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/third-party-expenses/:id', async (req, res) => {
  try {
    const { personName, description, category, paymentMethod, isInstallment, installmentCount, value, status } = req.body;

    await db.run(
      `UPDATE thirdPartyExpenses SET personName = ?, description = ?, category = ?, paymentMethod = ?, isInstallment = ?, installmentCount = ?, value = ?, status = ? WHERE id = ?`,
      [personName, description, category, paymentMethod, isInstallment ? 1 : 0, installmentCount || null, value, status, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/third-party-expenses/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM thirdPartyExpenses WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// INVESTIMENTOS
// ═════════════════════════════════════════════

app.get('/api/investments', async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();
    const rows = await db.all(
      'SELECT * FROM investments WHERE month = ? ORDER BY date DESC',
      [month]
    );
    res.json(rows || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/investments', async (req, res) => {
  try {
    const { name, category, value, date } = req.body;
    const month = getCurrentMonth();
    const id = uuid();

    await db.run(
      `INSERT INTO investments (id, name, category, value, date, month)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, category, value, date, month]
    );

    res.json({ id, name, category, value, date, month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/investments/:id', async (req, res) => {
  try {
    const { name, category, value, date } = req.body;

    await db.run(
      `UPDATE investments SET name = ?, category = ?, value = ?, date = ? WHERE id = ?`,
      [name, category, value, date, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/investments/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM investments WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// SETTINGS
// ═════════════════════════════════════════════

app.get('/api/settings', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM settings');
    const settings = {};
    rows.forEach(row => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/:key', async (req, res) => {
  try {
    const { value } = req.body;

    await db.run(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [req.params.key, value]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════════════════════════════
// DASHBOARD DATA
// ═════════════════════════════════════════════

app.get('/api/dashboard', async (req, res) => {
  try {
    const month = getCurrentMonth();

    const clients = await db.all('SELECT * FROM clients WHERE month = ?', [month]);
    const fixedExp = await db.all('SELECT * FROM fixedExpenses WHERE month = ?', [month]);
    const companyExp = await db.all('SELECT * FROM companyExpenses WHERE month = ?', [month]);
    const extraExp = await db.all('SELECT * FROM extraExpenses WHERE month = ?', [month]);
    const thirdParty = await db.all('SELECT * FROM thirdPartyExpenses WHERE month = ?', [month]);
    const investmentsData = await db.all('SELECT * FROM investments WHERE month = ?', [month]);

    const totalReceived = clients.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.monthlyValue, 0);
    const totalPending = clients.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.monthlyValue, 0);
    const totalFixed = fixedExp.reduce((sum, e) => sum + e.value, 0);
    const totalCompany = companyExp.reduce((sum, e) => sum + e.value, 0);
    const totalExtra = extraExp.reduce((sum, e) => sum + e.value, 0);
    const totalThirdParty = thirdParty.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.value, 0);
    const totalInvested = investmentsData.reduce((sum, i) => sum + i.value, 0);

    res.json({
      month,
      revenue: {
        received: totalReceived,
        pending: totalPending,
        total: totalReceived + totalPending
      },
      expenses: {
        fixed: totalFixed,
        company: totalCompany,
        extra: totalExtra,
        thirdParty: totalThirdParty,
        total: totalFixed + totalCompany + totalExtra + totalThirdParty
      },
      investments: {
        total: totalInvested
      },
      balance: totalReceived - (totalFixed + totalCompany + totalExtra + totalThirdParty),
      clients: {
        paid: clients.filter(c => c.status === 'paid').length,
        pending: clients.filter(c => c.status === 'pending').length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Financial System API running on http://localhost:${PORT}`);
});
