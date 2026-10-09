const encoder = new TextEncoder();

async function digest(value) {
  return crypto.subtle.digest('SHA-256', encoder.encode(value));
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** IPs are only stored hashed, purely for rate limiting. */
export async function hashIp(ip) {
  return toHex(await digest(`ip:${ip}`));
}

/** Constant-time comparison; hashing first gives both sides equal length. */
export async function safeEqual(a, b) {
  const [left, right] = await Promise.all([digest(a), digest(b)]);
  return crypto.subtle.timingSafeEqual(left, right);
}
