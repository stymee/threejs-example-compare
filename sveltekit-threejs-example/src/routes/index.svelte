<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import * as THREE from 'three';	

	// orbitcontrols import below results in an error?
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	// 	500
	// Cannot use import statement outside a module
	// C:\Users\styme\source\repos\sveltekit-threejs-example\node_modules\three\examples\jsm\controls\OrbitControls.js:1
	// import {
	// ^^^^^^
	// SyntaxError: Cannot use import statement outside a module
	//     at wrapSafe (node:internal/modules/cjs/loader:1018:16)
	//     at Module._compile (node:internal/modules/cjs/loader:1066:27)
	//     at Object.Module._extensions..js (node:internal/modules/cjs/loader:1131:10)
	//     at Module.load (node:internal/modules/cjs/loader:967:32)
	//     at Function.Module._load (node:internal/modules/cjs/loader:807:14)
	//     at Module.require (node:internal/modules/cjs/loader:991:19)
	//     at require (node:internal/modules/cjs/helpers:92:18)
	//     at nodeRequire (C:\Users\styme\source\repos\sveltekit-threejs-example\node_modules\vite\dist\node\chunks\dep-e9a16784.js:68211:17)
	//     at ssrImport (C:\Users\styme\source\repos\sveltekit-threejs-example\node_modules\vite\dist\node\chunks\dep-e9a16784.js:68164:20)
	//     at eval (C:\Users\styme\source\repos\sveltekit-threejs-example\src\routes\index.svelte:13:31)

	// but pointing directly to the node_modules directory works ok?
	//import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let controls: OrbitControls;
	let box: THREE.Mesh;

	let rotateMe = true;


	const click = (e:Event) => {
		rotateMe = !rotateMe;
		(<HTMLButtonElement>e.target).innerText = rotateMe ? 'stop' : 'start';
	}


	const resize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
	};


	const tick = () => {
		requestAnimationFrame(tick);

		if (rotateMe) {
			box.rotation.x += 0.01;
			box.rotation.y += 0.01;
		}

		controls.update();
		renderer.render(scene, camera);
	};

	
	onMount(() => {
		scene = new THREE.Scene();
		scene.add(new THREE.AxesHelper(10));
		box = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshNormalMaterial());
		scene.add(box);

		camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 50;

		controls = new OrbitControls(camera, canvas);
		controls.zoomSpeed = 3;

		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
		});

		resize();
		tick();
	});

</script>

<svelte:window on:resize={resize}/>

<canvas bind:this={canvas}></canvas>
<div id="controls">
	<p>Left click to Rotate</p>
	<p>Right click to Pan</p>
	<p>Scroll click to Zoom</p>
	<button on:click={click}>stop</button>
</div>