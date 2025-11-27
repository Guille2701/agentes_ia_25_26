import Database from 'better-sqlite3';

const db = new Database('./backend/src/db/preguntas.db');
db.pragma('journal_mode = WAL');

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    preguntas TEXT,
    opciones TEXT,
    correcta TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

export default db;

