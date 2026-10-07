const viewVaryingsVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/** Solid sphere shaded with a soft key light and a fresnel rim. */
export const oceanShader = {
  vertexShader: viewVaryingsVertex,
  fragmentShader: /* glsl */ `
    uniform vec3 uOcean;
    uniform vec3 uRim;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      vec3 normal = normalize(vNormal);
      float fresnel = pow(1.0 - max(dot(normal, normalize(vViewDir)), 0.0), 2.5);
      float light = dot(normal, normalize(vec3(-0.45, 0.55, 0.7))) * 0.5 + 0.5;

      vec3 color = uOcean * mix(0.8, 1.15, light);
      color = mix(color, uRim, fresnel * 0.85);

      gl_FragColor = vec4(color, 1.0);
      #include <colorspace_fragment>
    }
  `,
};

/** Rendered on the back faces of a larger sphere so the glow hugs the silhouette. */
export const atmosphereShader = {
  vertexShader: viewVaryingsVertex,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      float glow = pow(clamp(-dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0), 1.6);
      gl_FragColor = vec4(uColor, glow * uIntensity);
      #include <colorspace_fragment>
    }
  `,
};

/** Round, depth-scaled points that fade out towards the globe's limb. */
export const landDotsShader = {
  vertexShader: /* glsl */ `
    uniform float uSize;
    uniform float uPixelRatio;
    varying float vFacing;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vFacing = dot(normalize(normalMatrix * position), normalize(-mvPosition.xyz));
      gl_PointSize = uSize * uPixelRatio * (7.5 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vFacing;

    void main() {
      float dist = length(gl_PointCoord - 0.5);
      if (dist > 0.5) discard;

      float edge = smoothstep(0.5, 0.3, dist);
      float limbFade = smoothstep(0.0, 0.4, vFacing);
      gl_FragColor = vec4(uColor, edge * limbFade * uOpacity);
      #include <colorspace_fragment>
    }
  `,
};

/** Faint arc with a bright pulse travelling from start (uv.x = 0) to end (uv.x = 1). */
export const arcShader = {
  vertexShader: /* glsl */ `
    varying float vProgress;

    void main() {
      vProgress = uv.x;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uOffset;
    varying float vProgress;

    const float TRAIL = 0.25;

    void main() {
      float head = fract(uTime * 0.16 + uOffset) * (1.0 + TRAIL);
      float behind = head - vProgress;
      float pulse = step(0.0, behind) * (1.0 - smoothstep(0.0, TRAIL, behind));

      gl_FragColor = vec4(uColor, 0.16 + pulse * 0.84);
      #include <colorspace_fragment>
    }
  `,
};
