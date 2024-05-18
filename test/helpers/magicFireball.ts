import { Const } from '../../src/constants/Const'
import { Magic } from '../../src/magics/Magic'
import { MagicFireball } from '../../src/magics/MagicFireball'

export const clearMagicFireballInstances = () => {
  MagicFireball.instances = []
}

export const instantiateMagicFireball = (orders: number[]) => {
  const image: any = null
  const initialPosition = { x: 100, y: 200 }

  MagicFireball.instantiate(image, initialPosition, orders)
}

export const updateToReachTheEndOfTheMap = (orders: number[]) => {
  const maxIterations = (Const.TILE_SIZE / Magic.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    MagicFireball.updateInstances()
  }
}
