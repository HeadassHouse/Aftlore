module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  testMatch: ['**/?(*.)test.js'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  coveragePathIgnorePatterns: ['index.js', 'app.js', 'schemas', 'resolver.js'],
};
