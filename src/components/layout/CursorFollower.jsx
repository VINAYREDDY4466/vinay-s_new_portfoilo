import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';
const SPRING = { stiffness: 500, damping: 40, mass: 0.5 };

function Follower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
      setIsHovering(Boolean(event.target.closest?.(INTERACTIVE_SELECTOR)));
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70]" style={{ x: springX, y: springY }}>
      <motion.div
        className={cn(
          'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 transition-colors duration-300',
          isHovering ? 'bg-primary/15' : 'bg-transparent',
        )}
        animate={{
          width: isHovering ? 56 : 28,
          height: isHovering ? 56 : 28,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

/** Mouse-only decorative ring; never rendered on touch devices or with reduced motion. */
export default function CursorFollower() {
  const hasFinePointer = useMediaQuery('(pointer: fine)');
  const reduceMotion = useReducedMotion();

  return hasFinePointer && !reduceMotion ? <Follower /> : null;
}
