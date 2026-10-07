import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createArcCurve } from './arcs';
import { arcShader } from './shaders';
import useUniform from './useUniform';

const TUBE_SEGMENTS = 64;
const TUBE_RADIUS = 0.007;

function Arc({ curve, colorUniform, timeUniform, offset }) {
  const uniforms = useMemo(
    () => ({ uColor: colorUniform, uTime: timeUniform, uOffset: { value: offset } }),
    [colorUniform, timeUniform, offset],
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, TUBE_SEGMENTS, TUBE_RADIUS, 6, false]} />
      <shaderMaterial {...arcShader} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}

export default function ConnectionArcs({ home, targets, palette }) {
  const color = useUniform(palette.arc);
  const time = useMemo(() => ({ value: 0 }), []);
  const curves = useMemo(
    () => targets.map((target) => createArcCurve(home, target)),
    [home, targets],
  );

  useFrame(({ clock }) => {
    time.value = clock.elapsedTime;
  });

  return curves.map((curve, index) => (
    <Arc
      key={`${targets[index].lat},${targets[index].lon}`}
      curve={curve}
      colorUniform={color}
      timeUniform={time}
      offset={index / curves.length}
    />
  ));
}
