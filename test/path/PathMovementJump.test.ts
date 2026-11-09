import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_JUMP_SPEED, ENEMY_VELOCITY } from '../../src/constants/enemy'
import { TILE_SIZE } from '../../src/constants/tile'
import { PathMovement } from '../../src/levels/path/PathMovement'
import { JumpStep } from '../../src/types/jumpStep'

const startPosition = { x: 400, y: 100 }
const { RIGHT } = DIRECTION

// walk one tile, jump two tiles, walk one tile
const orders = [RIGHT, RIGHT, RIGHT, RIGHT]
const speedFactors = [1, 1, 1, 1]
const jumps: (JumpStep | null)[] = [
  null,
  { step: 0, length: 2 },
  { step: 1, length: 2 },
  null,
]

const createMovement = (baseSpeed: number = ENEMY_VELOCITY.NORMAL) =>
  new PathMovement(startPosition, orders, baseSpeed, speedFactors, jumps)

const updateTimes = (pathMovement: PathMovement, times: number) => {
  for (let i = 0; i < times; i++) {
    pathMovement.update()
  }
}

const updatesToWalkOneTile = (speed: number) => TILE_SIZE / speed

describe('isJumping', () => {
  test('when the current order is not a jump, it is not jumping', () => {
    expect(createMovement().isJumping).toBeFalsy()
  })

  test('when the order of the first tile is completed, it starts jumping', () => {
    const pathMovement = createMovement()

    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))

    expect(pathMovement.isJumping).toBeTruthy()
  })

  test('when the whole jump is completed, it is not jumping anymore', () => {
    const pathMovement = createMovement()

    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))
    updateTimes(pathMovement, 2 * updatesToWalkOneTile(ENEMY_JUMP_SPEED))

    expect(pathMovement.isJumping).toBeFalsy()
  })

  test('when there is no jump information, it is never jumping', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1)
    updateTimes(pathMovement, 200)

    expect(pathMovement.isJumping).toBeFalsy()
  })
})

describe('currentSpeed while jumping', () => {
  const startJump = (pathMovement: PathMovement, baseSpeed: number) =>
    updateTimes(pathMovement, updatesToWalkOneTile(baseSpeed))

  test('a normal enemy jumps at the jump speed', () => {
    const pathMovement = createMovement(ENEMY_VELOCITY.NORMAL)
    startJump(pathMovement, ENEMY_VELOCITY.NORMAL)

    expect(pathMovement.currentSpeed).toBe(ENEMY_JUMP_SPEED)
  })

  test('a boss jumps at the same speed than a normal enemy', () => {
    const pathMovement = createMovement(ENEMY_VELOCITY.BOSS)
    startJump(pathMovement, ENEMY_VELOCITY.BOSS)

    expect(pathMovement.currentSpeed).toBe(ENEMY_JUMP_SPEED)
  })

  test('after the jump the base speed is used again', () => {
    const pathMovement = createMovement(ENEMY_VELOCITY.NORMAL)
    startJump(pathMovement, ENEMY_VELOCITY.NORMAL)
    updateTimes(pathMovement, 2 * updatesToWalkOneTile(ENEMY_JUMP_SPEED))

    expect(pathMovement.currentSpeed).toBe(ENEMY_VELOCITY.NORMAL)
  })

  test('a jump order is faster than a walking order', () => {
    expect(ENEMY_JUMP_SPEED).toBeGreaterThan(ENEMY_VELOCITY.NORMAL)
  })

  test('the jump speed divides the tile size, so every order ends exactly in a tile', () => {
    expect(TILE_SIZE % ENEMY_JUMP_SPEED).toBe(0)
  })
})

describe('position', () => {
  test('a jump of two tiles moves the enemy two tiles in the direction of the orders', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))
    const beforeJump = { ...pathMovement.position }

    updateTimes(pathMovement, 2 * updatesToWalkOneTile(ENEMY_JUMP_SPEED))

    expect(pathMovement.position.x - beforeJump.x).toBe(2 * TILE_SIZE)
  })

  test('the jump takes less updates than walking the same tiles', () => {
    const jumpUpdates = 2 * updatesToWalkOneTile(ENEMY_JUMP_SPEED)
    const walkUpdates = 2 * updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL)

    expect(jumpUpdates).toBeLessThan(walkUpdates)
  })
})

describe('jumpProgress', () => {
  test('when it is not jumping, the progress is null', () => {
    expect(createMovement().jumpProgress).toBeNull()
  })

  test('at the beginning of the jump, the progress is 0', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))

    expect(pathMovement.jumpProgress).toBe(0)
  })

  test('in the middle of the jump, the progress is 0.5', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))

    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_JUMP_SPEED))

    expect(pathMovement.jumpProgress).toBe(0.5)
  })

  test('after 5 updates of a jump of two tiles, the progress is 0.1', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))

    // 5 updates at the jump speed are 10 pixels of the 100 pixels of the jump
    updateTimes(pathMovement, 5)

    expect(pathMovement.jumpProgress).toBe(0.1)
  })

  test('the jump distance is the length of the jump', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))

    expect(pathMovement.jumpDistance).toBe(2)
  })

  test('when it is not jumping, the jump distance is 0', () => {
    expect(createMovement().jumpDistance).toBe(0)
  })
})

describe('reInit', () => {
  test('after reInit the enemy is not jumping and starts again', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToWalkOneTile(ENEMY_VELOCITY.NORMAL))

    pathMovement.reInit()

    expect(pathMovement.isJumping).toBeFalsy()
  })
})
