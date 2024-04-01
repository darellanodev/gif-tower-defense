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

describe('instantiateNormalEnemy', () => {
  describe('when there are not enemy instances and the instance is recently created', () => {
    beforeEach(() => {
      instantiateNormalEnemy()
    })
    test('the enemy instances are one', () => {
      const result = Enemy.instances.length
      expect(result).toBe(1)
    })
    test('the instanced enemy is not a boss', () => {
      const result = Enemy.instances[0].isBoss()
      expect(result).toBeFalsy()
    })
    test('endurance is: wave*3 + waveEnemies*2 = 1*3 + 3*2 = 9', () => {
      const result = Enemy.instances[0].endurance
      expect(result).toBe(9)
    })
    test('alive is true', () => {
      const result = Enemy.instances[0].alive
      expect(result).toBeTruthy()
    })
    test('dead is false', () => {
      const result = Enemy.instances[0].dead
      expect(result).toBeFalsy()
    })
    test('id is 18', () => {
      const result = Enemy.instances[0].id
      expect(result).toBe(18)
    })
    test('position is the same as the initial position', () => {
      const result = Enemy.instances[0].position
      expect(result).toStrictEqual({ x: 100, y: 200 })
    })
    test('winner is false', () => {
      const result = Enemy.instances[0].winner
      expect(result).toBeFalsy()
    })
    test('current direction is LEFT', () => {
      const result = Enemy.instances[0].currentDirection
      expect(result).toBe(ConstDirection.LEFT)
    })
  })
  describe('when there are not enemy instances and the instance is recently created and updating 55 times', () => {
    beforeEach(() => {
      instantiateNormalEnemy()
      updateInstancesTimes(55)
    })
    test('current direction is DOWN, because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order, and the next order is DOWN', () => {
      const result = Enemy.instances[0].currentDirection
      expect(result).toBe(ConstDirection.DOWN)
    })
    test('current position is x: 50, y: 205, because velocity = 1 it needs 50 (tile width) updates to complete the first LEFT order, next order DOWN, 5 DOWN', () => {
      const result = Enemy.instances[0].position
      expect(result).toStrictEqual({ x: 50, y: 205 })
    })
  })
})
describe('instantiateBossEnemy', () => {
  describe('when there are not enemy instances and the instance is recently created', () => {
    beforeEach(() => {
      instantiateBossEnemy()
    })
    test('the enemy instances are one', () => {
      const result = Enemy.instances.length
      expect(result).toBe(1)
    })
    test('the instanced enemy is a boss', () => {
      const result = Enemy.instances[0].isBoss()
      expect(result).toBeTruthy()
    })
    test('endurance is: wave*25 = 1*25 = 75', () => {
      const result = Enemy.instances[0].endurance
      expect(result).toBe(25)
    })
  })
  describe('when there are not enemy instances and the instance is recently created and updating 55 times', () => {
    beforeEach(() => {
      instantiateBossEnemy()
      updateInstancesTimes(55)
    })
    test('current direction is LEFT, because velocity is 0.5 and it needs 100 updates to complete a 50 tile width order', () => {
      const result = Enemy.instances[0].currentDirection
      expect(result).toBe(ConstDirection.LEFT)
    })
    test('current position is x: 72.5, y: 200, because velocity is 0.5 so every update it moves 0.5', () => {
      const result = Enemy.instances[0].position
      expect(result).toStrictEqual({ x: 72.5, y: 200 })
    })
  })
})
