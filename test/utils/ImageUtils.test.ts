import { MathUtils } from '../../src/utils/MathUtils'

describe('getTwoNumbersFourTimes', () => {
  test('for enemy 0, return [0, 4]', () => {
    const expected = [0, 4]

    const result = MathUtils.getTwoNumbersFourTimes(0)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 1, return [4, 8]', () => {
    const expected = [4, 8]

    const result = MathUtils.getTwoNumbersFourTimes(1)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 2, return [8, 12]', () => {
    const expected = [8, 12]

    const result = MathUtils.getTwoNumbersFourTimes(2)

    expect(result).toStrictEqual(expected)
  })
})
