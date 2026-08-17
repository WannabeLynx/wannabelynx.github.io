import * as THREE from 'three';
import { ref, type Ref } from 'vue';

export interface Collider {
  x: number;
  z: number;
  radius: number;
}

export interface PlayerOptions {
  /** Room inner radius — player can't walk past it. */
  bounds: number;
  /** Solid objects (exhibit platforms) the player is pushed out of. */
  colliders: Collider[];
  eyeHeight?: number;
  /** Units per second. */
  speed?: number;
  /** Return false to suppress pointer-lock on click (e.g. a panel is open). */
  canLock?: () => boolean;
}

export interface Player {
  /** True while the pointer is locked (i.e. the player is actively walking). */
  isLocked: Ref<boolean>;
  update: (dt: number) => void;
  unlock: () => void;
  dispose: () => void;
}

/**
 * First-person controller. Click the canvas to lock the pointer, then
 * WASD to move and mouse to look. Movement only happens while locked.
 */
export function usePlayer(
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
  options: PlayerOptions,
): Player {
  const eyeHeight = options.eyeHeight ?? 1.6;
  const speed = options.speed ?? 5;
  const margin = 0.8;

  const isLocked = ref(false);
  const keys = new Set<string>();

  let yaw = 0;
  let pitch = 0;
  const sensitivity = 0.0022;
  const maxPitch = Math.PI / 2 - 0.05;

  camera.rotation.order = 'YXZ';
  camera.position.set(0, eyeHeight, 0);

  // ---- Pointer lock ------------------------------------------------------
  const onCanvasClick = () => {
    if (options.canLock && !options.canLock()) return;
    if (!isLocked.value) canvas.requestPointerLock();
  };
  const onLockChange = () => {
    isLocked.value = document.pointerLockElement === canvas;
    if (!isLocked.value) keys.clear(); // stop drifting when we lose focus
  };
  const onMouseMove = (e: MouseEvent) => {
    console.log('moving')
    if (!isLocked.value) return;
    yaw -= e.movementX * sensitivity;
    pitch -= e.movementY * sensitivity;
    pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));
    camera.rotation.set(pitch, yaw, 0);
  };

  // ---- Keyboard ----------------------------------------------------------
  const onKeyDown = (e: KeyboardEvent) => keys.add(e.code);
  const onKeyUp = (e: KeyboardEvent) => keys.delete(e.code);

  canvas.addEventListener('click', onCanvasClick);
  document.addEventListener('pointerlockchange', onLockChange);
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  // Reusable scratch vectors (avoid per-frame allocation).
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const move = new THREE.Vector3();

  const update = (dt: number) => {
    if (!isLocked.value) return;

    // Direction on the floor plane derived from yaw.
    forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
    right.set(Math.cos(yaw), 0, -Math.sin(yaw));

    move.set(0, 0, 0);
    if (keys.has('KeyW') || keys.has('ArrowUp')) move.add(forward);
    if (keys.has('KeyS') || keys.has('ArrowDown')) move.sub(forward);
    if (keys.has('KeyD') || keys.has('ArrowRight')) move.add(right);
    if (keys.has('KeyA') || keys.has('ArrowLeft')) move.sub(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed * dt);
      const x = camera.position.x + move.x;
      const z = camera.position.z + move.z;
      const clamped = resolveCollisions(x, z);
      camera.position.x = clamped.x;
      camera.position.z = clamped.z;
    }
    camera.position.y = eyeHeight;
  };

  /** Keep the player inside the room and out of exhibit platforms. */
  const resolveCollisions = (x: number, z: number) => {
    // Push out of each exhibit platform.
    for (const c of options.colliders) {
      const dx = x - c.x;
      const dz = z - c.z;
      const dist = Math.hypot(dx, dz);
      if (dist < c.radius) {
        if (dist < 1e-4) {
          x = c.x + c.radius;
        } else {
          x = c.x + (dx / dist) * c.radius;
          z = c.z + (dz / dist) * c.radius;
        }
      }
    }
    // Clamp to the circular room.
    const limit = options.bounds - margin;
    const r = Math.hypot(x, z);
    if (r > limit) {
      x = (x / r) * limit;
      z = (z / r) * limit;
    }
    return { x, z };
  };

  const unlock = () => {
    if (document.pointerLockElement === canvas) document.exitPointerLock();
  };

  const dispose = () => {
    unlock();
    canvas.removeEventListener('click', onCanvasClick);
    document.removeEventListener('pointerlockchange', onLockChange);
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  };

  return { isLocked, update, unlock, dispose };
}
