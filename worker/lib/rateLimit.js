import { isoAgo } from './db.js';

// Table names cannot be bound as SQL parameters, so only these are allowed.
const RATE_LIMITED_TABLES = new Set(['messages', 'auth_failures']);

export async function countRecent(db, table, ipHash, windowMs) {
  if (!RATE_LIMITED_TABLES.has(table)) throw new Error(`Unknown rate-limited table: ${table}`);

  const row = await db
    .prepare(`SELECT COUNT(*) AS total FROM ${table} WHERE ip_hash = ? AND created_at > ?`)
    .bind(ipHash, isoAgo(windowMs))
    .first();

  return row?.total ?? 0;
}
