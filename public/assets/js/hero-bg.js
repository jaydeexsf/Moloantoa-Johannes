// Three.js Hero Background with Floating Math & Code Expressions
// Features: Animated mathematical formulas and programming code snippets

(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const hero = document.getElementById('hero');
  const width = hero.clientWidth;
  const height = hero.clientHeight;

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 30;

  // Mathematical and Programming Expressions
  const expressions = [
    // Mathematical expressions
    "∫f(x)dx", "∂f/∂x", "∑(n=1→∞)", "lim(x→∞)", "∇·F = ρ",
    "e^(iπ) + 1 = 0", "∫∫∫ dV", "dy/dx", "f'(x)", "∂²u/∂t²",
    "√(a² + b²)", "sin(θ)", "cos(φ)", "tan(α)", "log₂(n)",
    "Σ x²", "∏ aᵢ", "∞", "π", "∆x", "λ", "μ", "σ²",
    
    // Programming expressions
    "function()", "const x = 10", "if (true) {}", "for (i=0)", 
    "return data", "async/await", "=> { }", "map()", "filter()",
    "reduce()", "Promise", "try/catch", "class {}", "import",
    "export", "let arr = []", "while()", "switch", "break",
    "continue", "typeof", "instanceof", "new Object", "null",
    "undefined", "console.log", "fetch()", "JSON.parse",
    "Array.from", "Object.keys", "setTimeout", "callback",
    
    // Code symbols
    "{ }", "[ ]", "( )", "< >", "=>", "&&", "||", "===",
    "!==", "++", "--", "+=", "-=", "*=", "/=", "...", "?:",
    
    // More math
    "∀x ∈ ℝ", "∃y", "⊂", "⊆", "∪", "∩", "∈", "∉",
    "≤", "≥", "≠", "≈", "∝", "∞", "∅", "ℕ", "ℤ", "ℚ", "ℝ", "ℂ"
  ];

  // Create floating text sprites
  const textObjects = [];
  
  function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 512;
    canvas.height = 128;
    
    // Style text
    context.font = 'bold 48px "Courier New", monospace';
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Add glow effect
    context.shadowColor = '#00d9ff';
    context.shadowBlur = 20;
    
    // Draw text
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create sprite material
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const sprite = new THREE.Sprite(material);
    
    // Random size
    const scale = Math.random() * 2 + 1;
    sprite.scale.set(scale * 4, scale, 1);
    
    // Random position in 3D space
    sprite.position.x = (Math.random() - 0.5) * 80;
    sprite.position.y = (Math.random() - 0.5) * 50;
    sprite.position.z = (Math.random() - 0.5) * 60;
    
    // Store velocity for animation
    sprite.userData.velocity = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    };
    
    sprite.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;
    
    return sprite;
  }

  // Create multiple text objects
  expressions.forEach(expr => {
    const sprite = createTextSprite(expr);
    scene.add(sprite);
    textObjects.push(sprite);
  });

  // Particle system for extra ambiance
  function createParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      // Blue-cyan color palette
      colors[i3] = 0.2 + Math.random() * 0.3;
      colors[i3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    return particles;
  }

  const particles = createParticles();

  // Animation loop
  let time = 0;
  
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Animate text sprites
    textObjects.forEach((sprite, index) => {
      // Move sprites
      sprite.position.x += sprite.userData.velocity.x;
      sprite.position.y += sprite.userData.velocity.y;
      sprite.position.z += sprite.userData.velocity.z;
      
      // Boundary check and wrap around
      if (Math.abs(sprite.position.x) > 40) sprite.userData.velocity.x *= -1;
      if (Math.abs(sprite.position.y) > 25) sprite.userData.velocity.y *= -1;
      if (Math.abs(sprite.position.z) > 30) sprite.userData.velocity.z *= -1;
      
      // Subtle rotation
      sprite.material.rotation += sprite.userData.rotationSpeed;
      
      // Pulsing opacity
      sprite.material.opacity = 0.5 + Math.sin(time + index * 0.1) * 0.3;
    });
    
    // Rotate particle system slowly
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    
    // Gentle camera movement
    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.position.y = Math.cos(time * 0.15) * 1;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
  }

  // Handle window resize
  function onWindowResize() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', onWindowResize);
  
  // Start animation
  animate();
})();


