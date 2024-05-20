import { Enemy } from '../../src/enemies/Enemy'
import { EnemyInstances } from '../../src/enemies/EnemyInstances'
import {
  instantiateNormalEnemy,
  instantiateBossEnemy,
  clearEnemyInstances,
} from '../helpers/enemy'

test('alive, when the instance is recently created, return true', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = EnemyInstances.instances[0].alive
  expect(result).toBeTruthy()
})
test('dead, when the instance is recently created, return false', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = EnemyInstances.instances[0].dead
  expect(result).toBeFalsy()
})
test('id, when the instance is recently created and last id=0 (Enemy.numberOfEnemies = 0), return 1', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = EnemyInstances.instances[0].id
  expect(result).toBe(1)
})
test('position, when the instance is recently created, return the same as the initial position', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = EnemyInstances.instances[0].position
  expect(result).toStrictEqual({ x: 100, y: 200 })
})
test('winner, when the instance is recently created, return false', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = EnemyInstances.instances[0].winner
  expect(result).toBeFalsy()
})

describe('EnemyInstances.instances.length', () => {
  test('when there are not enemy instances and the instance is recently created and is a boss enemy, return 1', () => {
    clearEnemyInstances()
    instantiateBossEnemy()
    const result = EnemyInstances.instances.length
    expect(result).toBe(1)
  })
  test('when there are not enemy instances and the instance is recently created and is a normal enemy, return 1', () => {
    clearEnemyInstances()
    instantiateNormalEnemy()
    const result = EnemyInstances.instances.length
    expect(result).toBe(1)
  })
})

describe('isBoss', () => {
  test('when the instance is a boss enemy, return true', () => {
    clearEnemyInstances()
    instantiateBossEnemy()
    const result = EnemyInstances.instances[0].isBoss()
    expect(result).toBeTruthy()
  })
  test('when the instance is a normal enemy, return false', () => {
    clearEnemyInstances()
    instantiateNormalEnemy()
    const result = EnemyInstances.instances[0].isBoss()
    expect(result).toBeFalsy()
  })
})

describe('endurance', () => {
  test('when is a Boss enemy, return wave * 25', () => {
    const wave = 1
    clearEnemyInstances()
    instantiateBossEnemy()

    const result = EnemyInstances.instances[0].endurance

    const expected = wave * 25
    expect(result).toBe(expected)
  })
  test('when is a normal enemy, return wave * 3 + waveEnemies * 2', () => {
    const wave = 1
    clearEnemyInstances()
    instantiateNormalEnemy()

    const result = EnemyInstances.instances[0].endurance

    const expected = wave * 3 + (EnemyInstances.waveEnemies - 1) * 2 // it is (Enemy.waveEnemies - 1) because when an enemy is created Enemy.waveEnemies increments by 1
    expect(result).toBe(expected)
  })
})
