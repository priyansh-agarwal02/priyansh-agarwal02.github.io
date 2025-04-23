import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  base: "/",  // Root path for GitHub Pages user site
  plugins: [
    react(),
    glsl()
  ],
  root: "./client",  // Set the root to the client directory
  publicDir: "./client/public",  // Set the public directory
  build: {
    outDir: "../dist",  // Output to the root dist directory
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client/index.html")
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src")
    }
  },
  // Add support for large models and audio files
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"]
});
