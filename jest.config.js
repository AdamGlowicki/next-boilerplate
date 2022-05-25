module.exports = {
  collectCoverageFrom: ['app/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'app/core/constants',
    'app/themes/globalStyles.ts',
    'app/utils/storybook.ts',
    '(app/)(.*)(/interfaces)',
    '(app/)(.*)(Atoms)',
    '(app/)(.+)(stories.tsx)',
    '(app/)(.+)(styles.ts)',
  ],
  coverageReporters: [
    'text',
    'cobertura',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/app/$1',
    'mocks/(.*)': '<rootDir>/__mocks__/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'coverage' },
    ],
  ],
  roots: ['<rootDir>/app'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
};
