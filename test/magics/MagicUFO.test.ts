import { EnemyCreator } from '../../src/enemies/EnemyCreator'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicUFO } from '../../src/magics/MagicUFO'
import { MagicUFOCreator } from '../../src/magics/MagicUFOCreator'
import { MagicUFOInstancesManager } from '../../src/magics/MagicUFOInstancesManager'
import { createNormalEnemy } from '../helpers/enemyCreator'
import { images } from '../helpers/imagesResources'
import {
  getPathFromMap,
  getValidLevelMap,
  testTinyOrders,
} from '../helpers/levelMap'
import {
  createMagicUFO,
  getEnemyTargetIdForUFO,
  updateInstancesOfEnemiesAndUFOsForATileSize,
} from '../helpers/magicUFO'

test('id, when three Magic UFOs are created, last UFO has id = 3', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicUFOInstancesManager = new MagicUFOInstancesManager(
    enemyInstancesManager,
  )
  const initialEnemiesPosition = { x: 100, y: 200 }
  const magicUFOCreator = new MagicUFOCreator(
    images,
    initialEnemiesPosition,
    testTinyOrders,
    enemyInstancesManager,
    magicUFOInstancesManager,
  )

  magicUFOCreator.createMagicUFO()
  magicUFOCreator.createMagicUFO()
  magicUFOCreator.createMagicUFO()
  const result = magicUFOInstancesManager.getAll()[2].id

  const idUFO = 3
  expect(result).toBe(idUFO)
})

test('enemyTarget id, when an Enemy is created and then a magic UFO is created, MagicUFO targets the enemy', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicUFOInstancesManager = new MagicUFOInstancesManager(
    enemyInstancesManager,
  )

  createMagicUFO(enemyInstancesManager, magicUFOInstancesManager)
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
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicUFOInstancesManager = new MagicUFOInstancesManager(
    enemyInstancesManager,
  )
  createNormalEnemy(enemyInstancesManager, testTinyOrders)
  createNormalEnemy(enemyInstancesManager, testTinyOrders)

  createMagicUFO(enemyInstancesManager, magicUFOInstancesManager)
  updateInstancesOfEnemiesAndUFOsForATileSize(
    enemyInstancesManager,
    magicUFOInstancesManager,
  )

  createMagicUFO(enemyInstancesManager, magicUFOInstancesManager)
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
