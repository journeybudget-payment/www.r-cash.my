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