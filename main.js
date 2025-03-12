import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader();
const theScene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
//camera.lookAt(0, 0, 0);
const light = new THREE.AmbientLight(0x606060); // soft white light
theScene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
theScene.add(directionalLight);

let zPos = 100;

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

const theCube = createCube();
theScene.add(theCube);

const theLine = createLine();
theScene.add(theLine);

loadModel("./public/low_australian_shepherd.glb", theScene);

window.addEventListener("wheel", (e) => {
    console.log(e.deltaY);
    zPos += e.deltaY / 20;
})

function animate() {
    renderer.render(theScene, camera);
    rotateCube(theCube);
    camera.position.z = zPos;
}
renderer.setAnimationLoop(animate);