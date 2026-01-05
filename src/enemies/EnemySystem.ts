import { Enemy } from './Enemy'
import { EnemyAnimator } from './EnemyEyesAnimator'
import { EnemyCreator } from './EnemyCreator'
import { EnemyInstancesManager } from './EnemyInstancesManager'
import { ExplosionEnemy } from '../particles/explosions/ExplosionEnemy'
import { Path } from '../levels/path/Path'
import { PathMovement } from '../levels/path/PathMovement'
import { Player } from '../player/Player'
import { Wallet } from '../player/Wallet'
import { Images } from '../resources/Images'
import { StateManager } from '../StateManager'
import { Position } from '../types/position'
import {
  ENEMY_CREATION_MAX_TIME,
  TOTAL_ENEMIES,
  ENEMY_VELOCITY,
  ENEMY_BOSS_INDEX_IMAGE,
} from '../constants/enemy'
import { MONEY_FACTOR } from '../constants/player'

export class EnemySystem {
  enemyCreator: EnemyCreator
  enemyInstancesManager: EnemyInstancesManager
  #player: Player
  #wallet: Wallet | null
  pathStartEnemiesPosition: Position
  #stateManager: StateManager
  constructor(
    player: Player,
    wallet: Wallet | null,
    stateManager: StateManager,
  ) {
    this.enemyInstancesManager = new EnemyInstancesManager()
    this.enemyCreator = new EnemyCreator(this.enemyInstancesManager)
    this.#player = player
    this.#wallet = wallet
    this.#stateManager = stateManager

    this.pathStartEnemiesPosition = { x: 0, y: 0 }
  }

  #createEnemyNormalAnimator() {
    return new EnemyAnimator(Images.getForEnemy(Enemy.waveEnemies))
  }

  update() {
    this.#handleEnemyNormalCreation()
    this.#handleExplosionEnemies()
    this.enemyInstancesManager.removeDeadInstances()
    this.enemyInstancesManager.updateInstances()
    this.#handleWinners()
  }

  #createNormalEnemyWhenTimeReached() {
    Enemy.createEnemyTime++
    if (Enemy.createEnemyTime === ENEMY_CREATION_MAX_TIME) {
      this.#createEnemyNormal()
      Enemy.createEnemyTime = 0
      Enemy.waveEnemies++
    }
  }

  #handleEnemyNormalCreation() {
    if (!Enemy.allowCreateEnemies) {
      return
    }

    if (Enemy.waveEnemies < TOTAL_ENEMIES) {
      this.#createNormalEnemyWhenTimeReached()
    } else {
      this.#disableEnemyNormalCreation()
    }
  }
  #createEnemyNormal() {
    const enemyAnimator = this.#createEnemyNormalAnimator()
    const pathMovement = this.#createPathMovement(ENEMY_VELOCITY.NORMAL)

    this.enemyCreator.createNormal(
      Enemy.waveEnemies,
      this.pathStartEnemiesPosition,
      this.#player.wave,
      enemyAnimator,
      pathMovement,
    )
  }
  #disableEnemyNormalCreation() {
    Enemy.allowCreateEnemies = false
    Enemy.waveEnemies = 0
  }

  #handleWinners() {
    const winnerEnemies = this.enemyInstancesManager
      .getAll()
      .filter((enemy) => enemy.isWinner)
    winnerEnemies.forEach((enemy) => {
      this.#player.decreaseLives()
      if (this.#player.lives <= 0) {
        this.#stateManager.setGameOver()
      }
      enemy.resetWinner()
    })
  }

  #handleExplosionEnemies() {
    const deadEnemies: Enemy[] = this.enemyInstancesManager
      .getAll()
      .filter((enemy) => enemy.isDead)
    deadEnemies.forEach((enemy) => {
      if (this.#wallet === null) {
        throw new Error('wallet is null')
      }

      ExplosionEnemy.instantiate(enemy.position)

      const $increasedMoney = enemy.maxHealth * MONEY_FACTOR
      this.#wallet.increaseMoney($increasedMoney)
      this.#player.increaseScore($increasedMoney * 2)
    })
  }

  #createPathMovement(speed: number) {
    return new PathMovement(this.pathStartEnemiesPosition, Path.orders, speed)
  }

  #createEnemyBossAnimator() {
    return new EnemyAnimator(Images.getForEnemy(ENEMY_BOSS_INDEX_IMAGE))
  }
  instantiateEnemyBoss() {
    const enemyBossAnimator = this.#createEnemyBossAnimator()
    const pathMovement = this.#createPathMovement(ENEMY_VELOCITY.BOSS)

    this.enemyCreator.createBoss(
      this.pathStartEnemiesPosition,
      this.#player.wave,
      enemyBossAnimator,
      pathMovement,
    )
  }
  draw() {
    this.enemyInstancesManager.drawInstances()
  }
}
