import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, 'financial.db');

const db = new sqlite3.Database(dbPath);

// Promisify database methods
db.run = promisify(db.run);
db.get = promisify(db.get);
db.all = promisify(db.all);

export const initDatabase = async () => {
  try {
    // Clientes (Entradas)
    await db.run(`
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        monthlyValue REAL NOT NULL,
        paymentDay INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        paidDate TEXT,
        notes TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        month TEXT NOT NULL
      )
    `);

    // Gastos Fixos
    await db.run(`
      CREATE TABLE IF NOT EXISTS fixedExpenses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        paymentMethod TEXT NOT NULL,
        category TEXT NOT NULL,
        value REAL NOT NULL,
        date TEXT NOT NULL,
        notes TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        month TEXT NOT NULL
      )
    `);

    // Gastos da Empresa
    await db.run(`
      CREATE TABLE IF NOT EXISTS companyExpenses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        paymentMethod TEXT NOT NULL,
        category TEXT NOT NULL,
        value REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        month TEXT NOT NULL
      )
    `);

    // Gastos Extras
    await db.run(`
      CREATE TABLE IF NOT EXISTS extraExpenses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        paymentMethod TEXT NOT NULL,
        isInstallment BOOLEAN DEFAULT FALSE,
        installmentCount INTEGER,
        currentInstallment INTEGER,
        totalValue REAL NOT NULL,
        installmentValue REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        month TEXT NOT NULL
      )
    `);

    // Despesas de Terceiros
    await db.run(`
      CREATE TABLE IF NOT EXISTS thirdPartyExpenses (
        id TEXT PRIMARY KEY,
        personName TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        paymentMethod TEXT NOT NULL,
        isInstallment BOOLEAN DEFAULT FALSE,
        installmentCount INTEGER,
        value REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        month TEXT NOT NULL
      )
    `);

    // Investimentos
    await db.run(`
      CREATE TABLE IF NOT EXISTS investments (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        value REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        month TEXT NOT NULL
      )
    `);

    // Configurações de Meta
    await db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export default db;
