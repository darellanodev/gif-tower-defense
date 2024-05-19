import { Arrays } from '../../src/utils/Arrays'

describe('getTwoNumbersFourTimes', () => {
  test('for enemy 0, return [0, 4]', () => {
    const expected = [0, 4]

    const result = Arrays.getTwoNumbersFourTimes(0)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 1, return [4, 8]', () => {
    const expected = [4, 8]

    const result = Arrays.getTwoNumbersFourTimes(1)

    expect(result).toStrictEqual(expected)
  })
  test('for enemy 2, return [8, 12]', () => {
    const expected = [8, 12]

    const result = Arrays.getTwoNumbersFourTimes(2)

    expect(result).toStrictEqual(expected)
  })
})

describe('range', () => {
  test('when arguments are 1 and 5, return [1, 2, 3, 4, 5]', () => {
    const expected = [1, 2, 3, 4, 5]
    const from = 1
    const to = 5

    const result = Arrays.range(from, to)

    expect(result).toStrictEqual(expected)
  })
  test('when arguments are 0 and 5, return [0, 1, 2, 3, 4, 5]', () => {
    const expected = [0, 1, 2, 3, 4, 5]
    const from = 0
    const to = 5
    const result = Arrays.range(from, to)

    expect(result).toStrictEqual(expected)
  })
})
