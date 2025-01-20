// rollup.config.js
export default {
    input: 'src/main.js', // Your entry point
    output: {
        dir: 'dist', // Your output directory
        format: 'esm', // Output format
        chunkSizeWarningLimit: 1000 // Increase the warning limit to 1000 kB
    }
}
