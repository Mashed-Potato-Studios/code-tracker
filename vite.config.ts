import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'FocusMode',
    },
    rollupOptions: {
      external: [],
      output: {
        format: 'umd',
        name: 'FocusMode',
      }
    }
  }
})
