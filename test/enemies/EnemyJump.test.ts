import { describe, expect } from 'vitest'
import { ENEMY_JUMP_SPEED } from '../../src/constants/enemy'
import { TILE_SIZE } from '../../src/constants/tile'
import { Enemy } from '../../src/enemies/Enemy'
import { createEnemy } from '../helpers/jumpingEnemy'

const updateTimes = (enemy: Enemy, times: number) => {
  for (let i = 0; i < times; i++) {
    enemy.update()
  }
}

describe('isJumping', () => {
  test('when the first order is a jump, the enemy is jumping', () => {
    expect(createEnemy().isJumping).toBeTruthy()
  })

  test('when there are no jumps, the enemy is not jumping', () => {
    expect(createEnemy([]).isJumping).toBeFalsy()
  })

  test('when the whole jump is done, the enemy is not jumping anymore', () => {
    const enemy = createEnemy()

    updateTimes(enemy, (2 * TILE_SIZE) / ENEMY_JUMP_SPEED)

    expect(enemy.isJumping).toBeFalsy()
  })
})

describe('jumpGrowth', () => {
  test('when the enemy is not jumping, it does not grow', () => {
    expect(createEnemy([]).jumpGrowth).toBe(0)
  })

  test('at the beginning of the jump it does not grow', () => {
    expect(createEnemy().jumpGrowth).toBe(0)
  })

  test('in the middle of a jump of two tiles it grows the maximum', () => {
    const enemy = createEnemy()

    updateTimes(enemy, TILE_SIZE / ENEMY_JUMP_SPEED)

    expect(enemy.jumpGrowth).toBe(6)
  })

  test('after the jump it does not grow', () => {
    const enemy = createEnemy()

    updateTimes(enemy, (2 * TILE_SIZE) / ENEMY_JUMP_SPEED)

    expect(enemy.jumpGrowth).toBe(0)
  })
})

describe('position', () => {
  test('the enemy moves at the jump speed while it jumps', () => {
    const enemy = createEnemy()

    enemy.update()

    expect(enemy.position.x).toBe(20 + ENEMY_JUMP_SPEED)
  })
})
