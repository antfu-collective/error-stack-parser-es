import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/lite',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
