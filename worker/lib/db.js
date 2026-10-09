const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS idx_messages_ip_created ON messages (ip_hash, created_at)',
  `CREATE TABLE IF NOT EXISTS auth_failures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS idx_auth_failures_ip_created ON auth_failures (ip_hash, created_at)',
];

/** Columns added after the first release; tables created earlier get them on startup. */
const ADDED_COLUMNS = [{ table: 'messages', column: 'phone', definition: "TEXT NOT NULL DEFAULT ''" }];

async function addMissingColumns(db) {
  for (const { table, column, definition } of ADDED_COLUMNS) {
    const { results } = await db.prepare(`PRAGMA table_info(${table})`).all();
    if (!results.some((row) => row.name === column)) {
      await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
    }
  }
}

let schemaReady = null;

/** Creates and upgrades tables on first use per Worker instance, so no manual migration step is needed. */
export function ensureSchema(db) {
  schemaReady ??= db
    .batch(SCHEMA.map((sql) => db.prepare(sql)))
    .then(() => addMissingColumns(db))
    .catch((error) => {
      schemaReady = null;
      throw error;
    });
  return schemaReady;
}

export function isoAgo(milliseconds) {
  return new Date(Date.now() - milliseconds).toISOString();
}
