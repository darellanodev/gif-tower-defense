import { Enemy } from '../../src/enemies/Enemy'
import { EnemyAnimator } from '../../src/enemies/EnemyAnimator'
import { Player } from '../../src/player/Player'
import { images } from './imagesResources'
import { getPathFromMap, getValidLevelMap } from './levelMap'

export const clearEnemyInstances = () => {
  Enemy.instances = []
  Enemy.numberOfEnemies = 0
}

export const instantiateNormalEnemy = (orders?: number[] | null) => {
  if (!orders) {
    orders = getOrders()
  }
  const waveEnemies: number = 3
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1
  const player = new Player()
  const enemyAnimator = new EnemyAnimator(images)
  Enemy.instantiateNormalEnemy(
    waveEnemies,
    orders,
    initialEnemiesPosition,
    wave,
    player,
    enemyAnimator,
  )
  Enemy.waveEnemies = waveEnemies + 1
}

export const instantiateBossEnemy = (orders?: number[] | null) => {
  if (!orders) {
    orders = getOrders()
  }
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1
  const player = new Player()
  const enemyAnimator = new EnemyAnimator(images)
  Enemy.instantiateBoss(
    orders,
    initialEnemiesPosition,
    wave,
    player,
    enemyAnimator,
  )
}

const getOrders = () => {
  const levelMap = getValidLevelMap()
  const path = getPathFromMap(levelMap)
  return path.makeOrders()
}

export const updateEnemyInstancesTimes = (times: number) => {
  for (let i = 0; i < times; i++) {
    Enemy.updateInstances()
  }
}
