/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test/styleMock.cjs',
  },
}
