const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  verbose: true,
  roots: ['./src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['./src/setupJest.ts'],
  testPathIgnorePatterns:[
    './node_modules/',
    './dist/'
  ],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-app',
  moduleDirectories:[
    'node_modules',
    './'
  ],
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'Test Report',
      includeFailureMsg:true,
      includeSuiteFailure:true
    }]
  ]
};
