import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'FrontendChallenges',
        exports: 'named',
        globals: {
            vue: 'Vue'
        }
    },
    external: ['vue'],
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true // Explicitly convert template to render function
        }),
        buble({
            objectAssign: 'Object.assign'
        }) // Transpile to ES5
    ]
};
