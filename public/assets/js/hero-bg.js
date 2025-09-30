// Three.js hero background: parametric line mesh (torus grid) + subtle particles
// Black background, semi-transparent white lines, slow rotation, responsive

(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const hero = document.getElementById('hero');
  const width = hero.clientWidth;
  const height = hero.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1); // black background

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  // Parametric torus grid lines
  // Torus parameters
  const R = 2.4; // major radius
  const r = 1.2; // minor radius
  const segU = 240; // along ring
  const segV = 120; // around tube

  function torusPoint(u, v, out) {
    const cu = Math.cos(u), su = Math.sin(u);
    const cv = Math.cos(v), sv = Math.sin(v);
    const x = (R + r * cv) * cu;
    const y = (R + r * cv) * su;
    const z = r * sv;
    out[0] = x; out[1] = y; out[2] = z;
  }

  // Build line segments for grid (both directions) in a single BufferGeometry
  const segments = (segU * (segV - 1)) + (segV * (segU - 1));
  const positions = new Float32Array(segments * 2 * 3); // two points per segment
  let ptr = 0;

  // Lines along U (wrap V)
  for (let j = 0; j < segV; j++) {
    const v = (j / (segV - 1)) * Math.PI * 2;
    let prev = new Float32Array(3);
    torusPoint(0, v, prev);
    for (let i = 1; i < segU; i++) {
      const u = (i / (segU - 1)) * Math.PI * 2;
      const curr = new Float32Array(3);
      torusPoint(u, v, curr);
      positions[ptr++] = prev[0]; positions[ptr++] = prev[1]; positions[ptr++] = prev[2];
      positions[ptr++] = curr[0]; positions[ptr++] = curr[1]; positions[ptr++] = curr[2];
      prev = curr;
    }
  }

  // Lines along V (wrap U)
  for (let i = 0; i < segU; i++) {
    const u = (i / (segU - 1)) * Math.PI * 2;
    let prev = new Float32Array(3);
    torusPoint(u, 0, prev);
    for (let j = 1; j < segV; j++) {
      const v = (j / (segV - 1)) * Math.PI * 2;
      const curr = new Float32Array(3);
      torusPoint(u, v, curr);
      positions[ptr++] = prev[0]; positions[ptr++] = prev[1]; positions[ptr++] = prev[2];
      positions[ptr++] = curr[0]; positions[ptr++] = curr[1]; positions[ptr++] = curr[2];
      prev = curr;
    }
  }

  const gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const gridMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
  const grid = new THREE.LineSegments(gridGeo, gridMat);
  scene.add(grid);

  // Subtle particle field in the background
  const particleCount = 900;
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    pPos[i * 3 + 0] = (Math.random() - 0.5) * 18;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pPos[i * 3 + 2] = -2 - Math.random() * 6;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.12 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Animation
  let t = 0;
  function animate() {
    t += 0.005;
    grid.rotation.x = Math.sin(t * 0.25) * 0.15 + 0.25;
    grid.rotation.y += 0.0025; // slow spin
    particles.rotation.y -= 0.0008;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(animate);
})();


