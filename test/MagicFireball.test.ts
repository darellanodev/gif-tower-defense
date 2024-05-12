import { Const } from '../src/constants/Const'
import { Magic } from '../src/magics/Magic'
import { MagicFireball } from '../src/magics/MagicFireball'
import { getPathFromMap } from './helpers/map'

const clearMagicFireballInstances = () => {
  MagicFireball.instances = []
}

const instantiateMagicFireball = (orders: number[]) => {
  const image: any = null
  const initialPosition = { x: 100, y: 200 }

  MagicFireball.instantiate(image, initialPosition, orders)
}

const updateToReachTheEndOfTheMap = (orders: number[]) => {
  const maxIterations = (Const.TILE_SIZE / Magic.SPEED) * (orders.length + 1)
  for (let i = 0; i < maxIterations; i++) {
    MagicFireball.updateInstances()
  }
}

test('position, when the magicfireball is recently created and update instances, new positions is different', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)

  const initialPosition = { ...MagicFireball.instances[0].position }

  MagicFireball.updateInstances()

  const newPosition = { ...MagicFireball.instances[0].position }

  expect(newPosition).not.toBe(initialPosition)
})

test('isAlive, when the magicfireball is recently created, return true', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)

  const result = MagicFireball.instances[0].isAlive
  expect(result).toBeTruthy()
})

test('reachEnd, when the magicfireball is recently created, return false', () => {
  const path = getPathFromMap()
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)
  updateToReachTheEndOfTheMap(orders)

  const result = MagicFireball.instances[0].isAlive()
  expect(result).toBeFalsy()
})
