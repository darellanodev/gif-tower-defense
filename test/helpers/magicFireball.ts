import { Const } from '../../src/constants/Const'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import { MagicFireball } from '../../src/magics/MagicFireball'
import { MagicFireballCreator } from '../../src/magics/MagicFireballCreator'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { PathMovement } from '../../src/path/PathMovement'
import { img } from './imagesResources'

export const createMagicFireball = (
  orders: number[],
  magicFireballInstancesManager: MagicInstancesManager,
) => {
  const initialPosition = { x: 100, y: 200 }

  const pathMovement = new PathMovement(
    initialPosition,
    orders,
    MagicFireball.SPEED,
  )

  const magicCollisionChecker = new MagicCollisionChecker()

  const magicFireballCreator = new MagicFireballCreator(
    magicFireballInstancesManager,
    img,
    pathMovement,
    magicCollisionChecker,
  )
  magicFireballCreator.create()
}

export const updateToReachTheEndOfTheMap = (
  orders: number[],
  magicFireballInstancesManager: MagicInstancesManager,
) => {
  const maxIterations =
    (Const.TILE_SIZE / MagicFireball.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    magicFireballInstancesManager.updateInstances()
  }
}
