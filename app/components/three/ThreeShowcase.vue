<template>
  <div class="absolute inset-0">
    <canvas ref="canvasRef" class="block h-full w-full" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';

const canvasRef = ref<HTMLCanvasElement | null>(null);

const pointer = { x: 0, y: 0 };

let cleanup = () => {};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const box = canvas.parentElement as HTMLElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(box.clientWidth, box.clientHeight);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    box.clientWidth / box.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 6);

  const knotGeometry = new THREE.TorusKnotGeometry(1.4, 0.42, 220, 32);
  const knotMaterial = new THREE.MeshStandardMaterial({
    color: 0x111826,
    metalness: 0.55,
    roughness: 0.3,
    emissive: 0x0b2a2a,
    emissiveIntensity: 0.4,
  });
  const knot = new THREE.Mesh(knotGeometry, knotMaterial);
  scene.add(knot);

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  const tealLight = new THREE.DirectionalLight(0x64ffda, 2.6);
  tealLight.position.set(5, 3, 4);
  const magentaLight = new THREE.DirectionalLight(0xe040fb, 2.0);
  magentaLight.position.set(-5, -2, -3);
  scene.add(ambient, tealLight, magentaLight);

  const STAR_COUNT = 1600;
  const positions = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    const radius = 9 + Math.random() * 22;
    const theta = Math.random() * Math.PI * 2;      // around
    const phi = Math.acos(2 * Math.random() - 1);   // up/down (evenly spread)
    positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clock = new THREE.Clock();
  let animationId = 0;
  const renderFrame = () => {
    const t = clock.getElapsedTime();

    if (!reduceMotion) {
      knot.rotation.x = t * 0.3;
      knot.rotation.y = t * 0.2;
      stars.rotation.y = t * 0.02;
    }

    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.05;
    camera.position.y += (pointer.y * 1.1 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(renderFrame);
  };
  renderFrame();

  const onPointerMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener('pointermove', onPointerMove);

  const onResize = () => {
    const w = box.clientWidth;
    const h = box.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix(); // apply the new aspect
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  cleanup = () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
    knotGeometry.dispose();
    knotMaterial.dispose();
    starGeometry.dispose();
    starMaterial.dispose();
    renderer.dispose();
  };
});

onBeforeUnmount(() => cleanup());
</script>
