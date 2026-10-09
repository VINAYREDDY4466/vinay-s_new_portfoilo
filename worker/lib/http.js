const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...BASE_HEADERS, ...headers } });
}

/** Parses a JSON object body, rejecting wrong content types, oversized payloads and malformed JSON. */
export async function readJsonBody(request, maxBytes) {
  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return { error: 'Expected a JSON request body.', status: 415 };
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) {
    return { error: 'Request is too large.', status: 413 };
  }

  try {
    const data = JSON.parse(text);
    return { data: data && typeof data === 'object' && !Array.isArray(data) ? data : {} };
  } catch {
    return { error: 'Invalid JSON.', status: 400 };
  }
}

export function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') ?? 'unknown';
}

export function getBearerToken(request) {
  const header = request.headers.get('Authorization') ?? '';
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
}
