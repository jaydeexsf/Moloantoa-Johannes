// Three.js Resume Background with Complex Math & Programming Expressions
// Features: Advanced algorithms, data structures, and mathematical concepts

(() => {
  const canvas = document.getElementById('resume-canvas');
  if (!canvas) return;

  const section = document.getElementById('resume');
  const width = section.clientWidth;
  const height = section.clientHeight;

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
  camera.position.z = 25;

  // Complex Programming and Mathematical Expressions
  const complexExpressions = [
    // Advanced Algorithms
    "O(n log n)", "O(1)", "O(n²)", "Θ(n)", "Ω(log n)",
    "QuickSort", "MergeSort", "BFS", "DFS", "Dijkstra",
    "A* Algorithm", "Binary Search", "Dynamic Programming",
    "Greedy Algorithm", "Backtracking", "Divide & Conquer",
    
    // Data Structures
    "LinkedList", "HashMap", "TreeMap", "HashSet",
    "Stack.push()", "Queue.enqueue()", "Heap", "Trie",
    "Graph[V,E]", "BST", "AVL Tree", "Red-Black Tree",
    "B-Tree", "Array[n]", "Matrix[m][n]",
    
    // Advanced Math
    "∫₀^∞ e^(-x²)dx", "∂²f/∂x∂y", "∇²φ = 0", "∮ F·dr",
    "det(A) = |A|", "eigenvalue λ", "∑ᵢ₌₁ⁿ xᵢ²",
    "lim[h→0] (f(x+h)-f(x))/h", "∏ᵢ₌₁ⁿ aᵢ",
    "∫∫∫ f(x,y,z) dV", "∂u/∂t = α∇²u",
    
    // Linear Algebra
    "A⁻¹", "det(AB) = det(A)det(B)", "rank(A)",
    "Ax = b", "||v|| = √(v·v)", "A^T A", "trace(A)",
    "dim(V) = n", "span{v₁,...,vₙ}", "ker(T)",
    
    // Calculus & Analysis
    "Taylor Series", "Fourier Transform", "Laplace",
    "∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)", "curl(F)", "div(F)",
    "Green's Theorem", "Stokes' Theorem", "∫ᵃᵇ f(x)dx",
    
    // Probability & Statistics
    "P(A|B) = P(A∩B)/P(B)", "E[X] = ∑xᵢp(xᵢ)",
    "Var(X) = E[X²] - (E[X])²", "σ² = Var(X)",
    "N(μ, σ²)", "Bayes' Theorem", "∑P(xᵢ) = 1",
    
    // Complex Programming Patterns
    "async function*()", "Promise.all()", "Observable<T>",
    "Generator<T>", "Iterator<T>", "Proxy Handler",
    "Reflect.get()", "WeakMap", "Symbol.iterator",
    "class extends", "super()", "static method",
    
    // Functional Programming
    "map(f, xs)", "fold(f, acc, xs)", "compose(f,g)",
    "curry(f)", "pipe()", "flatMap()", "zip(xs, ys)",
    "filter(pred)", "reduce(fn, init)", "monad",
    
    // Advanced JS/TS
    "type Partial<T>", "interface I<T>", "Generic<T>",
    "keyof typeof", "T extends U", "infer R",
    "Readonly<T>", "Record<K,V>", "Pick<T,K>",
    
    // Database & Queries
    "SELECT * FROM", "JOIN ON", "GROUP BY", "HAVING",
    "INDEX ON", "TRANSACTION", "ACID", "CAP Theorem",
    "db.collection.aggregate()", "INNER JOIN",
    
    // System Design
    "Load Balancer", "CDN", "Cache", "Sharding",
    "Microservices", "Event-Driven", "Pub/Sub",
    "Message Queue", "API Gateway", "Circuit Breaker",
    
    // Networking & Protocols
    "TCP/IP", "HTTP/2", "WebSocket", "gRPC",
    "REST API", "GraphQL", "OAuth 2.0", "JWT",
    "DNS", "SSL/TLS", "CORS", "Rate Limiting",
    
    // Cloud & DevOps
    "Docker Container", "Kubernetes Pod", "CI/CD",
    "Lambda Function", "S3 Bucket", "EC2 Instance",
    "Auto Scaling", "VPC", "IAM Role", "CloudWatch",
    
    // Advanced Concepts
    "Memoization", "Lazy Evaluation", "Tail Recursion",
    "Closure", "Higher-Order Function", "Immutability",
    "Pure Function", "Side Effect", "Referential Transparency",
    
    // Complexity Theory
    "NP-Complete", "P vs NP", "NP-Hard", "Polynomial Time",
    "Exponential Time", "Tractable", "Intractable",
    
    // Machine Learning (bonus)
    "∂L/∂w", "∇J(θ)", "argmax", "softmax(x)",
    "ReLU(x)", "sigmoid(x)", "tanh(x)", "∑wᵢxᵢ + b"
  ];

  // Create floating text sprites with varied colors
  const textObjects = [];
  const colors = [
    '#00d9ff', // Cyan
    '#ff006e', // Pink
    '#8338ec', // Purple
    '#3a86ff', // Blue
    '#fb5607', // Orange
    '#06ffa5', // Green
    '#ffbe0b'  // Yellow
  ];
  
  function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 512;
    canvas.height = 128;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style text
    context.font = 'bold 40px "Courier New", monospace';
    context.fillStyle = 'rgba(255, 255, 255, 0.95)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Add glow effect
    context.shadowColor = color;
    context.shadowBlur = 25;
    
    // Draw text
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create sprite material
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const sprite = new THREE.Sprite(material);
    
    // Random size (smaller for more expressions)
    const scale = Math.random() * 1.5 + 0.8;
    sprite.scale.set(scale * 3.5, scale * 0.9, 1);
    
    // Random position in 3D space
    sprite.position.x = (Math.random() - 0.5) * 70;
    sprite.position.y = (Math.random() - 0.5) * 40;
    sprite.position.z = (Math.random() - 0.5) * 50;
    
    // Store velocity for animation
    sprite.userData.velocity = {
      x: (Math.random() - 0.5) * 0.015,
      y: (Math.random() - 0.5) * 0.015,
      z: (Math.random() - 0.5) * 0.015
    };
    
    sprite.userData.rotationSpeed = (Math.random() - 0.5) * 0.008;
    sprite.userData.baseOpacity = 0.5 + Math.random() * 0.3;
    
    return sprite;
  }

  // Create multiple text objects
  complexExpressions.forEach(expr => {
    const sprite = createTextSprite(expr);
    scene.add(sprite);
    textObjects.push(sprite);
  });

  // Particle system with grid pattern
  function createParticles() {
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 90;
      positions[i3 + 1] = (Math.random() - 0.5) * 90;
      positions[i3 + 2] = (Math.random() - 0.5) * 90;
      
      // Multi-color palette
      const colorIndex = Math.floor(Math.random() * 3);
      if (colorIndex === 0) {
        colors[i3] = 0.0; colors[i3 + 1] = 0.85; colors[i3 + 2] = 1.0; // Cyan
      } else if (colorIndex === 1) {
        colors[i3] = 0.51; colors[i3 + 1] = 0.22; colors[i3 + 2] = 0.93; // Purple
      } else {
        colors[i3] = 1.0; colors[i3 + 1] = 0.0; colors[i3 + 2] = 0.43; // Pink
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
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
    time += 0.008;
    
    // Animate text sprites
    textObjects.forEach((sprite, index) => {
      // Move sprites
      sprite.position.x += sprite.userData.velocity.x;
      sprite.position.y += sprite.userData.velocity.y;
      sprite.position.z += sprite.userData.velocity.z;
      
      // Boundary check and wrap around
      if (Math.abs(sprite.position.x) > 35) sprite.userData.velocity.x *= -1;
      if (Math.abs(sprite.position.y) > 20) sprite.userData.velocity.y *= -1;
      if (Math.abs(sprite.position.z) > 25) sprite.userData.velocity.z *= -1;
      
      // Subtle rotation
      sprite.material.rotation += sprite.userData.rotationSpeed;
      
      // Pulsing opacity
      sprite.material.opacity = sprite.userData.baseOpacity + Math.sin(time * 2 + index * 0.15) * 0.25;
    });
    
    // Rotate particle system
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
    
    // Gentle camera movement
    camera.position.x = Math.sin(time * 0.08) * 1.5;
    camera.position.y = Math.cos(time * 0.12) * 0.8;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
  }

  // Handle window resize
  function onWindowResize() {
    const width = section.clientWidth;
    const height = section.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', onWindowResize);
  
  // Start animation
  animate();
})();
