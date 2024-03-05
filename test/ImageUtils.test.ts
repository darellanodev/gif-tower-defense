import { MathUtils } from '../src/MathUtils'

describe('Get an enemyImage', () => {
  test('for enemy 0 should return 0, 4', () => {
    const expected = [0, 4]
    const result = MathUtils.getTwoNumbersFourTimes(0)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 1 should return 4, 8', () => {
    const expected = [4, 8]
    const result = MathUtils.getTwoNumbersFourTimes(1)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 2 should return 8, 12', () => {
    const expected = [8, 12]
    const result = MathUtils.getTwoNumbersFourTimes(2)

    expect(result).toStrictEqual(expected)
  })
})
