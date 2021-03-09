module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  transform: {
    '^.+\\.(ts|tsx)$': require.resolve('ts-jest/dist')
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  testMatch: ['<rootDir>/src/**/*.spec.+(ts|tsx)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/scripts/'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/db/migration/'
  ]
}
