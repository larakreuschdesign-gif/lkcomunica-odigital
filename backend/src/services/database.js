import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../../data/scripts.db')

let db = null

export async function initializeDatabase() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  await db.exec('PRAGMA journal_mode = WAL')

  // Create scripts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS scripts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      hook TEXT NOT NULL,
      hookedOptimized TEXT,
      objective TEXT,
      summary TEXT,
      generalDescription TEXT,
      ctaFinal TEXT,
      creativDirection TEXT,
      musicSuggestion TEXT,
      observations TEXT,
      brand TEXT,
      niche TEXT,
      platform TEXT,
      objective_meta TEXT,
      tone TEXT,
      format TEXT,
      duration TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `)

  // Create scenes table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS scenes (
      id TEXT PRIMARY KEY,
      scriptId TEXT NOT NULL,
      sceneIndex INTEGER,
      duration TEXT,
      objective TEXT,
      environment TEXT,
      description TEXT,
      framing TEXT,
      expression TEXT,
      bodyMovement TEXT,
      cameraMovement TEXT,
      spokenText TEXT,
      onScreenText TEXT,
      emotion TEXT,
      creativeDirection TEXT,
      transition TEXT,
      FOREIGN KEY (scriptId) REFERENCES scripts(id)
    )
  `)

  console.log('Database initialized successfully')
  return db
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized')
  }
  return db
}
