import { Enemy } from '../../src/enemies/Enemy'
import { Player } from '../../src/player/Player'
import { getPathFromMap, getValidLevelMap } from './levelMap'

export const clearEnemyInstances = () => {
  Enemy.instances = []
  Enemy.numberOfEnemies = 17
}

export const instantiateNormalEnemy = (orders?: number[] | null) => {
  if (!orders) {
    orders = getOrders()
  }
  const waveEnemies: number = 3
  const images = [null, null, null] as any
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1
  const player = new Player()
  Enemy.instantiateNormalEnemy(
    images,
    waveEnemies,
    orders,
    initialEnemiesPosition,
    wave,
    player,
  )
  Enemy.waveEnemies = waveEnemies + 1
}

export const instantiateBossEnemy = (orders?: number[] | null) => {
  if (!orders) {
    orders = getOrders()
  }
  const images = [null, null, null] as any
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1
  const player = new Player()
  Enemy.instantiateBoss(images, orders, initialEnemiesPosition, wave, player)
}

const getOrders = () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  return path.makeOrders()
}
