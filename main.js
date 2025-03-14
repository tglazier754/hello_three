import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import "./mouseControl";
import * as Utils from "./utils";


const loader = new GLTFLoader();
const theScene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 30, 100);
//camera.lookAt(0, 0, 0);
const light = new THREE.AmbientLight(0xa0a0a0); // soft white light
theScene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
theScene.add(directionalLight);

window.addEventListener("camerarotate", (e) => {
    const delta = e.detail;
    theScene.rotation.y += delta.x / 100;
    theScene.rotation.x += delta.y / 100;
});

window.addEventListener("camerapan", (e) => {
    const delta = e.detail;
    camera.position.x += -delta.x / 10;
    camera.position.y += delta.y / 10;
})

window.addEventListener("wheel", (e) => {
    console.log(e.deltaY);
    camera.position.z += -e.deltaY / 20;
})


function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}

function createLine() {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(- 10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    return line;
}

function rotateCube(cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

function loadModel(path, scene) {

    loader.load(path, (gltf) => {
        scene.add(gltf.scene);
    }, undefined, (error) => {
        console.error(error);
    });
}


loadModel("./public/low_australian_shepherd.glb", theScene);


function animate() {
    renderer.render(theScene, camera);
}
renderer.setAnimationLoop(animate);