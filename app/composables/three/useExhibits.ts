import * as THREE from 'three';
import { PALETTE, type ExhibitData, type ExhibitKind } from './exhibits';

/** One live exhibit in the scene. */
export interface ExhibitObject {
  data: ExhibitData;
  /** The exhibit's root group (platform + object + placard). */
  group: THREE.Group;
  /** World position of the platform centre (used for proximity + collision). */
  center: THREE.Vector3;
  /** Radius the player is pushed out of (platform + barrier). */
  blockRadius: number;
  /** Per-frame update; `active` drives the glow + light. */
  update: (dt: number, active: boolean) => void;
  dispose: () => void;
}

export interface ExhibitsHandle {
  group: THREE.Group;
  objects: ExhibitObject[];
  dispose: () => void;
}

/** Anything with a dispose() — geometries, materials, textures. */
type Disposable = { dispose: () => void };

/** Draws the info placard face to a canvas texture. */
function makePlacardTexture(data: ExhibitData): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0a1120';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#f3c969';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  ctx.fillStyle = '#f3c969';
  ctx.font = '600 26px "IBM Plex Mono", monospace';
  ctx.fillText(data.designation, 34, 58);

  ctx.fillStyle = '#eaf0fa';
  ctx.font = '600 40px "Lora", serif';
  ctx.fillText(data.title, 34, 112, w - 68);

  ctx.fillStyle = 'rgba(234,241,250,0.6)';
  ctx.font = '400 22px "Manrope", sans-serif';
  ctx.fillText(data.category, 34, 152, w - 68);

  ctx.fillStyle = '#f3c969';
  ctx.font = '600 22px "IBM Plex Mono", monospace';
  ctx.fillText('▲  press  E  to inspect', 34, 214);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Builds the prefab object for an exhibit kind, centred on local origin. */
function buildKind(kind: ExhibitKind, bin: Disposable[]): THREE.Group {
  const g = new THREE.Group();
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, place?: (m: THREE.Mesh) => void) => {
    const mesh = new THREE.Mesh(geo, mat);
    place?.(mesh);
    g.add(mesh);
    bin.push(geo, mat);
    return mesh;
  };

  if (kind === 'earth') {
    add(
      new THREE.SphereGeometry(0.85, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0x1f5fa8,
        roughness: 0.6,
        metalness: 0.1,
        emissive: 0x0a2540,
        emissiveIntensity: 0.35,
      }),
    );
  } else if (kind === 'planet') {
    add(
      new THREE.SphereGeometry(0.75, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0xc98a4b,
        roughness: 0.7,
        emissive: 0x2a1605,
        emissiveIntensity: 0.3,
      }),
    );
    add(
      new THREE.RingGeometry(1.0, 1.5, 64),
      new THREE.MeshBasicMaterial({
        color: PALETTE.gold,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      }),
      (m) => (m.rotation.x = Math.PI * 0.42),
    );
  } else if (kind === 'rocket') {
    add(
      new THREE.CylinderGeometry(0.28, 0.32, 1.2, 32),
      new THREE.MeshStandardMaterial({ color: 0xeaf0fa, roughness: 0.4, metalness: 0.4 }),
    );
    add(
      new THREE.ConeGeometry(0.28, 0.5, 32),
      new THREE.MeshStandardMaterial({ color: PALETTE.gold, metalness: 0.6, roughness: 0.3 }),
      (m) => (m.position.y = 0.85),
    );
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      add(
        new THREE.ConeGeometry(0.16, 0.4, 4),
        new THREE.MeshStandardMaterial({ color: PALETTE.gold, metalness: 0.6, roughness: 0.3 }),
        (m) => {
          m.position.set(Math.cos(a) * 0.32, -0.55, Math.sin(a) * 0.32);
          m.rotation.set(Math.PI, -a, 0);
        },
      );
    }
  } else {
    // satellite
    add(
      new THREE.BoxGeometry(0.55, 0.55, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xdfe6f2, metalness: 0.5, roughness: 0.4 }),
    );
    for (const side of [-1, 1]) {
      add(
        new THREE.BoxGeometry(0.9, 0.02, 0.5),
        new THREE.MeshStandardMaterial({
          color: 0x1f5fa8,
          emissive: 0x0a2540,
          emissiveIntensity: 0.4,
          metalness: 0.3,
          roughness: 0.5,
        }),
        (m) => (m.position.x = side * 0.75),
      );
    }
    add(
      new THREE.CylinderGeometry(0.22, 0.05, 0.12, 24),
      new THREE.MeshStandardMaterial({ color: PALETTE.gold, metalness: 0.6, roughness: 0.3 }),
      (m) => {
        m.rotation.x = Math.PI / 2;
        m.position.z = 0.45;
      },
    );
  }

  return g;
}

