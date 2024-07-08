import { Enemy } from '../../src/enemies/Enemy'
import { MagicIceballCreator } from '../../src/magics/MagicIceballCreator'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { img } from './imagesResources'

export const createMagicIceball = (
  orders: number[],
  magicIceballInstancesManager: MagicInstancesManager,
) => {
  // create pathMovement
  const initialEnemiesPosition = { x: 100, y: 200 }

  const magicIceballCreator = new MagicIceballCreator(
    magicIceballInstancesManager,
    img,
    initialEnemiesPosition,
    orders,
    Enemy.VELOCITY,
  )

  magicIceballCreator.create()
}
