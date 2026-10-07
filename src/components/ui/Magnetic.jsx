import { useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

/** Gently pulls its child towards the mouse cursor. Disabled for touch and reduced motion. */
export default function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
