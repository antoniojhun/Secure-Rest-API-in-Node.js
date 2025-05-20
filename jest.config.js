/**
 * Jest configuration for Secure-Rest-API-in-Node.js
 */
module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/users', '<rootDir>/authorization', '<rootDir>/common'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],

  // A map from regular expressions to paths to transformers
  transform: {},

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],

  // Avoid timeouts on MongoDB operations
  testTimeout: 30000,

  // Automatically mock mongoose service
  moduleNameMapper: {
    '^mongoose$': '<rootDir>/node_modules/mongoose'
  },

  // Set this to make Jest aware of mocks
  resetMocks: true,
  restoreMocks: true,

  // Initialize environment before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
