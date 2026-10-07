import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../../utils/motion';

export default function CountUp({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
