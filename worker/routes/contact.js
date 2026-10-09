import { normalizeContact, validateContact } from '../../shared/contact.js';
import { formatPhone } from '../../shared/phone.js';
import { ADMIN_PATH } from '../../shared/routes.js';
import { hashIp } from '../lib/crypto.js';
import { ensureSchema } from '../lib/db.js';
import { getClientIp, json, readJsonBody } from '../lib/http.js';
import { countRecent } from '../lib/rateLimit.js';
import { notifyTelegram } from '../lib/telegram.js';

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

export async function handleContact(request, env, ctx) {
  const { data, error, status } = await readJsonBody(request, MAX_BODY_BYTES);
  if (error) return json({ error }, status);

  // Honeypot: real users never see this field, bots fill it. Fake success so they don't retry.
  if (data.website) return json({ ok: true }, 201);

  const contact = normalizeContact(data);
  const fields = validateContact(contact);
  if (Object.keys(fields).length > 0) {
    return json({ error: 'Please fix the highlighted fields.', fields }, 422);
  }

  await ensureSchema(env.DB);
  const ipHash = await hashIp(getClientIp(request));

  if ((await countRecent(env.DB, 'messages', ipHash, RATE_LIMIT.windowMs)) >= RATE_LIMIT.max) {
    return json({ error: 'Too many messages sent. Please try again later or email me directly.' }, 429);
  }

  const saved = { ...contact, phone: formatPhone(contact.phone, contact.country) };

  await env.DB.prepare(
    'INSERT INTO messages (name, email, phone, message, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)',
  )
    .bind(saved.name, saved.email, saved.phone, saved.message, ipHash, new Date().toISOString())
    .run();

  // Runs after the response is sent, so a slow or failing Telegram never delays the visitor.
  const inboxUrl = new URL(ADMIN_PATH, request.url).href;
  ctx.waitUntil(notifyTelegram(env, saved, inboxUrl));

  return json({ ok: true }, 201);
}
