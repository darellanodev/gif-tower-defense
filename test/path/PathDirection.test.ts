import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import {
  getNextDirection,
  WalkableNeighbours,
} from '../../src/levels/path/PathDirection'

const noneWalkable: WalkableNeighbours = {
  left: false,
  right: false,
  up: false,
  down: false,
}

const walkable = (
  neighbours: Partial<WalkableNeighbours>,
): WalkableNeighbours => ({ ...noneWalkable, ...neighbours })

describe('keep going straight', () => {
  test.each([
    [DIRECTION.LEFT, { left: true }],
    [DIRECTION.RIGHT, { right: true }],
    [DIRECTION.UP, { up: true }],
    [DIRECTION.DOWN, { down: true }],
  ])(
    'when the tile ahead in direction %i is walkable, keep the direction',
    (direction, neighbours) => {
      const result = getNextDirection(direction, walkable(neighbours))

      expect(result).toBe(direction)
    },
  )

  test('when the tile ahead is walkable, it is chosen even if other tiles with more priority are walkable', () => {
    const neighbours = walkable({
      left: true,
      right: true,
      up: true,
      down: true,
    })

    const result = getNextDirection(DIRECTION.DOWN, neighbours)

    expect(result).toBe(DIRECTION.DOWN)
  })
})

describe('turn when the tile ahead is not walkable', () => {
  test('moving down, when left and right are walkable, choose left', () => {
    const neighbours = walkable({ left: true, right: true })

    const result = getNextDirection(DIRECTION.DOWN, neighbours)

    expect(result).toBe(DIRECTION.LEFT)
  })

  test('moving left, when up and down are walkable, choose up', () => {
    const neighbours = walkable({ up: true, down: true })

    const result = getNextDirection(DIRECTION.LEFT, neighbours)

    expect(result).toBe(DIRECTION.UP)
  })

  test('moving right, when up and down are walkable, choose up', () => {
    const neighbours = walkable({ up: true, down: true })

    const result = getNextDirection(DIRECTION.RIGHT, neighbours)

    expect(result).toBe(DIRECTION.UP)
  })

  test('moving up, when left and right are walkable, choose left', () => {
    const neighbours = walkable({ left: true, right: true })

    const result = getNextDirection(DIRECTION.UP, neighbours)

    expect(result).toBe(DIRECTION.LEFT)
  })

  test('moving down, when only right is walkable, choose right', () => {
    const result = getNextDirection(DIRECTION.DOWN, walkable({ right: true }))

    expect(result).toBe(DIRECTION.RIGHT)
  })

  test('moving up, when only down is walkable (the way back), do not go back', () => {
    const result = getNextDirection(DIRECTION.UP, walkable({ down: true }))

    expect(result).toBeNull()
  })

  test.each([
    [DIRECTION.LEFT, { right: true }],
    [DIRECTION.RIGHT, { left: true }],
    [DIRECTION.UP, { down: true }],
    [DIRECTION.DOWN, { up: true }],
  ])(
    'in a dead end moving in direction %i, there is no next direction',
    (direction, onlyTheWayBack) => {
      const result = getNextDirection(direction, walkable(onlyTheWayBack))

      expect(result).toBeNull()
    },
  )

  test('when there are no walkable neighbours, there is no next direction', () => {
    const result = getNextDirection(DIRECTION.LEFT, noneWalkable)

    expect(result).toBeNull()
  })
})

describe('after a dead end (there is no current direction)', () => {
  test('the way back can be chosen', () => {
    const result = getNextDirection(null, walkable({ right: true }))

    expect(result).toBe(DIRECTION.RIGHT)
  })

  test.each([
    [{ left: true, right: true, up: true, down: true }, DIRECTION.LEFT],
    [{ right: true, up: true, down: true }, DIRECTION.RIGHT],
    [{ up: true, down: true }, DIRECTION.UP],
    [{ down: true }, DIRECTION.DOWN],
  ])('the priority is left, right, up, down: %j', (neighbours, expected) => {
    const result = getNextDirection(null, walkable(neighbours))

    expect(result).toBe(expected)
  })

  test('when there are no walkable neighbours, there is no next direction', () => {
    const result = getNextDirection(null, noneWalkable)

    expect(result).toBeNull()
  })
})
