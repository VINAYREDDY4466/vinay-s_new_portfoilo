import { useRef } from 'react';
import { cn } from '../../utils/cn';

/** Card with a soft glow that follows the mouse. Updates CSS variables directly to avoid re-renders. */
export default function SpotlightCard({ as: Component = 'div', className, children, ...rest }) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        'spotlight-card relative rounded-3xl border border-fg/10 bg-surface/70 shadow-card transition-colors duration-300 hover:border-primary/30 dark:bg-surface/60 dark:shadow-none',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
