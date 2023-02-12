import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: './src/index.tsx',
  output: {
    file: './dist/index.js',
    format: 'es'
  },
  plugins: [
    typescript({ compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es5' } }),
    resolve({
      browser: true
    })
  ],
  external: [
    'react',
    'jalali-moment',
    '@emotion/react',
    '@emotion/styled'
  ]
}
