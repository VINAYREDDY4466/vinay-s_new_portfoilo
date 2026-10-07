import { lazy, Suspense, useState } from 'react';
import { cn } from '../../utils/cn';
import { isWebGLAvailable } from '../../utils/webgl';
import ErrorBoundary from '../ui/ErrorBoundary';
import GlobeFallback from './GlobeFallback';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export default function HeroVisual({ className }) {
  const [canUseWebGL] = useState(isWebGLAvailable);
  const fallback = <GlobeFallback />;

  return (
    <div aria-hidden className={cn('pointer-events-none', className)}>
      {canUseWebGL ? (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <HeroCanvas />
          </Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
