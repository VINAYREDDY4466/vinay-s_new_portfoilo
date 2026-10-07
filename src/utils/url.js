const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns the URL only if it is safe to render as a link (blocks `javascript:` etc.),
 * otherwise `null` so callers can hide the link entirely.
 */
export function getSafeUrl(url) {
  if (typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return null;
  if (trimmed.startsWith('#')) return trimmed;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;

  try {
    return SAFE_PROTOCOLS.has(new URL(trimmed).protocol) ? trimmed : null;
  } catch {
    return null;
  }
}

export const isExternalUrl = (url) => /^https?:\/\//i.test(url);

export const isValidEmail = (email) => typeof email === 'string' && EMAIL_PATTERN.test(email.trim());
