import glsl from "vite-plugin-glsl"
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [glsl()],
    root: "src",
    publicDir: "../public",
    build: {
        outDir:"../build",
        emptyOutDir: true,
    }
    
});