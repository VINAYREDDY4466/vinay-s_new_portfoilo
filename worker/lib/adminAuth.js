import { hashIp, safeEqual } from './crypto.js';
import { ensureSchema, isoAgo } from './db.js';
import { getBearerToken, getClientIp, json } from './http.js';
import { countRecent } from './rateLimit.js';

const AUTH_LIMIT = { max: 10, windowMs: 15 * 60 * 1000 };
const FAILURE_RETENTION_MS = 24 * 60 * 60 * 1000;

async function recordFailure(db, ipHash) {
  await db.batch([
    db.prepare('INSERT INTO auth_failures (ip_hash, created_at) VALUES (?, ?)').bind(ipHash, new Date().toISOString()),
    db.prepare('DELETE FROM auth_failures WHERE created_at < ?').bind(isoAgo(FAILURE_RETENTION_MS)),
  ]);
}

/** Returns an error response when the caller isn't the admin, or null when access is granted. */
export async function requireAdmin(request, env) {
  if (!env.ADMIN_PASSWORD) return json({ error: 'Admin access is not configured yet.' }, 503);

  await ensureSchema(env.DB);
  const ipHash = await hashIp(getClientIp(request));

  if ((await countRecent(env.DB, 'auth_failures', ipHash, AUTH_LIMIT.windowMs)) >= AUTH_LIMIT.max) {
    return json({ error: 'Too many attempts. Please try again in 15 minutes.' }, 429);
  }

  const password = getBearerToken(request);
  if (!password || !(await safeEqual(password, env.ADMIN_PASSWORD))) {
    await recordFailure(env.DB, ipHash);
    return json({ error: 'Incorrect password.' }, 401);
  }

  return null;
}
