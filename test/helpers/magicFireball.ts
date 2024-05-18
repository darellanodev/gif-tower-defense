import { Const } from '../../src/constants/Const'
import { Magic } from '../../src/magics/Magic'
import { MagicFireball } from '../../src/magics/MagicFireball'
import { img } from './imagesResources'

export const clearMagicFireballInstances = () => {
  MagicFireball.instances = []
}

export const instantiateMagicFireball = (orders: number[]) => {
  const initialPosition = { x: 100, y: 200 }

  MagicFireball.instantiate(img, initialPosition, orders)
}

export const updateToReachTheEndOfTheMap = (orders: number[]) => {
  const maxIterations = (Const.TILE_SIZE / Magic.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    MagicFireball.updateInstances()
  }
}
