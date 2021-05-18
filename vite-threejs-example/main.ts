import './style.css';
import * as THREE from 'three';
// orbitcontrols import works just fine in a vanilla Vite project
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = <HTMLCanvasElement>document.getElementById('webgl');

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(10));
const box = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshNormalMaterial());
scene.add(box);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const controls = new OrbitControls(camera, canvas);
controls.zoomSpeed = 3;

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

resize();

let rotateMe = true;
document.getElementById('btn-rotate').addEventListener('click', (e: Event) => {
    rotateMe = !rotateMe;
    (<HTMLButtonElement>e.target).innerText = rotateMe ? 'stop' : 'start';
});

window.addEventListener('resize', resize);

const tick = () => {
    requestAnimationFrame(tick);

    if (rotateMe) {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
};

tick();
