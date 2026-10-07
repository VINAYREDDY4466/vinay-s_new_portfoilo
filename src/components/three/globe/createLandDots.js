import { GLOBE_RADIUS, latLonToVector3 } from './geo';
import { createLandSampler } from './landMask';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Spreads `sampleCount` points evenly over the sphere (Fibonacci lattice)
 * and keeps only those that fall on land.
 */
export function createLandDots(sampleCount, radius = GLOBE_RADIUS) {
  const isLand = createLandSampler();
  const positions = [];

  for (let i = 0; i < sampleCount; i += 1) {
    const y = 1 - (i / (sampleCount - 1)) * 2;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = ((((i * GOLDEN_ANGLE * 180) / Math.PI) % 360) + 360) % 360 - 180;

    if (isLand(lat, lon)) {
      const point = latLonToVector3(lat, lon, radius);
      positions.push(point.x, point.y, point.z);
    }
  }

  return new Float32Array(positions);
}
