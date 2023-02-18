import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: './src/index.tsx',
  output: {
    file: './dist/index.js',
    format: 'es'
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
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
