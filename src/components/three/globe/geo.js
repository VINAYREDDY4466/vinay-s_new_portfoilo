import { MathUtils, Vector3 } from 'three';

export const GLOBE_RADIUS = 1.35;

export function isValidCoordinate(point) {
  return (
    Number.isFinite(point?.lat) &&
    Number.isFinite(point?.lon) &&
    Math.abs(point.lat) <= 90 &&
    Math.abs(point.lon) <= 180
  );
}

/** Same mapping three.js uses for equirectangular textures on a SphereGeometry. */
export function latLonToVector3(lat, lon, radius = GLOBE_RADIUS) {
  const phi = MathUtils.degToRad(90 - lat);
  const theta = MathUtils.degToRad(lon + 180);

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Y rotation that turns the given coordinate to face the camera (+Z). */
export function getFacingRotationY(lat, lon) {
  const point = latLonToVector3(lat, lon);
  return -Math.atan2(point.x, point.z);
}
