import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import PortfolioPage from './pages/PortfolioPage';
import { isAdminPath } from '../shared/routes';

// Admin code is only downloaded when visiting the admin URL.
const MessagesPage = lazy(() => import('./pages/admin/MessagesPage'));

export default function App() {
  const isAdmin = isAdminPath(window.location.pathname);

  return (
    <MotionConfig reducedMotion="user">
      {isAdmin ? (
        <Suspense fallback={null}>
          <MessagesPage />
        </Suspense>
      ) : (
        <PortfolioPage />
      )}
    </MotionConfig>
  );
}
