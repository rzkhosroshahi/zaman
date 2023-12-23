import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

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
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        '**/__tests__',
        '**/*.test.*',
        'client/**/*',
        'cypress/**/*',
        '**/*.cy.tsx',
        './*.config.ts',
        './*.config.js'
      ]
    }),
    resolve({
      dedupe: ['dayjs']
    }),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    terser()
  ],
  external: [
    'react',
    'react-dom',
    'jalali-moment',
    '@emotion/react',
    '@emotion/styled'
  ]
}
