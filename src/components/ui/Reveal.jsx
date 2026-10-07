import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../../utils/motion';

/** Fades + slides content in once when it scrolls into view. */
export default function Reveal({ as = 'div', delay = 0, y = 28, className, children }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  );
}
