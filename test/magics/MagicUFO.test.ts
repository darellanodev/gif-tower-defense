import { MagicUFO } from '../../src/magics/MagicUFO'
import { clearEnemyInstances, instantiateNormalEnemy } from '../helpers/enemy'
import {
  clearMagicUFOInstances,
  getEnemyTargetIdForUFO,
  instantiateMagicUFO,
  updateInstancesOfEnemiesAndUFOsForATileSize,
} from '../helpers/magicUfo'

test('id, when three Magic UFOs are created, last UFO has id = 3', () => {
  clearMagicUFOInstances()

  instantiateMagicUFO()
  instantiateMagicUFO()
  instantiateMagicUFO()
  const result = MagicUFO.instances[2].id

  const idUFO = 3
  expect(result).toBe(idUFO)
})

test('enemyTarget id, when an Enemy is created and then a magic UFO is created, MagicUFO targets the enemy', () => {
  clearEnemyInstances()
  clearMagicUFOInstances()

  instantiateNormalEnemy()
  instantiateMagicUFO()
  updateInstancesOfEnemiesAndUFOsForATileSize()

  const instancePositionUFO = 0
  const result = getEnemyTargetIdForUFO(instancePositionUFO)

  const enemyId = 1
  expect(result).toBe(enemyId)
})

test('enemyTarget, when a first Enemy and a first UFO are instantiated the first MagicUFO targets the first enemy and then when we instantiate a second enemy and a second UFO, the second UFO returns the second enemy as target', () => {
  clearEnemyInstances()
  clearMagicUFOInstances()

  instantiateNormalEnemy()
  instantiateMagicUFO()
  updateInstancesOfEnemiesAndUFOsForATileSize()

  instantiateNormalEnemy()
  instantiateMagicUFO()
  updateInstancesOfEnemiesAndUFOsForATileSize()

  const instancePositionUFO = 1
  const result = getEnemyTargetIdForUFO(instancePositionUFO)

  const enemyId = 2
  expect(result).toEqual(enemyId)
})
