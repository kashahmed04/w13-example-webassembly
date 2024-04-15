import { defineConfig } from 'vite';

import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
});

//import wasm lets us import assembly directly instead of writing everything from release.js