import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    lite: 'src/lite.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  target: 'es2018',
  tsconfig: 'tsconfig.json',
  exports: true,
  publint: true,
})
