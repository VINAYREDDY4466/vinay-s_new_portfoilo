import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

export default function ProjectFilter({ categories, active, onChange }) {
  if (categories.length <= 2) return null;

  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category === active;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className={cn(
              'relative isolate rounded-full border px-4 py-2 text-sm transition-colors',
              isActive ? 'border-transparent text-white' : 'border-fg/10 text-muted hover:text-fg',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary-solid"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {category}
          </button>
        );
      })}
    </div>
  );
}
