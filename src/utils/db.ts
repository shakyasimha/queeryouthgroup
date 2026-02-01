import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export function getDatabase() {
  if (!db) {
    // Path to db.sqlite3 in src/db/ folder
    const dbPath = path.join(process.cwd(), 'src', 'db', 'db.sqlite3');
    // db = new Database(dbPath, { readonly: true }); // readonly for safety
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL'); // Better performance
  }
  return db;
}

export interface DictionaryEntry {
  id: number;
  english: string;
  nepali: string;
  definition_en: string;
  definition_ne: string;
  etymology_en: string | null;
  etymology_ne: string | null;
  explanation_en: string | null;
  explanation_ne: string | null;
}

export function getAllEntries(): DictionaryEntry[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM dictionary ORDER BY english ASC');
  return stmt.all() as DictionaryEntry[];
}

export function getEntryById(id: number): DictionaryEntry | undefined {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM dictionary WHERE id = ?');
  return stmt.get(id) as DictionaryEntry | undefined;
}

export function searchEntries(searchTerm: string): DictionaryEntry[] {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM dictionary 
    WHERE english LIKE ? 
       OR nepali LIKE ?
       OR definition_en LIKE ?
       OR definition_ne LIKE ?
       OR etymology_en LIKE ?
       OR etymology_ne LIKE ?
       OR explanation_en LIKE ?
       OR explanation_ne LIKE ?
    ORDER BY english ASC
  `);
  const searchPattern = `%${searchTerm}%`;
  return stmt.all(
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern
  ) as DictionaryEntry[];
}

// Close database connection (optional, for cleanup)
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}