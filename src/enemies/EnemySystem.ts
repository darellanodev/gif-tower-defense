import { Const } from '../constants/Const'
import { Enemy } from './Enemy'
import { EnemyAnimator } from './EnemyAnimator'
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
import { Arrays } from '../utils/Arrays'

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
    return new EnemyAnimator(
      Images.enemiesImages.slice(
        ...Arrays.getTwoNumbersFourTimes(Enemy.waveEnemies),
      ),
    )
  }

  update() {
    this.#handleEnemyNormalCreation()
    this.#handleExplosionEnemies()
    this.enemyInstancesManager.removeDeadInstances()
    this.enemyInstancesManager.updateInstances()
    this.#handleWinners()
  }

  #handleEnemyNormalCreation() {
    if (Enemy.allowCreateEnemies) {
      if (Enemy.waveEnemies < Enemy.TOTAL_ENEMIES) {
        Enemy.createEnemyTime++
        if (Enemy.createEnemyTime === Enemy.CREATION_MAX_TIME) {
          this.#createEnemyNormal()
          Enemy.createEnemyTime = 0
          Enemy.waveEnemies++
        }
      } else {
        this.#disableEnemyNormalCreation()
      }
    }
  }
  #createEnemyNormal() {
    const enemyAnimator = this.#createEnemyNormalAnimator()
    const pathMovement = this.#createPathMovement(Enemy.VELOCITY)

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
      .filter((enemy) => enemy.winner)
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
      .filter((enemy) => enemy.dead)
    deadEnemies.forEach((enemy) => {
      if (this.#wallet === null) {
        throw new Error('wallet is null')
      }

      ExplosionEnemy.instantiate(enemy.position)

      const $increasedMoney = enemy.endurance * Const.MONEY_FACTOR
      this.#wallet.increaseMoney($increasedMoney)
      this.#player.increaseScore($increasedMoney * 2)
    })
  }

  #createPathMovement(speed: number) {
    return new PathMovement(this.pathStartEnemiesPosition, Path.orders, speed)
  }

  #createEnemyBossAnimator() {
    return new EnemyAnimator(
      Images.enemiesImages.slice(
        ...Arrays.getTwoNumbersFourTimes(
          EnemyAnimator.INDEX_BOSS_IN_ENEMIES_IMAGES,
        ),
      ),
    )
  }
  instantiateEnemyBoss() {
    const enemyBossAnimator = this.#createEnemyBossAnimator()
    const pathMovement = this.#createPathMovement(Enemy.BOSS_VELOCITY)

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
