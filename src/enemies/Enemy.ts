import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Position } from '../types/position'
import { MagicIceball } from '../magics/MagicIceball'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'
import { EnemyAnimator } from './EnemyEyesAnimator'
import { PathMovement } from '../levels/path/PathMovement'
import { Size } from '../types/size'
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
  #won: boolean = false
  #frozen: boolean = false
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
    return this.#won
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
    this.#frozen = true
  }

  resetWinner() {
    this.#won = false
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
    this.#won = true
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
    this.#frozen = false
    this.#frozenTime = 0
  }

  update() {
    if (this.isAbducted) {
      return
    }

    if (this.#frozen) {
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

    P5.p5.image(
      this.#enemyAnimator.imageToDraw,
      this.position.x + this.#shrinkAmount / 2,
      this.position.y,
      this.#width - this.#shrinkAmount,
      this.#height - this.#shrinkAmount,
    )

    this.#healthBar.draw()
  }

  decrementSize() {
    if (this.#shrinkAmount < ENEMY_SIZE) {
      this.#shrinkAmount += ENEMY_SHRINK_AMOUNT_FACTOR
    }
  }
}
