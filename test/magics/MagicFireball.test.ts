import { expect } from 'vitest'
import { TILE_SIZE } from '../../src/constants/TILE'
import { ConstTest } from '../../src/constants/constTest'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { createNormalEnemy } from '../helpers/enemyCreator'
import { testTinyOrders } from '../helpers/levelMap'

import {
  createMagicFireball,
  updateToReachTheEndOfTheMap,
} from '../helpers/magicFireball'
import { getOrdersFromValidMap } from '../helpers/orders'

test('position, when the magicfireball is recently created and update instances, new positions is different', () => {
  const orders = getOrdersFromValidMap()

  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  createMagicFireball(orders, magicFireballInstancesManager)

  const initialPosition = {
    ...magicFireballInstancesManager.getAll()[0].position,
  }
  magicFireballInstancesManager.updateInstances()
  const newPosition = { ...magicFireballInstancesManager.getAll()[0].position }

  expect(newPosition).not.toBe(initialPosition)
})

test('isAlive, when the magicfireball is recently created, return true', () => {
  const orders = getOrdersFromValidMap()

  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  createMagicFireball(orders, magicFireballInstancesManager)

  const result = magicFireballInstancesManager.getAll()[0].isAlive

  expect(result).toBeTruthy()
})

test('reachEnd, when the magicfireball is recently created, return false', () => {
  const orders = getOrdersFromValidMap()

  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  createMagicFireball(orders, magicFireballInstancesManager)

  updateToReachTheEndOfTheMap(orders, magicFireballInstancesManager)

  const result = magicFireballInstancesManager.getAll()[0].isAlive

  expect(result).toBeFalsy()
})

test('damage of enemy, when enemy is enough strong and collides with a fireball, damage is not total (it is more than 0 but less than 100)', () => {
  // turn off explosions
  ConstTest.DISABLE_EXPLOSION_FOR_UNIT_TESTING = true

  // make an enemy instance
  const wave = 2 // to set an stronger enemy
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager, testTinyOrders, wave)

  // make a magic fireball instance
  const orders = getOrdersFromValidMap()
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  createMagicFireball(orders, magicFireballInstancesManager)

  // update
  const timesToUpdate = TILE_SIZE * 100
  for (let i = 0; i < timesToUpdate; i++) {
    enemyInstancesManager.updateInstances()
    magicFireballInstancesManager.updateInstances()
  }

  // restore allow explosions
  ConstTest.DISABLE_EXPLOSION_FOR_UNIT_TESTING = false
  const result =
    enemyInstancesManager.getAll()[0].damage > 0 &&
    enemyInstancesManager.getAll()[0].damage < 100

  expect(result).toBeTruthy()
})
