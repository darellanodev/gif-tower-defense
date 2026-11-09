import { describe, expect } from 'vitest'
import { getJumpGrowth } from '../../src/enemies/JumpGrowth'

describe('getJumpGrowth', () => {
  test.each([2, 3, 4])(
    'at the beginning of a jump of %i tiles the enemy does not grow',
    (distance) => {
      expect(getJumpGrowth(0, distance)).toBe(0)
    },
  )

  test.each([2, 3, 4])(
    'at the end of a jump of %i tiles the enemy does not grow',
    (distance) => {
      expect(getJumpGrowth(1, distance)).toBe(0)
    },
  )

  test.each([
    [2, 6],
    [3, 25],
    [4, 65],
  ])(
    'in the middle of a jump of %i tiles the enemy grows %i pixels (legacy game)',
    (distance, peak) => {
      expect(getJumpGrowth(0.5, distance)).toBe(peak)
    },
  )

  test('the growth is symmetric: the same at a quarter and at three quarters of the jump', () => {
    expect(getJumpGrowth(0.25, 4)).toBe(getJumpGrowth(0.75, 4))
  })

  test('a longer jump goes higher', () => {
    expect(getJumpGrowth(0.5, 4)).toBeGreaterThan(getJumpGrowth(0.5, 2))
  })

  test('with an unknown distance the enemy does not grow', () => {
    expect(getJumpGrowth(0.5, 9)).toBe(0)
  })

  test('a progress out of the range 0 to 1 is limited', () => {
    expect([getJumpGrowth(-1, 4), getJumpGrowth(2, 4)]).toStrictEqual([0, 0])
  })
})
