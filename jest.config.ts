export default {
  // Stop running tests after `n` failures
  // bail: 4,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(tsx|ts)?$': 'ts-jest'
  },

  // Whether to use watchman for file crawling
  watchman: true,

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
}
