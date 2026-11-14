import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_VELOCITY } from '../../src/constants/enemy'
import { TILE_SIZE } from '../../src/constants/tile'
import { Enemy } from '../../src/enemies/Enemy'
import { EnemyAnimator } from '../../src/enemies/EnemyEyesAnimator'
import { PathMovement } from '../../src/levels/path/PathMovement'
import { TeleportDuration } from '../../src/levels/path/Teleport'
import { TeleportStep } from '../../src/types/teleportStep'
import { images } from './imagesResources'

const { RIGHT } = DIRECTION

export const teleportTarget = { x: 1000, y: 500 }
export const teleportDuration: TeleportDuration = { OUT: 10, IN: 4 }

// the enemy walks one tile and then it is teleported before the second order
export const updatesToArriveAtTheTeleport = TILE_SIZE / ENEMY_VELOCITY.NORMAL

export const createTeleportingEnemy = (
  teleports: (TeleportStep | null)[] = [null, { to: teleportTarget }, null],
  position = { x: 20, y: 20 },
) => {
  const pathMovement = new PathMovement(
    position,
    [RIGHT, RIGHT, RIGHT],
    ENEMY_VELOCITY.NORMAL,
    [],
    [],
    teleports,
    teleportDuration,
  )
  return new Enemy(
    position,
    10,
    false,
    1,
    new EnemyAnimator(images),
    pathMovement,
  )
}

export const updateEnemyTimes = (enemy: Enemy, times: number) => {
  for (let i = 0; i < times; i++) {
    enemy.update()
  }
}
