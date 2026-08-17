import * as THREE from 'three';
import { PALETTE } from './exhibits';

export interface Room {
  group: THREE.Group;
  /** Inner radius the player is bounded to. */
  radius: number;
  dispose: () => void;
}

/**
 * A circular planetarium rotunda: dark floor with gold guide rings,
 * a cylindrical wall, and a starry dome overhead. The circular shape
 * means player collision is a single radius check (see usePlayer).
 */
export function buildRoom(): Room {
  const group = new THREE.Group();
  const radius = 18;
  const wallHeight = 9;

  // Track everything that needs manual GPU cleanup.
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const track = <G extends THREE.BufferGeometry, M extends THREE.Material>(g: G, m: M) => {
    geometries.push(g);
    materials.push(m);
  };

  // ---- Floor -------------------------------------------------------------
  const floorGeo = new THREE.CircleGeometry(radius, 72);
  floorGeo.rotateX(-Math.PI / 2);
  const floorMat = new THREE.MeshStandardMaterial({
    color: PALETTE.floor,
    roughness: 0.9,
    metalness: 0.25,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  group.add(floor);
  track(floorGeo, floorMat);

  // ---- Gold guide rings on the floor (orrery vibe) -----------------------
  for (const r of [5, 10, 15]) {
    const ringGeo = new THREE.RingGeometry(r - 0.03, r + 0.03, 96);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: PALETTE.gold,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.01;
    group.add(ring);
    track(ringGeo, ringMat);
  }

  // ---- Wall (open cylinder, inside faces) --------------------------------
  const wallGeo = new THREE.CylinderGeometry(radius, radius, wallHeight, 72, 1, true);
  const wallMat = new THREE.MeshStandardMaterial({
    color: PALETTE.wall,
    roughness: 1,
    metalness: 0,
    side: THREE.BackSide,
  });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.y = wallHeight / 2;
  group.add(wall);
  track(wallGeo, wallMat);

  // ---- Dome (upper hemisphere) -------------------------------------------
  const domeGeo = new THREE.SphereGeometry(radius, 60, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshBasicMaterial({ color: PALETTE.dome, side: THREE.BackSide });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = wallHeight;
  group.add(dome);
  track(domeGeo, domeMat);

  // ---- Projected stars on the dome ---------------------------------------
  const STAR_COUNT = 900;
  const positions = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    const r = radius - 0.4;
    const theta = (i * 2.399963) % (Math.PI * 2); // golden-angle spread, deterministic
    const phi = Math.acos(1 - (i / STAR_COUNT) * 0.92); // upper hemisphere, biased high
    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = wallHeight + r * Math.cos(phi) * 0.5;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({
    color: PALETTE.foreground,
    size: 0.12,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
  });
  const stars = new THREE.Points(starGeo, starMat);
  group.add(stars);
  track(starGeo, starMat);

  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
  };

  return { group, radius, dispose };
}
