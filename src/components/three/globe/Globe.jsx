import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { globeConnections, homeLocation } from '../../../data/globe';
import { getArcTargets } from './arcs';
import CityMarkers from './CityMarkers';
import ConnectionArcs from './ConnectionArcs';
import { getFacingRotationY, isValidCoordinate } from './geo';
import GlobeSphere from './GlobeSphere';
import LandDots from './LandDots';

const FOLLOW_SPEED = 3;
const SPIN_SPEED = 0.05;
const POINTER_TILT = { x: 0.25, y: 0.45 };

export default function Globe({ palette, dotSamples, segments }) {
  const tiltRef = useRef(null);
  const spinRef = useRef(null);

  const hasHome = isValidCoordinate(homeLocation);
  const targets = useMemo(() => getArcTargets(homeLocation, globeConnections), []);

  // Start with home facing the camera, tipped slightly so its latitude sits near the centre.
  const initialSpin = hasHome ? getFacingRotationY(homeLocation.lat, homeLocation.lon) : 0;
  const baseTilt = hasHome ? MathUtils.degToRad(homeLocation.lat) * 0.6 : 0.2;

  useFrame(({ clock, pointer }, delta) => {
    const follow = 1 - Math.exp(-FOLLOW_SPEED * delta);
    const tilt = tiltRef.current;

    tilt.rotation.x = MathUtils.lerp(tilt.rotation.x, baseTilt - pointer.y * POINTER_TILT.x, follow);
    tilt.rotation.y = MathUtils.lerp(tilt.rotation.y, pointer.x * POINTER_TILT.y, follow);
    tilt.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    spinRef.current.rotation.y += delta * SPIN_SPEED;
  });

  return (
    <group ref={tiltRef} rotation-x={baseTilt}>
      <group ref={spinRef} rotation-y={initialSpin}>
        <GlobeSphere palette={palette} segments={segments} />
        <LandDots palette={palette} samples={dotSamples} />
        {hasHome && (
          <>
            <ConnectionArcs home={homeLocation} targets={targets} palette={palette} />
            <CityMarkers home={homeLocation} targets={targets} palette={palette} />
          </>
        )}
      </group>
    </group>
  );
}
