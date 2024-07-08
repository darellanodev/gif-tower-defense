import { Const } from '../../src/constants/Const'
import { MagicFireball } from '../../src/magics/MagicFireball'
import { MagicFireballCreator } from '../../src/magics/MagicFireballCreator'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { img } from './imagesResources'

export const createMagicFireball = (
  orders: number[],
  magicFireballInstancesManager: MagicInstancesManager,
) => {
  const initialPosition = { x: 100, y: 200 }

  MagicFireballCreator.clearInstance()
  const magicFireballCreator = MagicFireballCreator.getInstance(
    magicFireballInstancesManager,
    img,
    initialPosition,
    orders,
    MagicFireball.SPEED,
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
