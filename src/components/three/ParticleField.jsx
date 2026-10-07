import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, CanvasTexture, NormalBlending } from 'three';

// Camera sits at z = 7.5; keeping stars within this shell stops any from rendering huge up close.
const MIN_RADIUS = 3.5;
const RADIUS_SPREAD = 2.8;
const SPRITE_SIZE = 64;

function createShellPositions(count) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = MIN_RADIUS + Math.random() * RADIUS_SPREAD;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

/** Soft round sprite so points render as dots instead of squares. */
function createDotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = SPRITE_SIZE;
  canvas.height = SPRITE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const center = SPRITE_SIZE / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

  return new CanvasTexture(canvas);
}

export default function ParticleField({ palette, count = 1200 }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => createShellPositions(count), [count]);
  const dotTexture = useMemo(createDotTexture, []);

  useEffect(() => () => dotTexture?.dispose(), [dotTexture]);

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef} key={count}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        map={dotTexture}
        color={palette.star}
        transparent
        opacity={palette.starOpacity}
        depthWrite={false}
        blending={palette.additiveStars ? AdditiveBlending : NormalBlending}
      />
    </points>
  );
}
