import { ProgressBar } from './ProgressBar'
import { Position } from './types'
import { Random } from './Random'
import { Image } from 'p5'
import { MagicIceball } from './MagicIceball'
import { Const } from './Const'
import { ConstDirection } from './ConstDirection'

export class Enemy {
  static VELOCITY = 1 // must be multiple of "this.Const.TILE_SIZE". Set 1 for normal, 5 for a faster game or 25 for a fastest game
  static BOSS_VELOCITY = 0.5
  static CHANGE_EYES_MAX_TIME = 50
  static EXTEND_CLOSED_EYES_MAX_TIME = 20
  static MIN_TIME_TO_CLOSE = 50
  static MAX_TIME_TO_CLOSE = 200
  static EYES_CENTER = 0
  static EYES_LEFT = 1
  static EYES_RIGHT = 2
  static EYES_CLOSED = 3
  static STATUS_ALIVE = 0
  static STATUS_DEAD = 1
  static TOTAL_ENEMIES = 5
  static CREATION_MAX_TIME = 200 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.
  static numberOfEnemies = 0 // for generating IDs

  images: Image[]
  startPosition: Position
  orders: number[]
  endurance: number
  isBoss: boolean
  RandomClass: typeof Random
  ProgressBarClass: typeof ProgressBar

  id: number
  imgIndex: number = Enemy.EYES_CENTER
  imgIndexBeforeEyesClosed: number = Enemy.EYES_CENTER
  eyesSequence: number[]
  healthBar: ProgressBar
  status: number = Enemy.STATUS_ALIVE
  damage: number = 0
  position: Position
  currentDirection: number
  moveCount: number = 0
  indexOrder: number = 0
  changeEyesTime: number = 0
  indexEyesSecuence: number = 0
  closeEyesTime: number = 0
  extendClosedEyesTime: number = 0
  randomCloseEyes: number = 0
  winned: boolean = false
  freezed: boolean = false
  freezedTime: number = 0

  constructor(
    images: Image[],
    startPosition: Position,
    orders: number[],
    endurance: number,
    isBoss: boolean,
    RandomClass: typeof Random,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.images = images
    this.startPosition = { ...startPosition }
    this.orders = orders
    this.endurance = endurance
    this.isBoss = isBoss
    this.RandomClass = RandomClass
    this.ProgressBarClass = ProgressBarClass

    // generate Id
    Enemy.numberOfEnemies++
    this.id = Enemy.numberOfEnemies

    this.eyesSequence = [
      Enemy.EYES_LEFT,
      Enemy.EYES_CENTER,
      Enemy.EYES_RIGHT,
      Enemy.EYES_CENTER,
    ]

    this.healthBar = new this.ProgressBarClass(
      { x: 200, y: 200 },
      ProgressBar.WIDTH,
      ProgressBar.HEIGHT,
    )

    this.position = { ...this.startPosition }
    this.currentDirection = this.orders[this.indexOrder]
  }

  getEndurance() {
    return this.endurance
  }

  addDamage(shotDamage: number) {
    this.damage += shotDamage / this.endurance
    this.healthBar.setProgress(this.damage)

    if (this.healthBar.isFullOfProgress()) {
      this.status = Enemy.STATUS_DEAD
    }
  }

  freeze() {
    this.freezed = true
  }

  isDead() {
    return this.status == Enemy.STATUS_DEAD
  }

  isAlive() {
    return this.status == Enemy.STATUS_ALIVE
  }

  isWinner() {
    return this.winned
  }

  resetWinner() {
    this.winned = false
  }

  reinitEnemy() {
    this.winned = true
    this.moveCount = 0
    this.indexOrder = 0
    this.changeEyesTime = 0
    this.indexEyesSecuence = 0
    this.closeEyesTime = 0
    this.extendClosedEyesTime = 0
    this.currentDirection = this.orders[this.indexOrder]
    this.position = { ...this.startPosition }
    this._setRandomTimeMaxForClosingEyes()
  }

  getOrderPosition() {
    return this.indexOrder
  }

  update() {
    if (this.freezed) {
      if (this.freezedTime < MagicIceball.FREEZE_ENEMY_MAX_TIME) {
        this.freezedTime++
      } else {
        this.freezed = false
        this.freezedTime = 0
      }
      return
    }

    const velocity = this.isBoss ? Enemy.BOSS_VELOCITY : Enemy.VELOCITY

    switch (this.currentDirection) {
      case ConstDirection.LEFT:
        this.position.x = this.position.x - velocity
        break

      case ConstDirection.RIGHT:
        this.position.x = this.position.x + velocity
        break

      case ConstDirection.UP:
        this.position.y = this.position.y - velocity
        break

      case ConstDirection.DOWN:
        this.position.y = this.position.y + velocity
        break
    }

    this.moveCount = this.moveCount + velocity

    if (this.moveCount === Const.TILE_SIZE) {
      this.moveCount = 0
      this.indexOrder++
      if (this.indexOrder == this.orders.length) {
        this.reinitEnemy()
      } else {
        this.currentDirection = this.orders[this.indexOrder]
      }
    }
  }

  _hasOpenEyes() {
    return this.imgIndex != Enemy.EYES_CLOSED
  }

  _moveEyesInSequence() {
    this.changeEyesTime++

    if (this.changeEyesTime > Enemy.CHANGE_EYES_MAX_TIME) {
      this.changeEyesTime = 0
      this.indexEyesSecuence++
      if (this.indexEyesSecuence == this.eyesSequence.length) {
        this.indexEyesSecuence = 0
      }

      this.imgIndex = this.eyesSequence[this.indexEyesSecuence]
    }
  }

  _setRandomTimeMaxForClosingEyes() {
    this.randomCloseEyes = this.RandomClass.integerBetween(
      Enemy.MIN_TIME_TO_CLOSE,
      Enemy.MAX_TIME_TO_CLOSE,
    )
  }

  _changeEyes() {
    if (this._hasOpenEyes()) {
      this.closeEyesTime++

      if (this.closeEyesTime > this.randomCloseEyes) {
        this.closeEyesTime = 0
        this._setRandomTimeMaxForClosingEyes()
        this.imgIndexBeforeEyesClosed = this.imgIndex
        this.imgIndex = Enemy.EYES_CLOSED
      }

      this._moveEyesInSequence()
    } else {
      this.extendClosedEyesTime++

      if (this.extendClosedEyesTime > Enemy.EXTEND_CLOSED_EYES_MAX_TIME) {
        this.extendClosedEyesTime = 0
        this.imgIndex = this.imgIndexBeforeEyesClosed
      }
    }
  }

  getPosition() {
    return this.position
  }

  draw() {
    this._changeEyes()
    image(this.images[this.imgIndex], this.position.x, this.position.y)

    this.healthBar.setPosition({ x: this.position.x, y: this.position.y - 20 })

    this.healthBar.draw()
  }
}
