import * as THREE from 'three'


var fs = require("fs");
var myJson = {
  "mem": 8
};

fs.writeFile("filename.json", JSON.stringify(myJson), "utf8", yourCallback);

// And then, to read it...
myJson = require("./filename.json");


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.IcosahedronGeometry(0.2)
const material = new THREE.MeshBasicMaterial({ color: 0xff0100, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const geometry2 = new THREE.IcosahedronGeometry(0.2)
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const mesh2 = new THREE.Mesh(geometry2, material2)
scene.add(mesh2)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Cursor
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)

  console.log(cursor.x, cursor.y)
})

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const clock = new THREE.Clock()


window.addEventListener('click', (event) => {
  const g = new THREE.IcosahedronGeometry(0.2)
  const m = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  const me = new THREE.Mesh(g, m)
  me.position.x = cursor.x;
  me.position.y = cursor.y;
  scene.add(me)
})


/**
 * Animate
 */
const tick = () => {
  // Update objects
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  mesh.position.x = Math.sin(elapsedTime);
  mesh.position.y = Math.cos(elapsedTime);
  mesh.position.z = Math.sin(elapsedTime);
  mesh.rotation.y = elapsedTime;
  mesh.rotation.z = elapsedTime / 2;

  mesh2.position.x = cursor.x;
  mesh2.position.y = cursor.y;
  mesh2.rotation.y = elapsedTime / 5;
  mesh2.rotation.z = elapsedTime / 3;
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()