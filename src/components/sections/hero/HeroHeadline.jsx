import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { EASE_OUT_EXPO } from '../../../utils/motion';

/** Each line slides up from behind a mask; the last line gets the brand gradient. */
export default function HeroHeadline({ lines }) {
  const lastIndex = lines.length - 1;

  return (
    <h1 className="mt-8 max-w-5xl font-display text-display-xl font-bold">
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className={cn('block', index === lastIndex && 'text-gradient')}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2 + index * 0.12, ease: EASE_OUT_EXPO }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
