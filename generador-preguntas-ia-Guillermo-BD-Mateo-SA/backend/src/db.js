import Database from 'better-sqlite3';

const db = new Database('preguntas.db');
db.pragma('journal_mode = WAL');

