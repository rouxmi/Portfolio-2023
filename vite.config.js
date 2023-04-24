import glsl from "vite-plugin-glsl"
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [glsl()],
    root: "src",
    publicDir: "../public",
    build: {
        outDir:"../build",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main:  'src/index.html',
                contact:'src/Contact/contact-form.html',
            }
        }
    }
    
});