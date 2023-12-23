import { EndTile } from './EndTile'
import { ProgressBar } from './ProgressBar'
import { StartTile } from './StartTile'
import { ConstType } from './types'
import { Random } from './Random'
import { Image } from 'p5'

export class Enemy {
  images: Image[]
  orders: number[]
  startTile: StartTile
  endTile: EndTile
  imgIndex: number
  imgIndexBeforeEyesClosed: number
  eyesSequence: number[]
  healthBar: ProgressBar
  status: number
  damage: number

  x: number
  y: number

  currentDirection: number
  moveCount: number
  indexOrder: number
  insidePath: boolean
  endReached: boolean
  changeEyesTime: number
  indexEyesSecuence: number
  closeEyesTime: number
  extendClosedEyesTime: number

  randomCloseEyes: number

  Const: ConstType
  RandomClass: typeof Random
  ProgressBarClass: typeof ProgressBar

  constructor(
    images: Image[],
    orders: number[],
    startTile: StartTile,
    endTile: EndTile,
    Const: ConstType,
    RandomClass: typeof Random,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.images = images
    this.orders = orders
    this.startTile = startTile
    this.endTile = endTile
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
      this.Const.HEALTHBAR_WIDTH,
      this.Const.HEALTHBAR_HEIGHT,
    )
    this.status = this.Const.ENEMY_STATUS_ALIVE
    this.damage = 0

    this.x = 0
    this.y = 0
    this.currentDirection = this.startTile.getStartDirection()
    this.moveCount = 0
    this.indexOrder = 0
    this.setInitialPosition()
    this.insidePath = false
    this.endReached = false
    this.changeEyesTime = 0
    this.indexEyesSecuence = 0
    this.closeEyesTime = 0
    this.extendClosedEyesTime = 0
    this.randomCloseEyes = 0
  }

  addDamage(shotDamage: number) {
    if (!this.healthBar.isFullOfProgress()) {
      this.damage += shotDamage
      this.healthBar.setProgress(this.damage)
    } else {
      this.status = this.Const.ENEMY_STATUS_DEAD
    }
  }

  isDead() {
    return this.status == this.Const.ENEMY_STATUS_DEAD
  }

  isAlive() {
    return this.status == this.Const.ENEMY_STATUS_ALIVE
  }

  reinitEnemy() {
    this.currentDirection = this.startTile.getStartDirection()
    this.moveCount = 0
    this.indexOrder = 0
    this.setInitialPosition()
    this.insidePath = false
    this.endReached = false
    this.changeEyesTime = 0
    this.indexEyesSecuence = 0
    this.closeEyesTime = 0
    this.extendClosedEyesTime = 0

    this._setRandomTimeMaxForClosingEyes()
  }

  isEndReached() {
    return this.x === this.endTile.getX() && this.y === this.endTile.getY()
  }

  setInitialPosition() {
    switch (this.currentDirection) {
      case this.Const.LEFT_DIRECTION:
        this.x = this.startTile.getX() + this.Const.TILE_SIZE
        this.y = this.startTile.getY()
        break

      case this.Const.RIGHT_DIRECTION:
        this.x = this.startTile.getX() - this.Const.TILE_SIZE
        this.y = this.startTile.getY()
        break

      case this.Const.UP_DIRECTION:
        this.x = this.startTile.getX()
        this.y = this.startTile.getY() + this.Const.TILE_SIZE
        break

      case this.Const.DOWN_DIRECTION:
        this.x = this.startTile.getX()
        this.y = this.startTile.getY() - this.Const.TILE_SIZE
        break
    }
  }

  update() {
    switch (this.currentDirection) {
      case this.Const.LEFT_DIRECTION:
        this.x = this.x - this.Const.ENEMY_VELOCITY
        break

      case this.Const.RIGHT_DIRECTION:
        this.x = this.x + this.Const.ENEMY_VELOCITY
        break

      case this.Const.UP_DIRECTION:
        this.y = this.y - this.Const.ENEMY_VELOCITY
        break

      case this.Const.DOWN_DIRECTION:
        this.y = this.y + this.Const.ENEMY_VELOCITY
        break
    }

    this.moveCount = this.moveCount + this.Const.ENEMY_VELOCITY

    if (this.moveCount === this.Const.TILE_SIZE && this.endReached) {
      this.reinitEnemy()
    }

    if (this.moveCount === this.Const.TILE_SIZE) {
      this.moveCount = 0

      if (this.isEndReached()) {
        this.endReached = true
      }

      if (!this.endReached) {
        if (this.insidePath) {
          this.indexOrder++
          this.currentDirection = this.orders[this.indexOrder]
        } else {
          this.insidePath = true
        }
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

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  draw() {
    this._changeEyes()
    image(this.images[this.imgIndex], this.x, this.y)

    this.healthBar.setPosition(this.x, this.y - 20)

    this.healthBar.draw()
  }
}
