import './style.css'

import * as THREE from 'three'

//where the main view will be placed
const scene = new THREE.Scene();

//using perspective camera which is similar to human eye coordinates
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,15,100);
const material = new THREE.MeshStandardMaterial({color: 0x10A1FF});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//light
const pointLight = new THREE.PointLight(0xFFFF1A);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xFFAF1A)
scene.add(pointLight, ambientLight);


function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;


    renderer.render(scene,camera);
}

animate();