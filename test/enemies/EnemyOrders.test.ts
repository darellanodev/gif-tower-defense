import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import {
  createBossEnemy,
  createNormalEnemy,
  updateEnemyInstancesTimes,
} from '../helpers/enemyCreator'
import { testTinyOrders } from '../helpers/levelMap'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'

describe('currentDirection', () => {
  test('when no updates, return direction LEFT', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createNormalEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll()[0].currentDirection
    expect(result).toBe(DIRECTION.LEFT)
  })
  test('when updating 55 times a Boss enemy, return direction LEFT because velocity is 0.5 and it needs 100 updates to complete a 50 tile width order', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createBossEnemy(enemyInstancesManager, testTinyOrders)

    updateEnemyInstancesTimes(enemyInstancesManager, 55)
    const result = enemyInstancesManager.getAll()[0].currentDirection

    expect(result).toBe(DIRECTION.LEFT)
  })
  test('when updating 55 times a Normal enemy, return direction DOWN because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order and the next order is DOWN', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createNormalEnemy(enemyInstancesManager, testTinyOrders)

    updateEnemyInstancesTimes(enemyInstancesManager, 55)
    const result = enemyInstancesManager.getAll()[0].currentDirection

    expect(result).toBe(DIRECTION.DOWN)
  })
})

describe('position', () => {
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 50, y: 205 because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order then next order is DOWN and goes 5 DOWN', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createNormalEnemy(enemyInstancesManager, testTinyOrders)
    updateEnemyInstancesTimes(enemyInstancesManager, 55)

    const result = enemyInstancesManager.getAll()[0].position
    expect(result).toStrictEqual({ x: 50, y: 205 })
  })
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 72.5, y: 200 because velocity is 0.5 so every update it moves 0.5', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createBossEnemy(enemyInstancesManager, testTinyOrders)
    updateEnemyInstancesTimes(enemyInstancesManager, 55)

    const result = enemyInstancesManager.getAll()[0].position
    expect(result).toStrictEqual({ x: 72.5, y: 200 })
  })
})
