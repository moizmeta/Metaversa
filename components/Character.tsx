import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Set up the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Create a loader for the character model
const loader = new GLTFLoader();

// Load the character model
loader.load('./model/man.gltf', (gltf) => {
  const character = gltf.scene;
  
  // Scale and position the character as needed
  character.scale.set(0.01, 0.01, 0.01);
  character.position.set(0, 0, 0);
  
  // Add the character to the scene
  scene.add(character);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update character movement or animation here
  
  renderer.render(scene, camera);
}
animate();
