import { Enemy } from '../../src/enemies/Enemy'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import { MagicIceballCreator } from '../../src/magics/MagicIceballCreator'
import { MagicIceballInstancesManager } from '../../src/magics/MagicIceballInstancesManager'
import { PathMovement } from '../../src/path/PathMovement'
import { img } from './imagesResources'

export const createMagicIceball = (
  orders: number[],
  magicIceballInstancesManager: MagicIceballInstancesManager,
) => {
  const magicCollisionChecker = new MagicCollisionChecker()

  // create pathMovement
  const initialEnemiesPosition = { x: 100, y: 200 }
  const pathMovement = new PathMovement(
    initialEnemiesPosition,
    orders,
    Enemy.VELOCITY,
  )

  const magicIceballCreator = new MagicIceballCreator(
    magicIceballInstancesManager,
    img,
    pathMovement,
    magicCollisionChecker,
  )

  magicIceballCreator.create()
}
