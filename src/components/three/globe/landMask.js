import { feature } from 'topojson-client';
import landTopology from 'world-atlas/land-110m.json';

const MASK_WIDTH = 1024;
const MASK_HEIGHT = 512;
const WRAP_OFFSETS = [-360, 0, 360];

/** Removes ±360° jumps so rings crossing the antimeridian stay continuous. */
function unwrapRing(ring) {
  let previous = null;

  return ring.map(([lon, lat]) => {
    let unwrapped = lon;
    if (previous !== null) {
      while (unwrapped - previous > 180) unwrapped -= 360;
      while (unwrapped - previous < -180) unwrapped += 360;
    }
    previous = unwrapped;
    return [unwrapped, lat];
  });
}

/** A ring that circles a pole (e.g. Antarctica) must be closed through that pole to fill correctly. */
function closeAroundPole(points) {
  const first = points[0];
  const last = points[points.length - 1];
  if (Math.abs(last[0] - first[0]) < 180) return points;

  const meanLat = points.reduce((sum, [, lat]) => sum + lat, 0) / points.length;
  const poleLat = meanLat < 0 ? -90 : 90;
  return [...points, [last[0], poleLat], [first[0], poleLat]];
}

function traceRing(ctx, points, lonOffset) {
  points.forEach(([lon, lat], index) => {
    const x = ((lon + lonOffset + 180) / 360) * MASK_WIDTH;
    const y = ((90 - lat) / 180) * MASK_HEIGHT;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
}

function getPolygons(geometry) {
  if (geometry?.type === 'Polygon') return [geometry.coordinates];
  if (geometry?.type === 'MultiPolygon') return geometry.coordinates;
  return [];
}

function drawLand(ctx) {
  const land = feature(landTopology, landTopology.objects.land);

  land.features.forEach(({ geometry }) => {
    getPolygons(geometry).forEach((polygon) => {
      const rings = polygon.filter((ring) => ring.length > 2).map((ring) => closeAroundPole(unwrapRing(ring)));

      ctx.beginPath();
      WRAP_OFFSETS.forEach((offset) => rings.forEach((ring) => traceRing(ctx, ring, offset)));
      ctx.fill('evenodd');
    });
  });
}

/**
 * Rasterises Natural Earth land polygons onto an equirectangular canvas once,
 * then answers "is this coordinate land?" with a cheap pixel lookup.
 */
export function createLandSampler() {
  const canvas = document.createElement('canvas');
  canvas.width = MASK_WIDTH;
  canvas.height = MASK_HEIGHT;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return () => false;

  ctx.fillStyle = '#fff';
  drawLand(ctx);
  const { data } = ctx.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT);

  return (lat, lon) => {
    const x = Math.min(MASK_WIDTH - 1, Math.floor(((lon + 180) / 360) * MASK_WIDTH));
    const y = Math.min(MASK_HEIGHT - 1, Math.floor(((90 - lat) / 180) * MASK_HEIGHT));
    return data[(y * MASK_WIDTH + x) * 4] > 128;
  };
}
