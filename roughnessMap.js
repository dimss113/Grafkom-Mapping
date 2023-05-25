import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const params = {
  roughness: 0.0,
};

const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// renderer.toneMapping = THREE.ACESFilmicToneMapping;

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();

// RESIZE HAMDLER
export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

// INIT CAMERA
camera.position.z = 5;
camera.lookAt(0, 0, -20);

// INIT HEMISPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// SCENE
scene.background = new THREE.Color(0xffffff);
const textureLoader = new THREE.TextureLoader();
const grassNormalMap = textureLoader.load("./texture/grass_normal_map.png");
const sphereBaseColor = textureLoader.load("./texture/Metal_006_basecolor.jpg");
const sphereRoughnessMap = textureLoader.load("./texture/Metal_006_roughness.jpg");
const sphereNormalMap = textureLoader.load("./texture/Metal_006_normal.jpg");

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40, 1),
  new THREE.MeshPhongMaterial({ color: 0x0a7d15, normalMap: grassNormalMap })
);
plane.rotation.x = -Math.PI / 2;
plane.material.normalMap.wrapS = plane.material.normalMap.wrapT =
  THREE.RepeatWrapping;
plane.material.normalMap.repeat.x = plane.material.normalMap.repeat.y = 5;
scene.add(plane);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
} );

const cubeCamera = new THREE.CubeCamera( 1, 10000, cubeRenderTarget );

const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({
  map: sphereBaseColor,
  normalMap: sphereNormalMap,
  roughnessMap: sphereRoughnessMap,
  roughness: params.roughness,
  envMap: cubeRenderTarget.texture,
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.geometry.attributes.uv2 = sphereMesh.geometry.attributes.uv;
sphereMesh.position.x = -2;
sphereMesh.position.y = 1;
sphereMesh.position.z = 0;
sphereMesh.add(cubeCamera);
scene.add(sphereMesh);


const gui = new GUI();
gui.add( params, 'roughness', 0, 1, 0.01 );
gui.open();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x += 20;
directionalLight.position.y += 20;
directionalLight.position.z += 20;
scene.add(directionalLight);

// ANIMATE
function animate() {

  sphereMesh.material.roughness = params.roughness;
  
  const time = Date.now() * 0.0005;
  directionalLight.position.x = Math.sin(time * 0.7) * 20;
  directionalLight.position.z = Math.abs(Math.cos(time * 0.7)) * 20;

  controls.update();

  cubeCamera.update(renderer, scene);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();
