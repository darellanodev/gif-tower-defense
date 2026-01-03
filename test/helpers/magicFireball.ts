import { MAGIC_SPEED } from '../../src/constants/magics'
import { TILE_SIZE } from '../../src/constants/TILE'
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
    MAGIC_SPEED.FIREBALL,
  )
  magicFireballCreator.create()
}

export const updateToReachTheEndOfTheMap = (
  orders: number[],
  magicFireballInstancesManager: MagicInstancesManager,
) => {
  const maxIterations = (TILE_SIZE / MAGIC_SPEED.FIREBALL) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    magicFireballInstancesManager.updateInstances()
  }
}
