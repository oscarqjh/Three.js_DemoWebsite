import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

// object torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347
});
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

torus.position.x = 30;
torus.position.y = 30;

// object torus knot
const torusKnot = new THREE.Mesh( 
  new THREE.TorusKnotGeometry( 15, 2, 100, 16, 2, 5),
  new THREE.MeshStandardMaterial({
    color: 0xFF9348,
    wireframe: true
  }));
scene.add( torusKnot );

torusKnot.position.x = 70;
torusKnot.position.y = 70;

//object capsule
const capsule = new THREE.Mesh(
  new THREE.CapsuleGeometry(20, 25, 10, 20),
  new THREE.MeshNormalMaterial({color: 0x00ff00})
);
scene.add(capsule);
capsule.position.x = 140;
capsule.position.y = 140;

// lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// orbit control
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.setZ(30);

// add stars object
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// moon object
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);

// moon.position.z = 30;
// moon.position.x = -10;

// space background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  // camera.position.x = t * 0.05;
  camera.position.y = Math.abs(t * 0.05);
  camera.position.z = Math.abs(t * 0.05);
}

document.body.onscroll = moveCamera;


// animation loop
function animate() {
	requestAnimationFrame( animate );

  // torus rotation
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.01;

  // torusKnot rotation
  torusKnot.rotation.x += 0.001;
  torusKnot.rotation.y += 0.01;

  // capsule rotation
  capsule.rotation.x += 0.01;
  capsule.rotation.y += 0.01;

  // moon rotation
  // moon.rotation.x += 0.001;
  // moon.rotation.y += 0.001;

  controls.update();
	renderer.render( scene, camera );
}
animate();