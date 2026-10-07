import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { EASE_OUT_EXPO } from '../../../utils/motion';
import AvailabilityBadge from '../../ui/AvailabilityBadge';
import SocialLinks from '../../ui/SocialLinks';

export default function MobileMenu({ id, isOpen, links, activeId, onNavigate }) {
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (isOpen) firstLinkRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="space-y-2">
              {links.map(({ id: sectionId, label }, index) => (
                <motion.li
                  key={sectionId}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE_OUT_EXPO }}
                >
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${sectionId}`}
                    onClick={onNavigate}
                    className={cn(
                      'flex items-baseline gap-4 py-2 font-display text-4xl font-bold transition-colors',
                      activeId === sectionId ? 'text-primary' : 'text-fg hover:text-primary',
                    )}
                  >
                    <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-6">
            <AvailabilityBadge />
            <SocialLinks />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
