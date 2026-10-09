const TELEGRAM_API = 'https://api.telegram.org';
const REQUEST_TIMEOUT_MS = 8000;
// Telegram rejects messages over 4096 characters; leave room for the header lines.
const MAX_BODY_CHARS = 3000;

const truncate = (text, max) => (text.length > max ? `${text.slice(0, max)}…` : text);

export const isTelegramConfigured = (env) => Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);

function formatMessage({ name, email, phone, message }, inboxUrl) {
  return [
    '📬 New portfolio message',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    truncate(message, MAX_BODY_CHARS),
    '',
    `Inbox: ${inboxUrl}`,
  ].join('\n');
}

/**
 * Sends the message to your Telegram chat as plain text (no parse_mode, so visitor
 * input can't inject formatting). Never throws: the message is already saved in D1.
 */
export async function notifyTelegram(env, contact, inboxUrl) {
  if (!isTelegramConfigured(env)) return;

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: formatMessage(contact, inboxUrl),
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      const { description } = await response.json().catch(() => ({}));
      console.error(`Telegram notification failed (${response.status}): ${description ?? 'unknown error'}`);
    }
  } catch (error) {
    console.error(`Telegram notification failed: ${error.name}`);
  }
}
