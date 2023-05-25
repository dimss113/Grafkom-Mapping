import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const params = {
  roughness: 0.0,
  clearcoat: 1,
  clearcoatNormalScale: 0,
  transmission: 1,
  thickness: 1,
};

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
renderer.setClearColor(0x1f1e1c, 1);

const bgTexture = new THREE.TextureLoader().load("./texture/clearcoatBG.jpg");
const normalMapTexture = new THREE.TextureLoader().load(
  "./texture/clearcoatNormal.jpg"
);
normalMapTexture.wrapS = THREE.RepeatWrapping;
normalMapTexture.wrapT = THREE.RepeatWrapping;
normalMapTexture.repeat.set(1, 1);

const bgGeometry = new THREE.PlaneGeometry(5, 5);
const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.position.set(0, 0, -1);
scene.add(bgMesh);

// geometry
const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshPhysicalMaterial({
  clearcoat: params.clearcoat, // set clearcoat
  normalMap: normalMapTexture,
  clearcoatNormalMap: normalMapTexture,
  roughness: params.roughness, // set roughness
  transmission: params.transmission, // add transparency
  thickness: params.thickness, // set thickness
  clearcoatNormalScale: new THREE.Vector2(
    0, 1
  ),
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight(0xfff0dd, 1);
light.position.set(0, 5, 10);
scene.add(light);

// orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

camera.position.set(0, 0, 5);

// gui
const gui = new GUI();
gui.add(params, "roughness", 0, 1, 0.01);
gui.add(params, "clearcoat", 0, 1, 0.01);
gui.add(params, "clearcoatNormalScale", 0, 10, 0.01);
gui.add(params, "transmission", 0, 1, 0.01);
gui.add(params, "thickness", 0, 1, 0.01);
gui.open();

function animate() {
  mesh.material.clearcoat = params.clearcoat;
  mesh.material.roughness = params.roughness;
  mesh.material.clearcoatNormalScale.set(
    params.clearcoatNormalScale,
    params.clearcoatNormalScale
  );
  mesh.material.transmission = params.transmission;
  mesh.material.thickness = params.thickness;

  requestAnimationFrame(animate);
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();
