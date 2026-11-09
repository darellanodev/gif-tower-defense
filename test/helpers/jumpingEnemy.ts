import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_VELOCITY } from '../../src/constants/enemy'
import { Enemy } from '../../src/enemies/Enemy'
import { EnemyAnimator } from '../../src/enemies/EnemyEyesAnimator'
import { PathMovement } from '../../src/levels/path/PathMovement'
import { JumpStep } from '../../src/types/jumpStep'
import { images } from './imagesResources'

const { RIGHT } = DIRECTION

// by default the enemy starts jumping two tiles
export const defaultJumps: (JumpStep | null)[] = [
  { step: 0, length: 2 },
  { step: 1, length: 2 },
  null,
]

export const createEnemy = (
  jumpSteps: (JumpStep | null)[] = defaultJumps,
  position = { x: 20, y: 20 },
) => {
  const pathMovement = new PathMovement(
    position,
    [RIGHT, RIGHT, RIGHT],
    ENEMY_VELOCITY.NORMAL,
    [1, 1, 1],
    jumpSteps,
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
