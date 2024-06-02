import { Const } from '../../src/constants/Const'
import { ConstTest } from '../../src/constants/ConstTest'
import { Enemy } from '../../src/enemies/Enemy'
import { MagicFireball } from '../../src/magics/MagicFireball'
import { clearEnemyInstances, instantiateNormalEnemy } from '../helpers/enemy'
import { getPathFromMap, getValidLevelMap } from '../helpers/levelMap'

import {
  clearMagicFireballInstances,
  instantiateMagicFireball,
  updateToReachTheEndOfTheMap,
} from '../helpers/magicFireball'

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

test('damage of enemy, when enemy is enought strong and collides with a fireball, damage is not total (it is more than 0 but less than 100)', () => {
  // turn off explosions
  ConstTest.DISABLE_EXPLOSION_FOR_UNIT_TESTING = true

  // make an enemy instance
  const wave = 2 // to set an stronger enemy
  clearEnemyInstances()
  instantiateNormalEnemy(wave)

  // make a magic fireball instance
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  const orders = path.makeOrders()
  clearMagicFireballInstances()
  instantiateMagicFireball(orders)

  // update
  const timesToUpdate = Const.TILE_SIZE * 100
  for (let i = 0; i < timesToUpdate; i++) {
    Enemy.updateInstances()
    MagicFireball.updateInstances()
  }

  // restore allow explosions
  ConstTest.DISABLE_EXPLOSION_FOR_UNIT_TESTING = false

  const result =
    Enemy.instances[0].damage > 0 && Enemy.instances[0].damage < 100

  expect(result).toBeTruthy()
})
