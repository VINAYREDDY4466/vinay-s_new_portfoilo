import { requireAdmin } from '../lib/adminAuth.js';
import { json } from '../lib/http.js';

const MAX_MESSAGES = 500;
const MESSAGE_ID = /^[1-9]\d{0,15}$/;

export async function handleListMessages(request, env) {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const { results } = await env.DB.prepare(
    'SELECT id, name, email, phone, message, created_at AS createdAt FROM messages ORDER BY created_at DESC LIMIT ?',
  )
    .bind(MAX_MESSAGES)
    .all();

  return json({ messages: results });
}

/** DELETE /api/messages?id=123 */
export async function handleDeleteMessage(request, env) {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const id = new URL(request.url).searchParams.get('id') ?? '';
  if (!MESSAGE_ID.test(id)) return json({ error: 'Invalid message id.' }, 400);

  const { meta } = await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(Number(id)).run();
  if (!meta.changes) return json({ error: 'Message not found — it may already be deleted.' }, 404);

  return json({ ok: true });
}
