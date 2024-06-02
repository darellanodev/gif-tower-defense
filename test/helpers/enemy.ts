import { Enemy } from '../../src/enemies/Enemy'
import { EnemyAnimator } from '../../src/enemies/EnemyAnimator'
import { PathMovement } from '../../src/path/PathMovement'
import { images } from './imagesResources'
import { getPathFromMap, getValidLevelMap } from './levelMap'

export const clearEnemyInstances = () => {
  Enemy.instances = []
  Enemy.numberOfEnemies = 0
}

export const instantiateNormalEnemy = (
  wave?: number, // use wave param to make the Enemy stronger
  orders?: number[] | null,
) => {
  if (!wave) {
    wave = 1
  }
  if (!orders) {
    orders = getOrders()
  }
  const waveEnemies: number = 3
  const initialEnemiesPosition = { x: 100, y: 200 }

  const enemyAnimator = new EnemyAnimator(images)

  const pathMovement = new PathMovement(
    initialEnemiesPosition,
    orders,
    Enemy.VELOCITY,
  )

  Enemy.instantiateNormalEnemy(
    waveEnemies,
    initialEnemiesPosition,
    wave,
    enemyAnimator,
    pathMovement,
  )
  Enemy.waveEnemies = waveEnemies + 1
}

export const instantiateBossEnemy = (orders?: number[] | null) => {
  if (!orders) {
    orders = getOrders()
  }
  const initialEnemiesPosition = { x: 100, y: 200 }
  const wave = 1
  const enemyAnimator = new EnemyAnimator(images)

  const pathMovement = new PathMovement(
    initialEnemiesPosition,
    orders,
    Enemy.BOSS_VELOCITY,
  )

  Enemy.instantiateBoss(
    initialEnemiesPosition,
    wave,
    enemyAnimator,
    pathMovement,
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
