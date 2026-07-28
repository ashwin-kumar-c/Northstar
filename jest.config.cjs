module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
}
