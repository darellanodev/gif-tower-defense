import { Enemy } from '../../src/enemies/Enemy'
import { EnemyAnimator } from '../../src/enemies/EnemyAnimator'
import { EnemyCreator } from '../../src/enemies/EnemyCreator'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { PathMovement } from '../../src/path/PathMovement'
import { getOrders } from './enemy'
import { images } from './imagesResources'

export const createNormalEnemy = (
  enemyInstancesManager: EnemyInstancesManager,
) => {
  const enemyCreator = new EnemyCreator(enemyInstancesManager)

  const waveEnemies = 3
  const wave = 1
  const initialEnemiesPosition = { x: 100, y: 200 }
  const orders = getOrders()
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
) => {
  const enemyCreator = new EnemyCreator(enemyInstancesManager)

  const wave = 1
  const initialEnemiesPosition = { x: 100, y: 200 }
  const orders = getOrders()
  const enemyAnimator = new EnemyAnimator(images)
  const pathMovement = new PathMovement(
    initialEnemiesPosition,
    orders,
    Enemy.VELOCITY,
  )

  enemyCreator.instantiateBoss(
    initialEnemiesPosition,
    wave,
    enemyAnimator,
    pathMovement,
  )
}
