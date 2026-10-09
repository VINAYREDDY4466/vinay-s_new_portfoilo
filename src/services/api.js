export class ApiError extends Error {
  constructor(message, status, fields = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(path, options);
  } catch {
    throw new ApiError('Network error — check your connection and try again.', 0);
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(body.error ?? 'Something went wrong. Please try again.', response.status, body.fields);
  }
  return body;
}

export function sendContactMessage(contact) {
  return request('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
}

export function fetchMessages(password) {
  return request('/api/messages', { headers: { Authorization: `Bearer ${password}` } });
}
