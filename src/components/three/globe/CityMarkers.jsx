import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Quaternion, Vector3 } from 'three';
import { GLOBE_RADIUS, latLonToVector3 } from './geo';

const MARKER_RADIUS = GLOBE_RADIUS * 1.006;
const PULSE_DURATION = 2.4;
const RING_FACING = new Vector3(0, 0, 1);

function surfacePoint({ lat, lon }) {
  return latLonToVector3(lat, lon, MARKER_RADIUS);
}

/** Expanding ring laid flat on the surface at the home location. */
function HomePulse({ position, color }) {
  const ringRef = useRef(null);
  const materialRef = useRef(null);
  const quaternion = useMemo(
    () => new Quaternion().setFromUnitVectors(RING_FACING, position.clone().normalize()),
    [position],
  );

  useFrame(({ clock }) => {
    const progress = (clock.elapsedTime % PULSE_DURATION) / PULSE_DURATION;
    ringRef.current.scale.setScalar(1 + progress * 2.5);
    materialRef.current.opacity = 1 - progress;
  });

  return (
    <mesh ref={ringRef} position={position} quaternion={quaternion}>
      <ringGeometry args={[0.035, 0.05, 32]} />
      <meshBasicMaterial ref={materialRef} color={color} side={DoubleSide} transparent depthWrite={false} />
    </mesh>
  );
}

export default function CityMarkers({ home, targets, palette }) {
  const homePosition = useMemo(() => surfacePoint(home), [home]);
  const targetPositions = useMemo(() => targets.map(surfacePoint), [targets]);

  return (
    <>
      <mesh position={homePosition}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={palette.home} />
      </mesh>
      <HomePulse position={homePosition} color={palette.home} />

      {targetPositions.map((position, index) => (
        <mesh key={`${targets[index].lat},${targets[index].lon}`} position={position}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshBasicMaterial color={palette.arc} />
        </mesh>
      ))}
    </>
  );
}
