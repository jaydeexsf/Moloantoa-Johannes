// Three.js Sidebar Background - Subtle animated particles
// Features: Gentle floating particles with minimal distraction

(() => {
  const canvas = document.getElementById('sidebar-canvas');
  if (!canvas) return;

  const header = document.getElementById('header');
  const width = header.clientWidth;
  const height = header.clientHeight;

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 15;

  // Create subtle particle system
  function createParticles() {
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position particles in a vertical column
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Cyan/blue color palette
      colors[i3] = 0.0;
      colors[i3 + 1] = 0.85;
      colors[i3 + 2] = 1.0;
      
      // Random sizes
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    return particles;
  }

  // Create connecting lines between particles
  function createLines() {
    const lineCount = 30;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(lineCount * 2 * 3);
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      
      // Random line positions
      positions[i6] = (Math.random() - 0.5) * 15;
      positions[i6 + 1] = (Math.random() - 0.5) * 30;
      positions[i6 + 2] = (Math.random() - 0.5) * 10;
      
      positions[i6 + 3] = (Math.random() - 0.5) * 15;
      positions[i6 + 4] = (Math.random() - 0.5) * 30;
      positions[i6 + 5] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);
    return lines;
  }

  const particles = createParticles();
  const lines = createLines();

  // Animation loop
  let time = 0;
  
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;
    
    // Animate particles - very subtle movement
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      // Gentle floating motion
      positions[i] += Math.sin(time + i * 0.1) * 0.002;
      positions[i + 1] += Math.cos(time + i * 0.05) * 0.003;
      
      // Wrap around if particles go too far
      if (positions[i + 1] > 15) positions[i + 1] = -15;
      if (positions[i + 1] < -15) positions[i + 1] = 15;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    
    // Rotate particles very slowly
    particles.rotation.y += 0.0002;
    
    // Animate lines
    lines.rotation.y += 0.0001;
    
    // Gentle camera sway
    camera.position.x = Math.sin(time * 0.1) * 0.5;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
  }

  // Handle window resize
  function onWindowResize() {
    const width = header.clientWidth;
    const height = header.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', onWindowResize);
  
  // Start animation
  animate();
})();
