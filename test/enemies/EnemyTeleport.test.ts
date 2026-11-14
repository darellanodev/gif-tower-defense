import { describe, expect } from 'vitest'
import { ENEMY_TELEPORT } from '../../src/constants/enemy'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import {
  createTeleportingEnemy,
  teleportDuration,
  teleportTarget,
  updateEnemyTimes,
  updatesToArriveAtTheTeleport,
} from '../helpers/teleportingEnemy'

describe('isTeleporting', () => {
  test('when the enemy has not arrived at the teleport in tile, it is not teleporting', () => {
    expect(createTeleportingEnemy().isTeleporting).toBeFalsy()
  })

  test('when the enemy arrives at the teleport in tile, it is teleporting', () => {
    const enemy = createTeleportingEnemy()

    updateEnemyTimes(enemy, updatesToArriveAtTheTeleport)

    expect(enemy.isTeleporting).toBeTruthy()
  })

  test('when the teleport is over, it is not teleporting', () => {
    const enemy = createTeleportingEnemy()

    updateEnemyTimes(
      enemy,
      updatesToArriveAtTheTeleport + teleportDuration.OUT + teleportDuration.IN,
    )

    expect(enemy.isTeleporting).toBeFalsy()
  })

  test('when there are no teleports, the enemy is never teleporting', () => {
    const enemy = createTeleportingEnemy([])

    updateEnemyTimes(enemy, 300)

    expect(enemy.isTeleporting).toBeFalsy()
  })
})

describe('position', () => {
  test('after the first phase the enemy is in the teleport out tile', () => {
    const enemy = createTeleportingEnemy()

    updateEnemyTimes(enemy, updatesToArriveAtTheTeleport + teleportDuration.OUT)

    expect(enemy.position).toStrictEqual(teleportTarget)
  })
})

describe('the enemy is still while it teleports', () => {
  test('the enemy does not move in the first phase', () => {
    const enemy = createTeleportingEnemy()
    updateEnemyTimes(enemy, updatesToArriveAtTheTeleport)
    const position = { ...enemy.position }

    updateEnemyTimes(enemy, teleportDuration.OUT - 1)

    expect(enemy.position).toStrictEqual(position)
  })
})

describe('the magics and the enemies that teleport (legacy game)', () => {
  const checkCollision = (enemy: ReturnType<typeof createTeleportingEnemy>) =>
    new MagicCollisionChecker().shouldCollide(enemy, enemy.orderPosition)

  test('a magic collides with an enemy that is walking', () => {
    expect(checkCollision(createTeleportingEnemy())).toBeTruthy()
  })

  test('a magic does not collide with an enemy that is teleporting', () => {
    const enemy = createTeleportingEnemy()
    updateEnemyTimes(enemy, updatesToArriveAtTheTeleport)

    expect(checkCollision(enemy)).toBeFalsy()
  })

  test('a magic collides again with the enemy when the teleport is over', () => {
    const enemy = createTeleportingEnemy()
    updateEnemyTimes(
      enemy,
      updatesToArriveAtTheTeleport + teleportDuration.OUT + teleportDuration.IN,
    )

    expect(checkCollision(enemy)).toBeTruthy()
  })
})

describe('the real durations', () => {
  test('the enemy is out of the map for 200 updates and it appears for 100 more', () => {
    expect(ENEMY_TELEPORT.DURATION).toStrictEqual({ OUT: 200, IN: 100 })
  })
})
