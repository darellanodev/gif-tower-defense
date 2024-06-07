import { Enemy } from '../../src/enemies/Enemy'
import { EnemyAnimator } from '../../src/enemies/EnemyAnimator'
import { EnemyCreator } from '../../src/enemies/EnemyCreator'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { PathMovement } from '../../src/path/PathMovement'
import { getOrders } from './orders'
import { images } from './imagesResources'

export const createNormalEnemy = (
  enemyInstancesManager: EnemyInstancesManager,
  orders?: number[] | null,
  wave?: number | null,
) => {
  if (!orders) {
    orders = getOrders()
  }
  if (!wave) {
    wave = 1
  }

  const enemyCreator = new EnemyCreator(enemyInstancesManager)

  const waveEnemies = 3
  const initialEnemiesPosition = { x: 100, y: 200 }
  const enemyAnimator = new EnemyAnimator(images)
  const pathMovement = new PathMovement(
    initialEnemiesPosition,
    orders,
    Enemy.VELOCITY,
  )

  enemyCreator.instantiateNormalEnemy(
    waveEnemies,
    initialEnemiesPosition,
    wave,
    enemyAnimator,
    pathMovement,
  )
}

export const createBossEnemy = (
  enemyInstancesManager: EnemyInstancesManager,
  orders?: number[] | null,
) => {
  if (!orders) {
    orders = getOrders()
  }

  const enemyCreator = new EnemyCreator(enemyInstancesManager)
  const wave = 1
  const initialEnemiesPosition = { x: 100, y: 200 }
  const enemyAnimator = new EnemyAnimator(images)
  const pathMovement = new PathMovement(
    initialEnemiesPosition,
    orders,
    Enemy.BOSS_VELOCITY,
  )

  enemyCreator.instantiateBoss(
    initialEnemiesPosition,
    wave,
    enemyAnimator,
    pathMovement,
  )
}
export const updateEnemyInstancesTimes = (
  enemyInstances: EnemyInstancesManager,
  times: number,
) => {
  for (let i = 0; i < times; i++) {
    enemyInstances.updateInstances()
  }
}
