const {theTruth} = require('./sum.ts')

describe('ma première suite de tests', () => {
  test('mon premier test', () => {
    const isTrue = theTruth()
    expect(isTrue).toBe(true)
  })
})