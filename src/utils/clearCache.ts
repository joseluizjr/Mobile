import { ROUTES } from '@/routes/const';

export const allowedRoutes = [ROUTES.INITIAL];

export function clearStorage() {
  if (allowedRoutes.includes(window.location.pathname)) return;
  localStorage.clear();
  window.location.pathname = ROUTES.INITIAL;
}
