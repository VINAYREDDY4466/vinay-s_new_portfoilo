import { json } from './lib/http.js';
import { handleContact } from './routes/contact.js';
import { handleMessages } from './routes/messages.js';

const routes = {
  '/api/contact': { POST: handleContact },
  '/api/messages': { GET: handleMessages },
};

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const route = routes[pathname];

    if (!route) {
      return pathname.startsWith('/api/') ? json({ error: 'Not found.' }, 404) : env.ASSETS.fetch(request);
    }

    const handler = route[request.method];
    if (!handler) {
      return json({ error: 'Method not allowed.' }, 405, { Allow: Object.keys(route).join(', ') });
    }

    try {
      return await handler(request, env, ctx);
    } catch (error) {
      console.error(`${request.method} ${pathname} failed`, error);
      return json({ error: 'Something went wrong. Please try again.' }, 500);
    }
  },
};
