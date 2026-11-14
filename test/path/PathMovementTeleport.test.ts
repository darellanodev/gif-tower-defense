import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_TELEPORT, ENEMY_VELOCITY } from '../../src/constants/enemy'
import { TILE_SIZE } from '../../src/constants/tile'
import { PathMovement } from '../../src/levels/path/PathMovement'
import {
  TELEPORT_PHASE,
  TeleportDuration,
} from '../../src/levels/path/Teleport'
import { TeleportStep } from '../../src/types/teleportStep'

const { RIGHT } = DIRECTION

const startPosition = { x: 100, y: 100 }
const target = { x: 1000, y: 500 }

// the enemy walks one tile (order 0), it arrives at the teleport in tile and it is teleported before the order 1
const orders = [RIGHT, RIGHT, RIGHT]
const teleports: (TeleportStep | null)[] = [null, { to: target }, null]
const duration: TeleportDuration = { OUT: 10, IN: 4 }

const createMovement = (teleportDuration = duration) =>
  new PathMovement(
    startPosition,
    orders,
    ENEMY_VELOCITY.NORMAL,
    [],
    [],
    teleports,
    teleportDuration,
  )

const updateTimes = (pathMovement: PathMovement, times: number) => {
  for (let i = 0; i < times; i++) {
    pathMovement.update()
  }
}

const updatesToArriveAtTheTeleport = TILE_SIZE / ENEMY_VELOCITY.NORMAL

describe('isTeleporting', () => {
  test('when the enemy has not arrived at the teleport in tile, it is not teleporting', () => {
    expect(createMovement().isTeleporting).toBeFalsy()
  })

  test('when the enemy arrives at the teleport in tile, it starts teleporting', () => {
    const pathMovement = createMovement()

    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    expect(pathMovement.isTeleporting).toBeTruthy()
  })

  test('the first phase is out', () => {
    const pathMovement = createMovement()

    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    expect(pathMovement.teleportPhase).toBe(TELEPORT_PHASE.OUT)
  })

  test('when there are no teleports, the enemy never teleports', () => {
    const pathMovement = new PathMovement(startPosition, orders, 1)

    updateTimes(pathMovement, 200)

    expect(pathMovement.isTeleporting).toBeFalsy()
  })
})

describe('the enemy waits in the teleport in tile', () => {
  test('the enemy does not move during the first phase', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)
    const waitingPosition = { ...pathMovement.position }

    updateTimes(pathMovement, duration.OUT - 1)

    expect(pathMovement.position).toStrictEqual(waitingPosition)
  })

  test('the order does not change during the teleport', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)
    const indexOrder = pathMovement.indexOrder

    updateTimes(pathMovement, duration.OUT + duration.IN - 1)

    expect(pathMovement.indexOrder).toBe(indexOrder)
  })

  test('when the first phase is over, the enemy is in the teleport out tile', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    updateTimes(pathMovement, duration.OUT)

    expect(pathMovement.position).toStrictEqual(target)
  })

  test('when the first phase is over, the second phase starts', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    updateTimes(pathMovement, duration.OUT)

    expect(pathMovement.teleportPhase).toBe(TELEPORT_PHASE.IN)
  })

  test('the enemy does not move during the second phase', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport + duration.OUT)

    updateTimes(pathMovement, duration.IN - 1)

    expect(pathMovement.position).toStrictEqual(target)
  })

  test('when the second phase is over, the enemy is not teleporting anymore', () => {
    const pathMovement = createMovement()

    updateTimes(
      pathMovement,
      updatesToArriveAtTheTeleport + duration.OUT + duration.IN,
    )

    expect(pathMovement.isTeleporting).toBeFalsy()
  })
})

describe('after the teleport', () => {
  const afterTeleport = () => {
    const pathMovement = createMovement()
    updateTimes(
      pathMovement,
      updatesToArriveAtTheTeleport + duration.OUT + duration.IN,
    )
    return pathMovement
  }

  test('the enemy continues from the teleport out tile with the next order', () => {
    const pathMovement = afterTeleport()

    pathMovement.update()

    expect(pathMovement.position).toStrictEqual({
      x: target.x + ENEMY_VELOCITY.NORMAL,
      y: target.y,
    })
  })

  test('the enemy keeps the direction of the orders', () => {
    expect(afterTeleport().currentDirection).toBe(RIGHT)
  })

  test('the enemy walks a whole tile before the next order', () => {
    const pathMovement = afterTeleport()

    updateTimes(pathMovement, TILE_SIZE / ENEMY_VELOCITY.NORMAL)

    expect(pathMovement.indexOrder).toBe(2)
  })
})

describe('the real durations', () => {
  test('the teleport takes the duration of the legacy game (doubled for 60 fps)', () => {
    const pathMovement = createMovement(ENEMY_TELEPORT.DURATION)
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    updateTimes(pathMovement, ENEMY_TELEPORT.DURATION.OUT - 1)
    const stillOut = pathMovement.teleportPhase
    pathMovement.update()

    expect([stillOut, pathMovement.teleportPhase]).toStrictEqual([
      TELEPORT_PHASE.OUT,
      TELEPORT_PHASE.IN,
    ])
  })
})

describe('instant teleport (the magics)', () => {
  const createInstant = () => createMovement(ENEMY_TELEPORT.INSTANT_DURATION)

  test('the position changes when the enemy arrives at the teleport in tile', () => {
    const pathMovement = createInstant()

    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    expect(pathMovement.position).toStrictEqual(target)
  })

  test('it never waits: it is not teleporting', () => {
    const pathMovement = createInstant()

    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    expect(pathMovement.isTeleporting).toBeFalsy()
  })

  test('it continues walking at once', () => {
    const pathMovement = createInstant()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    pathMovement.update()

    expect(pathMovement.position.x).toBe(target.x + ENEMY_VELOCITY.NORMAL)
  })
})

describe('teleportScale', () => {
  test('when it is not teleporting, the scale is 1', () => {
    expect(createMovement().teleportScale).toBe(1)
  })

  test('while it waits in the teleport in tile, it gets smaller', () => {
    const pathMovement = createMovement({ OUT: 100, IN: 100 })
    updateTimes(pathMovement, updatesToArriveAtTheTeleport)

    updateTimes(pathMovement, 20)

    expect(pathMovement.teleportScale).toBeLessThan(1)
  })
})

describe('reInit', () => {
  test('after reInit the enemy is not teleporting and starts again', () => {
    const pathMovement = createMovement()
    updateTimes(pathMovement, updatesToArriveAtTheTeleport + 3)

    pathMovement.reInit()

    expect(pathMovement.isTeleporting).toBeFalsy()
    expect(pathMovement.position).toStrictEqual(startPosition)
  })
})
