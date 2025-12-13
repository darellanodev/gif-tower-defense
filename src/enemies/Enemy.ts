import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Position } from '../types/position'
import { MagicIceball } from '../magics/MagicIceball'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'
import { EnemyAnimator } from './EnemyAnimator'
import { PathMovement } from '../levels/path/PathMovement'
import { Size } from '../types/size'

export class Enemy extends Obj {
  static VELOCITY = 1 // must be multiple of "ConstTile.SIZE". Set 1 for normal, 5 for a faster game or 25 for a fastest game
  static BOSS_VELOCITY = 0.5

  static STATUS_ALIVE = 0
  static STATUS_DEAD = 1
  static TOTAL_ENEMIES = 5
  static CREATION_MAX_TIME = 200 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.
  static SIZE = 50
  static shrinkAmount_FACTOR = 0.6

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

    this.#healthBar = this.#createHealthBar()

    this.#status = Enemy.STATUS_ALIVE
  }

  #createHealthBar() {
    const initialPosition: Position = { x: 0, y: 0 } // doesn't matter because later it will change with the enemy's position
    const size: Size = { w: 27, h: 7 }

    return new ProgressBar(initialPosition, size)
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
    return this.#status == Enemy.STATUS_DEAD
  }

  get isAlive() {
    return this.#status == Enemy.STATUS_ALIVE
  }

  get isWinner() {
    return this.#won
  }

  get isAbducted() {
    return this.#shrinkAmount >= Enemy.SIZE
  }

  addDamage(shotDamage: number) {
    const damageIncrement = shotDamage / this.#maxHealth
    this.#healthBar.increaseProgress(damageIncrement)
    this.#killEnemyIfProgressFull()
  }

  #killEnemyIfProgressFull() {
    if (this.#healthBar.isFullOfProgress()) {
      this.#status = Enemy.STATUS_DEAD
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
      x: this.position.x + 10,
      y: this.position.y + 3,
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
    if (this.#frozenTime < MagicIceball.FREEZE_ENEMY_MAX_TIME) {
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
    if (this.#shrinkAmount < Enemy.SIZE) {
      this.#shrinkAmount += Enemy.shrinkAmount_FACTOR
    }
  }
}
