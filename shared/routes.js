export const ADMIN_PATH = '/contact';

export function isAdminPath(pathname) {
  return pathname.replace(/\/+$/, '').toLowerCase() === ADMIN_PATH;
}
