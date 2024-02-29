import { ProgressBar } from './ProgressBar'
import { ConstType, Position } from './types'
import { Random } from './Random'
import { Image } from 'p5'

export class Enemy {
  id: number
  images: Image[]
  startPosition: Position
  orders: number[]
  endurance: number
  isBoss: boolean
  Const: ConstType
  RandomClass: typeof Random
  ProgressBarClass: typeof ProgressBar

  imgIndex: number
  imgIndexBeforeEyesClosed: number
  eyesSequence: number[]
  healthBar: ProgressBar
  status: number
  damage: number
  position: Position
  currentDirection: number
  moveCount: number
  indexOrder: number
  changeEyesTime: number
  indexEyesSecuence: number
  closeEyesTime: number
  extendClosedEyesTime: number
  randomCloseEyes: number
  winned: boolean
  freezed: boolean
  freezedTime: number

  constructor(
    id: number,
    images: Image[],
    startPosition: Position,
    orders: number[],
    endurance: number,
    isBoss: boolean,
    Const: ConstType,
    RandomClass: typeof Random,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.id = id
    this.images = images
    this.startPosition = { ...startPosition }
    this.orders = orders
    this.endurance = endurance
    this.isBoss = isBoss
    this.Const = Const
    this.RandomClass = RandomClass
    this.ProgressBarClass = ProgressBarClass

    this.imgIndex = this.Const.ENEMY_EYES_CENTER
    this.imgIndexBeforeEyesClosed = this.Const.ENEMY_EYES_CENTER
    this.eyesSequence = [
      this.Const.ENEMY_EYES_LEFT,
      this.Const.ENEMY_EYES_CENTER,
      this.Const.ENEMY_EYES_RIGHT,
      this.Const.ENEMY_EYES_CENTER,
    ]

    this.healthBar = new this.ProgressBarClass(
      200,
      200,
      this.Const.PROGRESSBAR_WIDTH,
      this.Const.PROGRESSBAR_HEIGHT,
    )
    this.status = this.Const.ENEMY_STATUS_ALIVE
    this.damage = 0

    this.position = { ...this.startPosition }
    this.moveCount = 0
    this.indexOrder = 0
    this.currentDirection = this.orders[this.indexOrder]

    this.changeEyesTime = 0
    this.indexEyesSecuence = 0
    this.closeEyesTime = 0
    this.extendClosedEyesTime = 0
    this.randomCloseEyes = 0

    this.winned = false
    this.freezed = false
    this.freezedTime = 0
  }

  getEndurance() {
    return this.endurance
  }

  addDamage(shotDamage: number) {
    this.damage += shotDamage / this.endurance
    this.healthBar.setProgress(this.damage)

    if (this.healthBar.isFullOfProgress()) {
      this.status = this.Const.ENEMY_STATUS_DEAD
    }
  }

  freeze() {
    this.freezed = true
  }

  isDead() {
    return this.status == this.Const.ENEMY_STATUS_DEAD
  }

  isAlive() {
    return this.status == this.Const.ENEMY_STATUS_ALIVE
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
      if (this.freezedTime < this.Const.MAGIC_ICEBALL_FREEZE_ENEMY_MAX_TIME) {
        this.freezedTime++
      } else {
        this.freezed = false
        this.freezedTime = 0
      }
      return
    }

    const velocity = this.isBoss
      ? this.Const.BOSS_VELOCITY
      : this.Const.ENEMY_VELOCITY

    switch (this.currentDirection) {
      case this.Const.LEFT_DIRECTION:
        this.position.x = this.position.x - velocity
        break

      case this.Const.RIGHT_DIRECTION:
        this.position.x = this.position.x + velocity
        break

      case this.Const.UP_DIRECTION:
        this.position.y = this.position.y - velocity
        break

      case this.Const.DOWN_DIRECTION:
        this.position.y = this.position.y + velocity
        break
    }

    this.moveCount = this.moveCount + velocity

    if (this.moveCount === this.Const.TILE_SIZE) {
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
    return this.imgIndex != this.Const.ENEMY_EYES_CLOSED
  }

  _moveEyesInSequence() {
    this.changeEyesTime++

    if (this.changeEyesTime > this.Const.ENEMY_CHANGE_EYES_MAX_TIME) {
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
      this.Const.ENEMY_MIN_TIME_TO_CLOSE,
      this.Const.ENEMY_MAX_TIME_TO_CLOSE,
    )
  }

  _changeEyes() {
    if (this._hasOpenEyes()) {
      this.closeEyesTime++

      if (this.closeEyesTime > this.randomCloseEyes) {
        this.closeEyesTime = 0
        this._setRandomTimeMaxForClosingEyes()
        this.imgIndexBeforeEyesClosed = this.imgIndex
        this.imgIndex = this.Const.ENEMY_EYES_CLOSED
      }

      this._moveEyesInSequence()
    } else {
      this.extendClosedEyesTime++

      if (
        this.extendClosedEyesTime > this.Const.ENEMY_EXTEND_CLOSED_EYES_MAX_TIME
      ) {
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

    this.healthBar.setPosition(this.position.x, this.position.y - 20)

    this.healthBar.draw()
  }
}
