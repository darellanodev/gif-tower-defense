import { describe, expect } from 'vitest'
import { ENEMY_TELEPORT } from '../../src/constants/enemy'
import {
  getTeleportScale,
  TELEPORT_PHASE,
} from '../../src/levels/path/Teleport'

const duration = { OUT: 200, IN: 100 }
const { OUT, IN } = TELEPORT_PHASE

describe('getTeleportScale', () => {
  test('when the enemy is not teleporting, the scale is 1', () => {
    expect(getTeleportScale(null, 0, duration)).toBe(1)
  })

  test('at the beginning of the first phase the enemy has its normal size', () => {
    expect(getTeleportScale(OUT, 0, duration)).toBe(1)
  })

  test('in the middle of the shrinking time the enemy is at half size', () => {
    const shrinkTime = duration.OUT * ENEMY_TELEPORT.SHRINK_FRACTION

    expect(getTeleportScale(OUT, shrinkTime / 2, duration)).toBe(0.5)
  })

  test('when the shrinking time is over, the enemy is tiny', () => {
    const shrinkTime = duration.OUT * ENEMY_TELEPORT.SHRINK_FRACTION

    expect(getTeleportScale(OUT, shrinkTime, duration)).toBe(
      ENEMY_TELEPORT.MIN_SCALE,
    )
  })

  test('the enemy stays tiny until the end of the first phase', () => {
    expect(getTeleportScale(OUT, duration.OUT - 1, duration)).toBe(
      ENEMY_TELEPORT.MIN_SCALE,
    )
  })

  test('at the beginning of the second phase the enemy is tiny', () => {
    expect(getTeleportScale(IN, 0, duration)).toBe(ENEMY_TELEPORT.MIN_SCALE)
  })

  test('when the growing time is over, the enemy has its normal size', () => {
    const growTime = duration.IN * ENEMY_TELEPORT.GROW_FRACTION

    expect(getTeleportScale(IN, growTime, duration)).toBe(1)
  })

  test('the enemy keeps its normal size until the end of the second phase', () => {
    expect(getTeleportScale(IN, duration.IN - 1, duration)).toBe(1)
  })

  test('the scale grows during the second phase', () => {
    expect(getTeleportScale(IN, 40, duration)).toBeGreaterThan(
      getTeleportScale(IN, 10, duration),
    )
  })

  test('the scale shrinks during the first phase', () => {
    expect(getTeleportScale(OUT, 10, duration)).toBeGreaterThan(
      getTeleportScale(OUT, 40, duration),
    )
  })

  test('the scale never goes under the minimum', () => {
    expect(getTeleportScale(OUT, 100000, duration)).toBe(
      ENEMY_TELEPORT.MIN_SCALE,
    )
  })

  test('with an instant teleport, the first phase is tiny and the second one is full size', () => {
    const instant = ENEMY_TELEPORT.INSTANT_DURATION

    expect([
      getTeleportScale(OUT, 0, instant),
      getTeleportScale(IN, 0, instant),
    ]).toStrictEqual([ENEMY_TELEPORT.MIN_SCALE, 1])
  })
})
