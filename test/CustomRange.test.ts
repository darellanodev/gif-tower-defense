import { MathUtils } from '../src/MathUtils'

describe('range', () => {
  test('when arguments are 1 and 5, return [1, 2, 3, 4, 5]', () => {
    const expected = [1, 2, 3, 4, 5]
    const from = 1
    const to = 5

    const result = MathUtils.range(from, to)

    expect(result).toStrictEqual(expected)
  })
  test('when arguments are 0 and 5, return [0, 1, 2, 3, 4, 5]', () => {
    const expected = [0, 1, 2, 3, 4, 5]
    const from = 0
    const to = 5
    const result = MathUtils.range(from, to)

    expect(result).toStrictEqual(expected)
  })
})
