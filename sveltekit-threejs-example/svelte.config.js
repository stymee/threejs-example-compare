import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        // target: '#svelte',
        //ssr: false,
        // ssr: {
        //     noExternal: Object.keys(pkg.dependencies || {}),
        // },
        // vite: {
        //     optimizeDeps: {
        //         include: ['three.js'],
        //     },
        // }
    },
};

export default config;
