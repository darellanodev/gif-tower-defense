import { expect } from 'vitest'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicUFOCreator } from '../../src/magics/creators/MagicUFOCreator'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { createNormalEnemy } from '../helpers/enemyCreator'
import { images } from '../helpers/imagesResources'
import { testTinyOrders } from '../helpers/levelMap'
import {
  getEnemyTargetIdForUFO,
  updateInstancesOfEnemiesAndUFOsForATileSize,
} from '../helpers/magicUFO'

let magicUFOCreator: MagicUFOCreator
let magicUFOInstancesManager: MagicInstancesManager

test('id, when three Magic UFOs are created, last UFO has id = 3', () => {
  MagicUFOCreator.clearInstance()
  const enemyInstancesManager = new EnemyInstancesManager()
  magicUFOInstancesManager = new MagicInstancesManager(enemyInstancesManager)
  const initialEnemiesPosition = { x: 100, y: 200 }
  magicUFOCreator = MagicUFOCreator.getInstance(
    images,
    initialEnemiesPosition,
    magicUFOInstancesManager,
  )
  magicUFOCreator.create()
  magicUFOCreator.create()
  magicUFOCreator.create()

  let result: number | null = null
  const instance = magicUFOInstancesManager.getAll()[2]
  if ('id' in instance) {
    result = instance.id
  }

  const idUFO = 3
  expect(result).toBe(idUFO)
})

test('enemyTarget id, when an Enemy is created and then a magic UFO is created, MagicUFO targets the enemy', () => {
  MagicUFOCreator.clearInstance()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicUFOInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  const initialEnemiesPosition = { x: 100, y: 200 }
  magicUFOCreator = MagicUFOCreator.getInstance(
    images,
    initialEnemiesPosition,
    magicUFOInstancesManager,
  )
  magicUFOCreator.create()
  createNormalEnemy(enemyInstancesManager)

  updateInstancesOfEnemiesAndUFOsForATileSize(
    enemyInstancesManager,
    magicUFOInstancesManager,
  )

  const instancePositionUFO = 0
  const result = getEnemyTargetIdForUFO(
    instancePositionUFO,
    magicUFOInstancesManager,
  )

  const enemyId = 1
  expect(result).toBe(enemyId)
})

test('enemyTarget, when a first Enemy and a first UFO are instantiated the first MagicUFO targets the first enemy and then when we instantiate a second enemy and a second UFO, the second UFO returns the second enemy as target', () => {
  MagicUFOCreator.clearInstance()
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicUFOInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )
  const initialEnemiesPosition = { x: 100, y: 200 }
  magicUFOCreator = MagicUFOCreator.getInstance(
    images,
    initialEnemiesPosition,
    magicUFOInstancesManager,
  )
  createNormalEnemy(enemyInstancesManager, testTinyOrders)
  createNormalEnemy(enemyInstancesManager, testTinyOrders)

  magicUFOCreator.create()
  updateInstancesOfEnemiesAndUFOsForATileSize(
    enemyInstancesManager,
    magicUFOInstancesManager,
  )

  magicUFOCreator.create()
  updateInstancesOfEnemiesAndUFOsForATileSize(
    enemyInstancesManager,
    magicUFOInstancesManager,
  )

  const instancePositionUFO = 1
  const result = getEnemyTargetIdForUFO(
    instancePositionUFO,
    magicUFOInstancesManager,
  )

  const enemyId = 2
  expect(result).toEqual(enemyId)
})
