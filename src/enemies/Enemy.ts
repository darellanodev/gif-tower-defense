import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { getJumpGrowth } from './JumpGrowth'
import { Obj } from '../Obj'
import { EnemyAnimator } from './EnemyEyesAnimator'
import { PathMovement } from '../levels/path/PathMovement'
import {
  ENEMY_HEALTH_BAR,
  ENEMY_SHRINK_AMOUNT_FACTOR,
  ENEMY_SIZE,
  ENEMY_STATUS,
} from '../constants/enemy'
import { MAGIC_ICEBALL_FREEZE_ENEMY_MAX_TIME } from '../constants/magics'

export class Enemy extends Obj {
  static waveEnemies: number = 0
  static allowCreateEnemies: boolean = true
  static createEnemyTime: number = 0

  #maxHealth: number
  #isBoss: boolean
  #enemyAnimator: EnemyAnimator
  #pathMovement: PathMovement

  #id: number
  #healthBar: ProgressBar
  #status: number
  #hasWon: boolean = false
  #isFrozen: boolean = false
  #frozenTime: number = 0
  #shrinkAmount: number = 0
  #width: number = 50
  #height: number = 50

  constructor(
    position: Position,
    maxHealth: number,
    isBoss: boolean,
    id: number,
    enemyAnimator: EnemyAnimator,
    pathMovement: PathMovement,
  ) {
    super(position)

    this.#maxHealth = maxHealth
    this.#isBoss = isBoss
    this.#id = id
    this.#enemyAnimator = enemyAnimator
    this.#pathMovement = pathMovement

    this.#healthBar = new ProgressBar(
      ENEMY_HEALTH_BAR.INITIAL_POSITION,
      ENEMY_HEALTH_BAR.SIZE,
    )

    this.#status = ENEMY_STATUS.ALIVE
  }

  get isBoss() {
    return this.#isBoss
  }

  get maxHealth() {
    return this.#maxHealth
  }

  get id() {
    return this.#id
  }

  get isDead() {
    return this.#status == ENEMY_STATUS.DEAD
  }

  get isAlive() {
    return this.#status == ENEMY_STATUS.ALIVE
  }

  get isWinner() {
    return this.#hasWon
  }

  get isJumping() {
    return this.#pathMovement.isJumping
  }

  // pixels added to the size of the enemy while it is in the air
  get jumpGrowth() {
    const progress = this.#pathMovement.jumpProgress
    if (progress === null) {
      return 0
    }
    return getJumpGrowth(progress, this.#pathMovement.jumpDistance)
  }

  get isTeleporting() {
    return this.#pathMovement.isTeleporting
  }

  get isAbducted() {
    return this.#shrinkAmount >= ENEMY_SIZE
  }

  addDamage(shotDamage: number) {
    const damageIncrement = shotDamage / this.#maxHealth
    this.#healthBar.increaseProgress(damageIncrement)
    this.#killEnemyIfProgressFull()
  }

  #killEnemyIfProgressFull() {
    if (this.#healthBar.isFullOfProgress()) {
      this.#status = ENEMY_STATUS.DEAD
    }
  }

  get damage() {
    return this.#healthBar.progress
  }

  freeze() {
    this.#isFrozen = true
  }

  resetWinner() {
    this.#hasWon = false
  }

  #reInitEnemy() {
    this.#enemyAnimator.restart()
    this.#shrinkAmount = 0
    this.#pathMovement.reInit()
  }

  dropFromUFO() {
    this.#reInitEnemy()
  }

  #reInitWinnerEnemy() {
    this.#hasWon = true
    this.#reInitEnemy()
  }

  #updateHealthBarPosition() {
    this.#healthBar.position = {
      x: this.position.x + ENEMY_HEALTH_BAR.OFFSET_X,
      y: this.position.y + ENEMY_HEALTH_BAR.OFFSET_Y,
    }
  }

  get currentDirection() {
    return this.#pathMovement.currentDirection
  }

  get orderPosition() {
    return this.#pathMovement.indexOrder
  }

  get moveCount() {
    return this.#pathMovement.moveCount
  }

  updatePosition() {
    this.position = this.#pathMovement.position
  }

  #updateFreezedEnemy() {
    if (this.#frozenTime < MAGIC_ICEBALL_FREEZE_ENEMY_MAX_TIME) {
      this.#frozenTime++
      return
    }
    this.#isFrozen = false
    this.#frozenTime = 0
  }

  update() {
    if (this.isAbducted) {
      return
    }

    if (this.#isFrozen) {
      this.#updateFreezedEnemy()
      return
    }

    this.#pathMovement.update()
    if (!this.#pathMovement.isAlive) {
      this.#reInitWinnerEnemy()
    }
    this.updatePosition()

    this.#enemyAnimator.update()
    this.#updateHealthBarPosition()
  }

  draw() {
    if (this.isAbducted) {
      return
    }

    const growth = this.jumpGrowth
    const fullWidth = this.#width - this.#shrinkAmount + growth
    const fullHeight = this.#height - this.#shrinkAmount + growth
    // while it teleports the enemy is smaller, around its centre
    const teleportScale = this.#pathMovement.teleportScale
    const width = fullWidth * teleportScale
    const height = fullHeight * teleportScale
    P5.p5.image(
      this.#enemyAnimator.imageToDraw,
      this.position.x +
        this.#shrinkAmount / 2 -
        growth / 2 +
        (fullWidth - width) / 2,
      this.position.y - growth / 2 + (fullHeight - height) / 2,
      width,
      height,
    )

    this.#healthBar.draw()
  }

  decrementSize() {
    if (this.#shrinkAmount < ENEMY_SIZE) {
      this.#shrinkAmount += ENEMY_SHRINK_AMOUNT_FACTOR
    }
  }
}
