import { MagicFireball } from '../src/magics/MagicFireball'
import { getPathFromMap, getValidLevelMap } from './helpers/levelMap'
import {
  clearMagicFireballInstances,
  instantiateMagicFireball,
  updateToReachTheEndOfTheMap,
} from './helpers/magicFireball'

test('position, when the magicfireball is recently created and update instances, new positions is different', () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)

  const initialPosition = { ...MagicFireball.instances[0].position }
  MagicFireball.updateInstances()
  const newPosition = { ...MagicFireball.instances[0].position }

  expect(newPosition).not.toBe(initialPosition)
})

test('isAlive, when the magicfireball is recently created, return true', () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)

  const result = MagicFireball.instances[0].isAlive

  expect(result).toBeTruthy()
})

test('reachEnd, when the magicfireball is recently created, return false', () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)
  updateToReachTheEndOfTheMap(orders)

  const result = MagicFireball.instances[0].isAlive()

  expect(result).toBeFalsy()
})
