import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Tree {
  constructor(scene) {
    this.scene = scene;
    this.tree = new THREE.Group();
    this.createTree();
  }

  createTree() {
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.4, 0.6, 3, 8);
    const trunkMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      flatShading: true 
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1.5;
    this.tree.add(trunk);

    // Leaves
    const leavesGeometry = new THREE.ConeGeometry(3, 6, 8);
    const leavesMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x228B22,
      flatShading: true 
    });
    
    // Create multiple layers of leaves for a fuller tree
    const leaves1 = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves1.position.y = 5;
    
    const leaves2 = leaves1.clone();
    leaves2.scale.set(0.8, 0.8, 0.8);
    leaves2.position.y = 6.5;
    
    const leaves3 = leaves1.clone();
    leaves3.scale.set(0.6, 0.6, 0.6);
    leaves3.position.y = 7.5;

    this.tree.add(leaves1, leaves2, leaves3);

    // Add some apples
    const appleGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const appleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFF0000,
      flatShading: true 
    });

    const applePositions = [
      { x: 1, y: 5, z: 0.5 },
      { x: -0.8, y: 5.5, z: -0.8 },
      { x: 0.5, y: 6, z: -0.5 },
      { x: 1, y: 4, z: -0.5 },
      { x: -0.5, y: 4.5, z: 0.8 }
    ];

    applePositions.forEach(pos => {
      const apple = new THREE.Mesh(appleGeometry, appleMaterial);
      apple.position.set(pos.x, pos.y, pos.z);
      this.tree.add(apple);
    });

    // Add to scene
    this.scene.add(this.tree);
    this.time = 0;
  }

  update() {
    this.time += 0.01;
    this.tree.rotation.y = Math.sin(this.time * 0.5) * 0.2;
    this.tree.children.forEach((child, i) => {
      if (child.type === 'Mesh' && child.geometry.type === 'ConeGeometry') {
        child.rotation.y = Math.sin(this.time * 0.7 + i) * 0.1;
      }
    });
  }
}

export function initThreeScene(container) {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = null; // Transparent background
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  // Set renderer size and append to container
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.innerHTML = ''; // Clear previous content
  container.appendChild(renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add a subtle blue hemisphere light for ambient occlusion
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Create the tree
  const tree = new Tree(scene);

  // Camera position
  camera.position.z = 12;
  camera.position.y = 5;

  // Add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  // Handle window resize
  const onWindowResize = () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Update tree animation
    tree.update();
    
    controls.update();
    renderer.render(scene, camera);
  };

  // Start animation
  animate();

  // Cleanup function
  return () => {
    window.removeEventListener('resize', onWindowResize);
    container.removeChild(renderer.domElement);
    renderer.dispose();
  };
}
