### Description

I have been working on moving a vanilla js/ts/vite + three.js project into SvelteKit (because Svelte is awesome). I assumed all of the same imports would work, but I keep getting an error when I try to import OrbitControls per the usual method. Same goes for some other items.

Windows 10 19041.984
node v15.2.1
npm 7.0.8

### Screenshots

Here's what you should see from both projects:

![A Box](https://lh3.googleusercontent.com/pw/ACtC-3c3OSKqTwuvcP8gczTo-TGEdNYPpDixEsySQJGkyhKVQ_AqmeiFFgat_omU3WNigLJykkvnhW_D5Boj9yk_hXD57mFVHxH2iZHC91E4oMHIbGrZlf38QfblFvWX3QkKEsrzEAzsMbegyS6ozs_Ln6ZKhw=w920-h492-no?authuser=0)

### To Reproduce

Create a skeleton SvelteKit project and put in the bare minimum ThreeJs stuff to get a cube on the screen. Try to import OrbitControls like so:

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
```

### Tasks

-   [ ] Run the vanilla js Vite version

```bash
cd vite-threejs-example
npm install
npm run dev
```

and open http://localhost:3002

-   [ ] Run the SvelteKit version

```bash
cd sveltekit-threejs-example
npm install
npm run dev
```

and open http://localhost:3001

### The svelte version should give you an error

```code
500
Cannot use import statement outside a module

C:\Users\styme\source\repos\threejs-example-compare\sveltekit-threejs-example\node_modules\three\examples\jsm\controls\OrbitControls.js:1
import {
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at wrapSafe (node:internal/modules/cjs/loader:1018:16)
    at Module._compile (node:internal/modules/cjs/loader:1066:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1131:10)
    at Module.load (node:internal/modules/cjs/loader:967:32)
    at Function.Module._load (node:internal/modules/cjs/loader:807:14)
    at Module.require (node:internal/modules/cjs/loader:991:19)
    at require (node:internal/modules/cjs/helpers:92:18)
    at nodeRequire (C:\Users\styme\source\repos\threejs-example-compare\sveltekit-threejs-example\node_modules\vite\dist\node\chunks\dep-e9a16784.js:68211:17)
    at ssrImport (C:\Users\styme\source\repos\threejs-example-compare\sveltekit-threejs-example\node_modules\vite\dist\node\chunks\dep-e9a16784.js:68164:20)
    at eval (C:\Users\styme\source\repos\threejs-example-compare\sveltekit-threejs-example\src\routes\index.svelte:13:31)
```

However, if you change the import statement to point directly at the file in node_modules, it works?

```javascript
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
```

I looked into several issues talking about settings in the svelte.config.js or vite.config.js files. These seemed to be aimed towards issues when creating a node project. This is strictly client side. I tried disabling ssr, and using the OptimizeDependencies, but nothing seems to work.

I'm sure I'm missing something really simple, but it's obviously over my head. Any suggestions?

### Severity

Not the end of the world, but I'm curious what I'm doing wrong
