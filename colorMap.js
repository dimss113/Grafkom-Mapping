import * as THREE from  'three';
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

const geometry = new THREE.BoxGeometry(1, 1, 1);

let colors = [
  new THREE.Color(0xff0000), // Sisi depan (merah)
  new THREE.Color(0x00ff00), // Sisi belakang (hijau)
  new THREE.Color(0x0000ff), // Sisi kiri (biru)
  new THREE.Color(0xffff00), // Sisi kanan (kuning)
  new THREE.Color(0xff00ff), // Sisi atas (magenta)
  new THREE.Color(0x00ffff)  // Sisi bawah (cyan)
];


let colorArray = [];
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 4; j++) { // Setiap sisi kubus memiliki 4 titik
    colorArray.push(colors[i].r, colors[i].g, colors[i].b);
  }
}

const colorAttribute = new THREE.BufferAttribute(new Float32Array(colorArray), 3);

geometry.setAttribute("color", colorAttribute);

const material = new THREE.MeshBasicMaterial({vertexColors: true});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

// orbitalcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

animate();