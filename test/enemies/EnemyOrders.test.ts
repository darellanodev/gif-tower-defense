import { Enemy } from '../../src/enemies/Enemy'
import { ConstDirection } from '../../src/constants/ConstDirection'
import {
  instantiateNormalEnemy,
  instantiateBossEnemy,
  clearEnemyInstances,
  updateEnemyInstancesTimes,
} from '../helpers/enemy'
import { testTinyOrders } from '../helpers/levelMap'

describe('currentDirection', () => {
  test('when no updates, return direction LEFT', () => {
    clearEnemyInstances()
    instantiateNormalEnemy(testTinyOrders)
    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.LEFT)
  })
  test('when updating 55 times a Boss enemy, return direction LEFT because velocity is 0.5 and it needs 100 updates to complete a 50 tile width order', () => {
    clearEnemyInstances()
    instantiateBossEnemy(testTinyOrders)
    updateEnemyInstancesTimes(55)

    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.LEFT)
  })
  test('when updating 55 times a Normal enemy, return direction DOWN because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order and the next order is DOWN', () => {
    clearEnemyInstances()
    instantiateNormalEnemy(testTinyOrders)
    updateEnemyInstancesTimes(55)

    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.DOWN)
  })
})

describe('position', () => {
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 50, y: 205 because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order then next order is DOWN and goes 5 DOWN', () => {
    clearEnemyInstances()
    instantiateNormalEnemy(testTinyOrders)
    updateEnemyInstancesTimes(55)

    const result = Enemy.instances[0].position
    expect(result).toStrictEqual({ x: 50, y: 205 })
  })
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 72.5, y: 200 because velocity is 0.5 so every update it moves 0.5', () => {
    clearEnemyInstances()
    instantiateBossEnemy(testTinyOrders)
    updateEnemyInstancesTimes(55)

    const result = Enemy.instances[0].position
    expect(result).toStrictEqual({ x: 72.5, y: 200 })
  })
})
