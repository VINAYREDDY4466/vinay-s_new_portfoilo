import { useMemo } from 'react';
import { BackSide } from 'three';
import { GLOBE_RADIUS } from './geo';
import { atmosphereShader, oceanShader } from './shaders';
import useUniform from './useUniform';

const ATMOSPHERE_SCALE = 1.18;

export default function GlobeSphere({ palette, segments = 64 }) {
  const ocean = useUniform(palette.ocean);
  const rim = useUniform(palette.oceanRim);
  const glow = useUniform(palette.atmosphere);
  const glowIntensity = useUniform(palette.atmosphereIntensity);

  const oceanUniforms = useMemo(() => ({ uOcean: ocean, uRim: rim }), [ocean, rim]);
  const atmosphereUniforms = useMemo(
    () => ({ uColor: glow, uIntensity: glowIntensity }),
    [glow, glowIntensity],
  );

  return (
    <>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, segments, segments]} />
        <shaderMaterial {...oceanShader} uniforms={oceanUniforms} />
      </mesh>
      <mesh scale={ATMOSPHERE_SCALE}>
        <sphereGeometry args={[GLOBE_RADIUS, segments, segments]} />
        <shaderMaterial
          {...atmosphereShader}
          uniforms={atmosphereUniforms}
          side={BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
