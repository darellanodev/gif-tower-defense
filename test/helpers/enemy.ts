import { Enemy } from '../../src/enemies/Enemy'
import { ConstDirection } from '../../src/constants/ConstDirection'

export const instantiateNormalEnemy = () => {
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

  Enemy.waveEnemies = waveEnemies + 1
}

export const commonConstants = {
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
