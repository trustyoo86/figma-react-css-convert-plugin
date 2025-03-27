import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        code: resolve(__dirname, 'src/code.ts'),
        ui: resolve(__dirname, 'src/ui.html')
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === 'code' ? 'code.js' : 'ui.js';
        },
        assetFileNames: '[name][extname]'
      }
    },
    emptyOutDir: true,
    target: 'esnext',
    minify: false
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/ui.html',
          dest: '.'
        }
      ]
    })
  ]
});