import { Enemy } from '../src/Enemy'
import { Position } from '../src/types'

const commonConstants = {
  images: [null, null, null] as any,
  orders: [0, 1, 2, 3],
  initialEnemiesPosition: { x: 100, y: 200 },
  wave: 1,
}

const instantiateNormalEnemy = () => {
  Enemy.instances = []
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
  const { images, orders, initialEnemiesPosition, wave } = commonConstants

  Enemy.instantiateBoss(images, orders, initialEnemiesPosition, wave)
}

describe('instantiateNormalEnemy', () => {
  describe('when there are not enemy instances', () => {
    test('the enemy instances are one', () => {
      instantiateNormalEnemy()
      const result = Enemy.instances.length
      expect(result).toBe(1)
    })
    test('the instanced enemy is not a boss', () => {
      instantiateNormalEnemy()
      const result = Enemy.instances[0].isBoss()
      expect(result).toBeFalsy()
    })
    test('endurance is: wave*3 + waveEnemies*2 = 1*3 + 3*2 = 9', () => {
      instantiateNormalEnemy()
      const result = Enemy.instances[0].endurance
      expect(result).toBe(9)
    })
  })
})
describe('instantiateBossEnemy', () => {
  describe('when there are not enemy instances', () => {
    test('the enemy instances are one', () => {
      instantiateBossEnemy()
      const result = Enemy.instances.length
      expect(result).toBe(1)
    })
    test('the instanced enemy is a boss', () => {
      instantiateBossEnemy()
      const result = Enemy.instances[0].isBoss()
      expect(result).toBeTruthy()
    })
    test('endurance is: wave*25 = 1*25 = 75', () => {
      instantiateBossEnemy()
      const result = Enemy.instances[0].endurance
      expect(result).toBe(25)
    })
  })
})
