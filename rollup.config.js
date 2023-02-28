import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
export default {
  input: './src/index.tsx',
  output: [
    {
      file: './dist/index.js',
      format: 'es'
    },
    {
      file: './dist/index.cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    resolve({
      browser: true
    }),
    babel({ babelHelpers: 'bundled' })
  ],
  external: [
    'react',
    'jalali-moment',
    '@emotion/react',
    '@emotion/styled'
  ]
}
