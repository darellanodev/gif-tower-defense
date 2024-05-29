import { Const } from '../../src/constants/Const'
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

  MagicFireball.instantiate(img, pathMovement)
}

export const updateToReachTheEndOfTheMap = (orders: number[]) => {
  const maxIterations =
    (Const.TILE_SIZE / MagicFireball.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    MagicFireball.updateInstances()
  }
}
