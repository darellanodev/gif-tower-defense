import { ENEMY_VELOCITY } from '../../src/constants/enemy'
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
    ENEMY_VELOCITY.NORMAL,
  )

  magicIceballCreator.create()
}
