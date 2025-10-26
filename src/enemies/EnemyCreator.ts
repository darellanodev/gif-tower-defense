import { PathMovement } from '../path/PathMovement'
import { Position } from '../types/position'
import { Enemy } from './Enemy'
import { EnemyAnimator } from './EnemyAnimator'
import { EnemyInstancesManager } from './EnemyInstancesManager'

export class EnemyCreator {
  #enemyInstancesManager: EnemyInstancesManager
  constructor(enemyInstancesManager: EnemyInstancesManager) {
    this.#enemyInstancesManager = enemyInstancesManager
  }

  createNormal(
    waveEnemies: number,
    initialEnemiesPosition: Position,
    wave: number,
    enemyAnimator: EnemyAnimator,
    pathMovement: PathMovement,
  ) {
    const endurance = wave * 3 + waveEnemies * 2
    const isBoss = false

    this.#enemyInstancesManager.generateId()
    const id = this.#enemyInstancesManager.getLastId()

    this.#enemyInstancesManager.add(
      new Enemy(
        initialEnemiesPosition,
        endurance,
        isBoss,
        id,
        enemyAnimator,
        pathMovement,
      ),
    )
  }

  createBoss(
    initialEnemiesPosition: Position,
    wave: number,
    enemyAnimator: EnemyAnimator,
    pathMovement: PathMovement,
  ) {
    const endurance = wave * 25
    const isBoss = true

    this.#enemyInstancesManager.generateId()
    const id = this.#enemyInstancesManager.getLastId()

    this.#enemyInstancesManager.add(
      new Enemy(
        initialEnemiesPosition,
        endurance,
        isBoss,
        id,
        enemyAnimator,
        pathMovement,
      ),
    )
  }
}
