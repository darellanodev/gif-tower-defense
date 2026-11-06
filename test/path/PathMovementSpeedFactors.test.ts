import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_VELOCITY } from '../../src/constants/enemy'
import { TILE_SIZE } from '../../src/constants/tile'
import { PathMovement } from '../../src/levels/path/PathMovement'

const startPosition = { x: 200, y: 100 }
const orders = [DIRECTION.LEFT, DIRECTION.LEFT, DIRECTION.LEFT]

const updateTimes = (pathMovement: PathMovement, times: number) => {
  for (let i = 0; i < times; i++) {
    pathMovement.update()
  }
}

describe('currentSpeed', () => {
  test('when there are no speed factors, return the base speed', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1)

    expect(pathMovement.currentSpeed).toBe(1)
  })

  test('when the first order has factor 2, return the base speed multiplied by 2', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [2, 1, 1])

    expect(pathMovement.currentSpeed).toBe(2)
  })

  test('when a normal order is completed and the next order has factor 2, return the speed multiplied by 2', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [1, 2, 1])

    updateTimes(pathMovement, TILE_SIZE)

    expect(pathMovement.currentSpeed).toBe(2)
  })

  test('when the ice order is completed, return the base speed again', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [1, 2, 1])

    updateTimes(pathMovement, TILE_SIZE + TILE_SIZE / 2)

    expect(pathMovement.currentSpeed).toBe(1)
  })

  test('when there are less factors than orders, the orders without factor use the base speed', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [1])

    updateTimes(pathMovement, TILE_SIZE)

    expect(pathMovement.currentSpeed).toBe(1)
  })
})

describe('update with speed factors', () => {
  test('an ice order needs half of the updates than a normal order', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [2, 1, 1])

    updateTimes(pathMovement, TILE_SIZE / 2)

    expect(pathMovement.indexOrder).toBe(1)
  })

  test('an ice order moves the enemy a whole tile', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [2, 1, 1])

    updateTimes(pathMovement, TILE_SIZE / 2)

    expect(pathMovement.position).toStrictEqual({
      x: startPosition.x - TILE_SIZE,
      y: startPosition.y,
    })
  })

  test('a boss on an ice order moves at the normal velocity', () => {
    const pathMovement = new PathMovement(
      startPosition,
      orders,
      ENEMY_VELOCITY.BOSS,
      [2, 1, 1],
    )

    updateTimes(pathMovement, TILE_SIZE)

    expect(pathMovement.indexOrder).toBe(1)
  })

  test('after an ice order the next normal order needs the usual number of updates', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [2, 1, 1])

    updateTimes(pathMovement, TILE_SIZE / 2 + TILE_SIZE - 1)

    expect(pathMovement.indexOrder).toBe(1)
  })

  test('the speed factors are used again after reInit', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1, [1, 2, 1])
    updateTimes(pathMovement, TILE_SIZE)

    pathMovement.reInit()

    expect(pathMovement.currentSpeed).toBe(1)
  })
})
