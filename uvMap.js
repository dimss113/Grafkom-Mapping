import * as THREE from "three";

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer();

const A_texture = new THREE.TextureLoader().load("./texture/A.png");


// // new geometry
const geometry = new THREE.BufferGeometry();
let vertices = new Float32Array([
  -1.0, -1.0, 0.0, // 0
  1.0, -1.0, 0.0, // 2
  1.0, 1.0, 0.0, // 1
   
  1.0, 1.0, 0.0, // 0
  -1.0, 1.0, 0.0, // 3
  -1.0, -1.0, 0.0, // 1
]);

// // digunakan untuk penempatan map
// // hanya menggunakan 2 koordinat x dan y relative terhadap titik pada vertices
let uvs = new Float32Array([
  0.0, 0.0, // 0
  1.0, 0.0, // 2
  1.0, 1.0, // 1

  1.0, 1.0, // 0
  0.0, 1.0, // 3
  0.0, 0.0, // 1

]);


geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, map: A_texture});
const mesh_ = new THREE.Mesh(geometry, material);
mesh_.position.set(0, 0, 0);
scene.add(mesh_);

// kita perlu mengatur posisi kamera agar dapat melihat objek yang kita buat
// default posisi z adalah 0 sehinga kita tidak akan bisa melihat object
cam.position.z = 5; // z positif mendekati arah user atau semakin besar nilai z maka akan semakin jauh kecil objeknya
cam.position.x = 0; // x positif ke arah kiri
cam.position.y = 0; // y positif ke arah atas

// menambahkan ke dalam index html kita domelement hasil pembuatan webgl renderer
renderer.setSize(innerWidth, innerHeight); // mengatur ukuran renderer agar sebesar layar browser kita
document.body.appendChild(renderer.domElement); // menambahkan ke html domElement hasil pebuatan webgl renderer

// refresh ukuran secara otomatis ketika ukuran dari layar browser diubah
window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  cam.aspect = this.window.innerWidth / this.window.innerHeight; // mengatur aspect ratio kamera agar sesuai dengan ukuran layar 
  cam.updateProjectionMatrix(); // mengupdate kamera
});

function draw() {
  requestAnimationFrame(draw); // looping untuk membuat animasi
  renderer.render(scene, cam); // untuk merender scene dan kamera
}

draw(); // apabila kita memanggil draw. draw akan memanggil dirinya sendiri secara terus menerus
