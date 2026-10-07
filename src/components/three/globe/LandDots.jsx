import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { createLandDots } from './createLandDots';
import { GLOBE_RADIUS } from './geo';
import { landDotsShader } from './shaders';
import useUniform from './useUniform';

// Slightly above the surface so dots never z-fight with the ocean sphere.
const DOT_RADIUS = GLOBE_RADIUS * 1.003;

export default function LandDots({ palette, samples = 14000, size = 2.6 }) {
  const color = useUniform(palette.land);
  const opacity = useUniform(palette.landOpacity);
  const pointSize = useUniform(size);
  const pixelRatio = useUniform(useThree((state) => state.viewport.dpr));

  const positions = useMemo(() => createLandDots(samples, DOT_RADIUS), [samples]);
  const uniforms = useMemo(
    () => ({ uColor: color, uOpacity: opacity, uSize: pointSize, uPixelRatio: pixelRatio }),
    [color, opacity, pointSize, pixelRatio],
  );

  if (positions.length === 0) return null;

  return (
    <points key={samples}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial {...landDotsShader} uniforms={uniforms} transparent depthWrite={false} />
    </points>
  );
}
