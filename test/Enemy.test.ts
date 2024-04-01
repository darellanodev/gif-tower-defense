import { Enemy } from '../src/Enemy'
import { ConstDirection } from '../src/ConstDirection'

const updateInstancesTimes = (times: number) => {
  for (let i = 0; i < times; i++) {
    Enemy.updateInstances()
  }
}

const commonConstants = {
  images: [null, null, null] as any,
  orders: [
    ConstDirection.LEFT,
    ConstDirection.DOWN,
    ConstDirection.RIGHT,
    ConstDirection.UP,
  ],
  initialEnemiesPosition: { x: 100, y: 200 },
  wave: 1,
}

const instantiateNormalEnemy = () => {
  Enemy.instances = []
  Enemy.numberOfEnemies = 17
  const { images, orders, initialEnemiesPosition, wave } = commonConstants
  const waveEnemies: number = 3

  Enemy.instantiateNormalEnemy(
    images,
    waveEnemies,
    orders,
    initialEnemiesPosition,
    wave,
  )
}

const instantiateBossEnemy = () => {
  Enemy.instances = []
  Enemy.numberOfEnemies = 17
  const { images, orders, initialEnemiesPosition, wave } = commonConstants

  Enemy.instantiateBoss(images, orders, initialEnemiesPosition, wave)
}

test('alive, when the instance is recently created, return true', () => {
  instantiateNormalEnemy()
  const result = Enemy.instances[0].alive
  expect(result).toBeTruthy()
})
test('dead, when the instance is recently created, return false', () => {
  instantiateNormalEnemy()
  const result = Enemy.instances[0].dead
  expect(result).toBeFalsy()
})
test('id, when the instance is recently created and last id=17 (Enemy.numberOfEnemies = 17), return 18', () => {
  instantiateNormalEnemy()
  const result = Enemy.instances[0].id
  expect(result).toBe(18)
})
test('position, when the instance is recently created, return the same as the initial position', () => {
  instantiateNormalEnemy()
  const result = Enemy.instances[0].position
  expect(result).toStrictEqual({ x: 100, y: 200 })
})
test('winner, when the instance is recently created, return false', () => {
  instantiateNormalEnemy()
  const result = Enemy.instances[0].winner
  expect(result).toBeFalsy()
})

describe('Enemy.instances.length', () => {
  test('when there are not enemy instances and the instance is recently created and is a boss enemy, return 1', () => {
    instantiateBossEnemy()
    const result = Enemy.instances.length
    expect(result).toBe(1)
  })
  test('when there are not enemy instances and the instance is recently created and is a normal enemy, return 1', () => {
    instantiateNormalEnemy()
    const result = Enemy.instances.length
    expect(result).toBe(1)
  })
})

describe('isBoss', () => {
  test('when the instance is a boss enemy, return true', () => {
    instantiateBossEnemy()
    const result = Enemy.instances[0].isBoss()
    expect(result).toBeTruthy()
  })
  test('when the instance is a normal enemy, return false', () => {
    instantiateNormalEnemy()
    const result = Enemy.instances[0].isBoss()
    expect(result).toBeFalsy()
  })
})

describe('endurance', () => {
  test('when is a Boss enemy, return wave*25 = 1*25 = 75', () => {
    instantiateBossEnemy()
    const result = Enemy.instances[0].endurance
    expect(result).toBe(25)
  })
  test('when is a normal enemy, return: wave*3 + waveEnemies*2 = 1*3 + 3*2 = 9', () => {
    instantiateNormalEnemy()
    const result = Enemy.instances[0].endurance
    expect(result).toBe(9)
  })
})

describe('currentDirection', () => {
  test('when no updates, return direction LEFT', () => {
    instantiateNormalEnemy()
    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.LEFT)
  })
  test('when updating 55 times a Boss enemy, return direction LEFT because velocity is 0.5 and it needs 100 updates to complete a 50 tile width order', () => {
    instantiateBossEnemy()
    updateInstancesTimes(55)

    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.LEFT)
  })
  test('when updating 55 times a Normal enemy, return direction DOWN because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order and the next order is DOWN', () => {
    instantiateNormalEnemy()
    updateInstancesTimes(55)

    const result = Enemy.instances[0].currentDirection
    expect(result).toBe(ConstDirection.DOWN)
  })
})

describe('position', () => {
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 50, y: 205 because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order then next order is DOWN and goes 5 DOWN', () => {
    instantiateNormalEnemy()
    updateInstancesTimes(55)

    const result = Enemy.instances[0].position
    expect(result).toStrictEqual({ x: 50, y: 205 })
  })
  test('when there are not enemy instances and the instance is recently created and updating 55 times, return position x: 72.5, y: 200 because velocity is 0.5 so every update it moves 0.5', () => {
    instantiateBossEnemy()
    updateInstancesTimes(55)

    const result = Enemy.instances[0].position
    expect(result).toStrictEqual({ x: 72.5, y: 200 })
  })
})
