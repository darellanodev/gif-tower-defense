import { Enemy } from '../src/enemies/Enemy'
import { ConstDirection } from '../src/constants/ConstDirection'
import {
  instantiateNormalEnemy,
  instantiateBossEnemy,
  clearEnemyInstances,
} from './helpers/enemy'

const updateInstancesTimes = (times: number) => {
  for (let i = 0; i < times; i++) {
    Enemy.updateInstances()
  }
}

const testTinyOrders = [
  ConstDirection.LEFT,
  ConstDirection.DOWN,
  ConstDirection.RIGHT,
  ConstDirection.UP,
]

test('alive, when the instance is recently created, return true', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = Enemy.instances[0].alive
  expect(result).toBeTruthy()
})
test('dead, when the instance is recently created, return false', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = Enemy.instances[0].dead
  expect(result).toBeFalsy()
})
test('id, when the instance is recently created and last id=17 (Enemy.numberOfEnemies = 17), return 18', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = Enemy.instances[0].id
  expect(result).toBe(18)
})
test('position, when the instance is recently created, return the same as the initial position', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = Enemy.instances[0].position
  expect(result).toStrictEqual({ x: 100, y: 200 })
})
test('winner, when the instance is recently created, return false', () => {
  clearEnemyInstances()
  instantiateNormalEnemy()
  const result = Enemy.instances[0].winner
  expect(result).toBeFalsy()
})

describe('Enemy.instances.length', () => {
  test('when there are not enemy instances and the instance is recently created and is a boss enemy, return 1', () => {
    clearEnemyInstances()
    instantiateBossEnemy()
    const result = Enemy.instances.length
    expect(result).toBe(1)
  })
  test('when there are not enemy instances and the instance is recently created and is a normal enemy, return 1', () => {
    clearEnemyInstances()
    instantiateNormalEnemy()
    const result = Enemy.instances.length
    expect(result).toBe(1)
  })
})

describe('isBoss', () => {
  test('when the instance is a boss enemy, return true', () => {
    clearEnemyInstances()
    instantiateBossEnemy()
    const result = Enemy.instances[0].isBoss()
    expect(result).toBeTruthy()
  })
  test('when the instance is a normal enemy, return false', () => {
    clearEnemyInstances()
    instantiateNormalEnemy()
    const result = Enemy.instances[0].isBoss()
    expect(result).toBeFalsy()
  })
})

describe('endurance', () => {
  test('when is a Boss enemy, return wave * 25', () => {
    const wave = 1
    clearEnemyInstances()
    instantiateBossEnemy()

    const result = Enemy.instances[0].endurance

    const expected = wave * 25
    expect(result).toBe(expected)
  })
  test('when is a normal enemy, return wave * 3 + waveEnemies * 2', () => {
    const wave = 1
    clearEnemyInstances()
    instantiateNormalEnemy()

    const result = Enemy.instances[0].endurance

    const expected = wave * 3 + (Enemy.waveEnemies - 1) * 2 // it is (Enemy.waveEnemies - 1) because when an enemy is created Enemy.waveEnemies increments by 1
    expect(result).toBe(expected)
  })
})

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
    updateInstancesTimes(55)

    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.LEFT)
  })
  test('when updating 55 times a Normal enemy, return direction DOWN because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order and the next order is DOWN', () => {
    clearEnemyInstances()
    instantiateNormalEnemy(testTinyOrders)
    updateInstancesTimes(55)

    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.DOWN)
  })
})

describe('position', () => {
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 50, y: 205 because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order then next order is DOWN and goes 5 DOWN', () => {
    clearEnemyInstances()
    instantiateNormalEnemy(testTinyOrders)
    updateInstancesTimes(55)

    const result = Enemy.instances[0].position
    expect(result).toStrictEqual({ x: 50, y: 205 })
  })
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 72.5, y: 200 because velocity is 0.5 so every update it moves 0.5', () => {
    clearEnemyInstances()
    instantiateBossEnemy(testTinyOrders)
    updateInstancesTimes(55)

    const result = Enemy.instances[0].position
    expect(result).toStrictEqual({ x: 72.5, y: 200 })
  })
})
