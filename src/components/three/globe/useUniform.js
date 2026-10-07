import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Color } from 'three';

const isColor = (value) => typeof value === 'string';

/**
 * Stable shader uniform (`{ value }`) that follows `value`.
 * Strings become a THREE.Color; numbers are stored as-is.
 * Uniform mutations bypass React, so a frame is requested for the 'demand' loop.
 */
export default function useUniform(value) {
  const invalidate = useThree((state) => state.invalidate);
  const uniform = useMemo(() => ({ value: isColor(value) ? new Color(value) : value }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isColor(value)) uniform.value.set(value);
    else uniform.value = value;
    invalidate();
  }, [value, uniform, invalidate]);

  return uniform;
}
