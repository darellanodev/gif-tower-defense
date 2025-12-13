import { describe, expect } from 'vitest'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { createBossEnemy, createNormalEnemy } from '../helpers/enemyCreator'

test('alive, when the instance is recently created, return true', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager)

  const result = enemyInstancesManager.getAll()[0].isAlive
  expect(result).toBeTruthy()
})
test('dead, when the instance is recently created, return false', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager)

  const result = enemyInstancesManager.getAll()[0].isDead
  expect(result).toBeFalsy()
})
test('id, when the instance is recently created, return 1 for the id of the first enemy', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager)

  const result = enemyInstancesManager.getAll()[0].id
  expect(result).toBe(1)
})
test('position, when the instance is recently created, return the same as the initial position', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager)

  const result = enemyInstancesManager.getAll()[0].position
  expect(result).toStrictEqual({ x: 100, y: 200 })
})
test('winner, when the instance is recently created, return false', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager)

  const result = enemyInstancesManager.getAll()[0].isWinner
  expect(result).toBeFalsy()
})

describe('isBoss', () => {
  test('when the instance is a boss enemy, return true', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createBossEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll()[0].isBoss
    expect(result).toBeTruthy()
  })
  test('when the instance is a normal enemy, return false', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createNormalEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll()[0].isBoss
    expect(result).toBeFalsy()
  })
})

describe('maxHealth', () => {
  test('when is a Boss enemy, return wave * 25', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createBossEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll()[0].maxHealth

    const wave = 1
    const expected = wave * 25
    expect(result).toBe(expected)
  })
  test('when is a normal enemy, return wave (1) * 3 + waveEnemies (3) * 2', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createNormalEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll()[0].maxHealth

    const wave = 1 // default value in createNormalEnemy helper function
    const waveEnemies = 3 // default value in createNormalEnemy helper function

    const expected = wave * 3 + waveEnemies * 2
    expect(result).toBe(expected)
  })
})
