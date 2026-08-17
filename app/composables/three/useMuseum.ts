import * as THREE from 'three';
import { ref, type Ref } from 'vue';
import { EXHIBITS, PALETTE, type ExhibitData } from './exhibits';
import { buildRoom } from './buildRoom';
import { useExhibits } from './useExhibits';
import { usePlayer } from './usePlayer';

/** Distance from an exhibit centre at which its placard lights up. */
const TRIGGER_RADIUS = 4.5;

export interface MuseumHandles {
  /** The exhibit the player is currently standing near (or null). */
  activeId: Ref<string | null>;
  /** The exhibit whose info panel is open (or null). */
  openId: Ref<string | null>;
  /** True while pointer-locked / walking. */
  isLocked: Ref<boolean>;
  /** The exhibit data, for the overlay to look up. */
  exhibits: ExhibitData[];
  close: () => void;
  dispose: () => void;
}

/**
 * Sets up the whole planetarium on a canvas and drives it until disposed.
 * Returns reactive handles the Vue overlay reads from.
 */
export function useMuseum(canvas: HTMLCanvasElement): MuseumHandles {
  const box = canvas.parentElement as HTMLElement;

  const activeId = ref<string | null>(null);
  const openId = ref<string | null>(null);

  // ---- Renderer / scene / camera ----------------------------------------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(box.clientWidth, box.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PALETTE.space);
  scene.fog = new THREE.Fog(PALETTE.space, 14, 40);

  const camera = new THREE.PerspectiveCamera(70, box.clientWidth / box.clientHeight, 0.1, 200);

  // ---- Lighting ----------------------------------------------------------
  const hemi = new THREE.HemisphereLight(0x4a6a9a, 0x05070c, 0.7);
  const ambient = new THREE.AmbientLight(0x223347, 0.5);
  const centre = new THREE.PointLight(PALETTE.gold, 90, 0, 2);
  centre.position.set(0, 7, 0);
  scene.add(hemi, ambient, centre);

  // ---- Room + exhibits ---------------------------------------------------
  const room = buildRoom();
  scene.add(room.group);

  const exhibits = useExhibits(EXHIBITS);
  scene.add(exhibits.group);

  // ---- Player ------------------------------------------------------------
  const player = usePlayer(camera, canvas, {
    bounds: room.radius,
    colliders: exhibits.objects.map((o) => ({
      x: o.center.x,
      z: o.center.z,
      radius: o.blockRadius,
    })),
    canLock: () => openId.value === null,
  });

  // ---- Inspect interaction (E / Esc) ------------------------------------
  const close = () => {
    openId.value = null;
  };
  const open = (id: string) => {
    openId.value = id;
    player.unlock(); // free the cursor so links in the panel are clickable
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.code === 'KeyE') {
      if (openId.value) close();
      else if (activeId.value) open(activeId.value);
    } else if (e.code === 'Escape' && openId.value) {
      close();
    }
  };
  window.addEventListener('keydown', onKey);

  // ---- Render loop -------------------------------------------------------
  let frameId = 0;
  let lastTime = performance.now();
  const renderFrame = () => {
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05); // clamp after tab-switch stalls
    lastTime = now;
    player.update(dt);

    // Proximity: pick the nearest exhibit within trigger range.
    const px = camera.position.x;
    const pz = camera.position.z;
    let nearest: string | null = null;
    let nearestDist = TRIGGER_RADIUS;
    for (const o of exhibits.objects) {
      const d = Math.hypot(px - o.center.x, pz - o.center.z);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = o.data.id;
      }
    }
    if (nearest !== activeId.value) activeId.value = nearest;

    for (const o of exhibits.objects) o.update(dt, o.data.id === activeId.value);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(renderFrame);
  };
  renderFrame();

  // ---- Resize ------------------------------------------------------------
  const onResize = () => {
    const w = box.clientWidth;
    const h = box.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  // ---- Teardown ----------------------------------------------------------
  const dispose = () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKey);
    player.dispose();
    room.dispose();
    exhibits.dispose();
    renderer.dispose();
  };

  return {
    activeId,
    openId,
    isLocked: player.isLocked,
    exhibits: EXHIBITS,
    close,
    dispose,
  };
}
