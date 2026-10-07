import { QuadraticBezierCurve3 } from 'three';
import { GLOBE_RADIUS, isValidCoordinate, latLonToVector3 } from './geo';

const ARC_LIFT = 0.5;
const MIN_ARC_LENGTH = 0.05;

/** Bezier arc between two surface points, lifted higher the further apart they are. */
export function createArcCurve(from, to, radius = GLOBE_RADIUS) {
  const start = latLonToVector3(from.lat, from.lon, radius);
  const end = latLonToVector3(to.lat, to.lon, radius);
  const control = start.clone().add(end);

  // Antipodal points have no unique midpoint direction; arc over the north pole instead.
  if (control.lengthSq() < 1e-6) control.set(0, 1, 0);
  control.normalize().multiplyScalar(radius + start.distanceTo(end) * ARC_LIFT);

  return new QuadraticBezierCurve3(start, control, end);
}

/** Drops invalid coordinates, duplicates and destinations that sit on top of home. */
export function getArcTargets(home, connections = []) {
  if (!isValidCoordinate(home)) return [];

  const homePoint = latLonToVector3(home.lat, home.lon);
  const seen = new Set();

  return connections.filter((target) => {
    if (!isValidCoordinate(target)) return false;

    const key = `${target.lat},${target.lon}`;
    if (seen.has(key)) return false;
    seen.add(key);

    return homePoint.distanceTo(latLonToVector3(target.lat, target.lon)) > MIN_ARC_LENGTH;
  });
}
