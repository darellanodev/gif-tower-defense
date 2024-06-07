import { Const } from '../../src/constants/Const'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import { MagicFireball } from '../../src/magics/MagicFireball'
import { PathMovement } from '../../src/path/PathMovement'
import { img } from './imagesResources'

export const clearMagicFireballInstances = () => {
  MagicFireball.instances = []
}

export const instantiateMagicFireball = (orders: number[]) => {
  const initialPosition = { x: 100, y: 200 }

  const pathMovement = new PathMovement(
    initialPosition,
    orders,
    MagicFireball.SPEED,
  )

  const magicCollisionChecker = new MagicCollisionChecker()

  MagicFireball.instantiate(img, pathMovement, magicCollisionChecker)
}

export const updateToReachTheEndOfTheMap = (orders: number[]) => {
  const enemyInstancesManager = new EnemyInstancesManager()
  const maxIterations =
    (Const.TILE_SIZE / MagicFireball.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    MagicFireball.updateInstances(enemyInstancesManager)
  }
}
