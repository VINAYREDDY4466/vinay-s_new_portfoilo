import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

export default function DesktopNav({ links, activeId }) {
  return (
    <ul className="hidden items-center gap-1 rounded-full border border-fg/10 bg-fg/[0.03] p-1 backdrop-blur-md md:flex">
      {links.map(({ id, label }) => {
        const isActive = activeId === id;

        return (
          <li key={id} className="relative">
            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full bg-primary/15"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <a
              href={`#${id}`}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'relative block rounded-full px-4 py-2 text-sm transition-colors',
                isActive ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