/** Builds one exhibit: platform, barrier, prefab object, glowing placard, light. */
function buildExhibit(data: ExhibitData): ExhibitObject {
  const group = new THREE.Group();
  const center = new THREE.Vector3(...data.position);
  group.position.copy(center);
  // Face the room centre: local +Z points toward the origin (the player's side).
  group.rotation.y = Math.atan2(-center.x, -center.z);

  const bin: Disposable[] = [];
  const add = (
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    place?: (m: THREE.Mesh) => void,
  ) => {
    const mesh = new THREE.Mesh(geo, mat);
    place?.(mesh);
    group.add(mesh);
    bin.push(geo, mat);
    return mesh;
  };

  // ---- Platform + gold rim ----------------------------------------------
  add(
    new THREE.CylinderGeometry(1.7, 1.9, 0.4, 48),
    new THREE.MeshStandardMaterial({ color: 0x11192b, roughness: 0.8, metalness: 0.3 }),
    (m) => (m.position.y = 0.2),
  );
  const rimMat = new THREE.MeshStandardMaterial({
    color: PALETTE.gold,
    emissive: PALETTE.gold,
    emissiveIntensity: 0.4,
  });
  add(new THREE.TorusGeometry(1.7, 0.05, 16, 64), rimMat, (m) => {
    m.rotation.x = Math.PI / 2;
    m.position.y = 0.4;
  });

  // ---- Barrier (stanchion ring) -----------------------------------------
  add(
    new THREE.TorusGeometry(2.35, 0.02, 12, 64),
    new THREE.MeshStandardMaterial({
      color: PALETTE.gold,
      emissive: PALETTE.gold,
      emissiveIntensity: 0.25,
    }),
    (m) => {
      m.rotation.x = Math.PI / 2;
      m.position.y = 0.6;
    },
  );
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    add(
      new THREE.CylinderGeometry(0.04, 0.04, 0.65, 12),
      new THREE.MeshStandardMaterial({ color: 0x2a3350, metalness: 0.6, roughness: 0.4 }),
      (m) => m.position.set(Math.cos(a) * 2.35, 0.32, Math.sin(a) * 2.35),
    );
  }

  // ---- Prefab object -----------------------------------------------------
  const obj = buildKind(data.kind, bin);
  obj.position.y = 1.7;
  group.add(obj);

  // ---- Info placard (glows on approach) ----------------------------------
  const placardTex = makePlacardTexture(data);
  const placardMat = new THREE.MeshStandardMaterial({
    map: placardTex,
    emissive: 0xffffff,
    emissiveMap: placardTex,
    emissiveIntensity: 0.2,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  add(new THREE.PlaneGeometry(1.4, 0.7), placardMat, (m) => {
    m.position.set(0, 1.0, 2.0);
    m.rotation.x = -0.35;
  });
  bin.push(placardTex);

  // ---- Local fill light --------------------------------------------------
  const light = new THREE.PointLight(PALETTE.gold, 12, 9, 2);
  light.position.set(0, 3.2, 0.5);
  group.add(light);

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const update = (dt: number, active: boolean) => {
    if (!reduceMotion) obj.rotation.y += dt * 0.35;
    const ease = Math.min(1, dt * 6);
    placardMat.emissiveIntensity += ((active ? 1.0 : 0.2) - placardMat.emissiveIntensity) * ease;
    rimMat.emissiveIntensity += ((active ? 1.1 : 0.4) - rimMat.emissiveIntensity) * ease;
    light.intensity += ((active ? 30 : 12) - light.intensity) * ease;
  };

  return {
    data,
    group,
    center,
    blockRadius: 2.5,
    update,
    dispose: () => bin.forEach((d) => d.dispose()),
  };
}

/** Builds every exhibit from the data array into one group. */
export function useExhibits(data: ExhibitData[]): ExhibitsHandle {
  const group = new THREE.Group();
  const objects = data.map(buildExhibit);
  objects.forEach((o) => group.add(o.group));

  return {
    group,
    objects,
    dispose: () => objects.forEach((o) => o.dispose()),
  };
}
