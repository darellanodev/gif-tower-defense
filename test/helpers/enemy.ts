import { Enemy } from '../../src/enemies/Enemy'
import { getPathFromMap } from './map'

export const clearEnemyInstances = () => {
  Enemy.instances = []
  Enemy.numberOfEnemies = 17
}

export const instantiateNormalEnemy = (orders?: number[] | null) => {
  const waveEnemies: number = 3
  const images = [null, null, null] as any
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1
  if (!orders) {
    const path = getPathFromMap()
    orders = path.makeOrders()
  }

  Enemy.instantiateNormalEnemy(
    images,
    waveEnemies,
    orders,
    initialEnemiesPosition,
    wave,
  )

  Enemy.waveEnemies = waveEnemies + 1
}

export const instantiateBossEnemy = (orders?: number[] | null) => {
  if (!orders) {
    const path = getPathFromMap()
    orders = path.makeOrders()
  }

  const images = [null, null, null] as any
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1

  Enemy.instantiateBoss(images, orders, initialEnemiesPosition, wave)
}
