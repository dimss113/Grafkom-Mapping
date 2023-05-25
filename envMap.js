import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube with envMap
const geometry = new THREE.BoxGeometry(1,1, 1);
// const geometry = new THREE.BoxGeometry(3, 3, 3);

const loader = new THREE.CubeTextureLoader();

const textureCube = loader.load([
  "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg",
  "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg",
  "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg",
  "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg",
  "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg",
  "https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg",
]);

scene.background = textureCube;

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  envMap: textureCube,
});

// material.envMap.mapping = THREE.CubeRefractionMapping; // digunakan untuk pencerminan pada objek

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// orbitalcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

animate();
