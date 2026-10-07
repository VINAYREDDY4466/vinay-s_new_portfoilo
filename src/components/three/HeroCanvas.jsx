import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import useTheme from '../../hooks/useTheme';
import Globe from './globe/Globe';
import { scenePalettes } from './palette';
import ParticleField from './ParticleField';

export default function HeroCanvas() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '120px' });
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { theme } = useTheme();
  const palette = scenePalettes[theme];

  // 'demand' renders a single still frame: used off-screen (saves battery) and for reduced motion.
  const frameloop = isInView && !reduceMotion ? 'always' : 'demand';

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={frameloop}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Globe palette={palette} dotSamples={isMobile ? 9000 : 16000} segments={isMobile ? 48 : 64} />
        <ParticleField palette={palette} count={isMobile ? 500 : 1400} />
      </Canvas>
    </div>
  );
}
