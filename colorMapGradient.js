
import * as THREE from "three";

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer();

// membuat geometry kita sendiri
const geo_saya = new THREE.BufferGeometry(); // informasi yang tersimpan bentukya buffer atau tempat penyimpanan yang disebut buffer
// setiap geometri 3 dimensi dibentuk dari titik tiitk 3 dimensi yang disebut vertex
let vertices = new Float32Array([
  -1.0, -1.0, 1.0, // x, y, z //0
  1.0, 1.0, 1.0, // 1
  -1.0, 1.0, 1.0, // 2
  1.0, -1.0, 1.0, // 3

  -1.0, -1.0, -1.0, // x, y, z //4
  1.0, 1.0, -1.0, // 5
  -1.0, 1.0, -1.0, // 6
  1.0, -1.0, -1.0, // 7

]);

// arah penggambaran object dari titik sangat berpengaruh
// apabila kita buat vertex berlawanan arah jarum jam maka arah luarnya menghadap kita
// apabila kita buat vertex searah jarum jam maka arah luarnya menghadap kebalik kita
// atau kita bisa paksa dengan menggunakan property side pada material

// membuat colors
let colors = new Float32Array([
  1.0, 0.0, 0.0, // r, g, b //red //vertex 0
  1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
])

// memasukkan vertex ke buffer geometry
// position menyimpan informasi posisi dari vetex (titik dimana saja)
// normal menyatakan arah atasnya dimana 
// color apabila kita ingin tiap titik memiliki warna yang berbeda
geo_saya.setAttribute("position", new THREE.BufferAttribute(vertices, 3)); // 3 adalah jumlah komponen dari setiap vertex atau maksudnya 3 adalah untuk satu titik memerlukan 3 nilai
// const mat_saya = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }); // doubleside: 2 sisi depan belakang digambar bila tidak maka apabila diputar bagian belakang tidak akan terlihat

// menambahkan attribute color
geo_saya.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // 3 adalah jumlah komponen dari setiap vertex atau maksudnya 3 adalah untuk satu titik memerlukan 3 nilai

// membuat bentuk berdasarkan yang disebutkan saja meskipun pada vertices terdapat lebih dari 3 titik
geo_saya.setIndex([
  // sisi depan (berlawanan arah jarum jam)
  0,3,1,
  1,2,0,

  // sisi belakang (searah jarum jam)
  4, 6, 5,
  5, 7, 4,

  // sisi samping kiri (searah jarum jam)
  0,2,6,
  6,4,0,


  // sisi samping kanan (berlawanan jarum jam)
  3, 7, 5, 
  5, 1, 3,

  // sisi atas (berlawanan jarum jam)
  1, 5, 6, 
  6, 2, 1, 

  // sisi bawah (searah jarum jam)
  0, 4, 7,
  7, 3, 0,
]); 
const mat_saya = new THREE.MeshBasicMaterial({vertexColors: true});
let mesh_saya = new THREE.Mesh(geo_saya, mat_saya);
scene.add(mesh_saya);

// bentuk 3 dimensi pada threejs disebut sebagai mesh
// mesh terbuat dari 2 unsur yaitu geometry dan material
// geometry menyatakan bentuk, material menyatakan jenisya

// kita perlu mengatur posisi kamera agar dapat melihat objek yang kita buat
// default posisi z adalah 0 sehinga kita tidak akan bisa melihat object
cam.position.z = 10; // z positif mendekati arah user atau semakin besar nilai z maka akan semakin jauh kecil objeknya
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
  mesh_saya.rotation.x += 0.01; // akan berotasi terhadap sumbu x
  mesh_saya.rotation.y += 0.01; // akan berotasi terhadap sumbu y
  renderer.render(scene, cam); // untuk merender scene dan kamera
}

draw(); // apabila kita memanggil draw. draw akan memanggil dirinya sendiri secara terus menerus
