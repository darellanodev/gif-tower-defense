export class Enemy {
  VELOCITY = 1 // must be multiple of "this.Const.TILE_SIZE". Set 1 for normal game or 25 for speed test

  CHANGE_EYES_MAX_TIME = 50

  EXTEND_CLOSED_EYES_MAX_TIME = 20
  MIN_TIME_TO_CLOSE = 50
  MAX_TIME_TO_CLOSE = 200

  EYES_LEFT = 1
  EYES_RIGHT = 2
  EYES_CENTER = 0
  EYES_CLOSED = 3

  STATUS_ALIVE = 0
  STATUS_DEAD = 1

  images: any[]
  orders: number[]
  startTile: any
  endTile: any
  imgIndex: number
  imgIndexBeforeEyesClosed: number
  eyesSequence: any[]
  healthBar: any
  status: any
  damage: any

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

  Const: any
  Random: any
  HealthBar: any

  constructor(
    images: any[],
    orders: number[],
    startTile: any,
    endTile: any,
    Const: any,
    Random: any,
    HealthBar: any,
  ) {
    this.images = images
    this.orders = orders
    this.startTile = startTile
    this.endTile = endTile
    this.Const = Const
    this.Random = Random
    this.HealthBar = HealthBar

    this.imgIndex = this.EYES_CENTER
    this.imgIndexBeforeEyesClosed = this.EYES_CENTER
    this.eyesSequence = [
      this.EYES_LEFT,
      this.EYES_CENTER,
      this.EYES_RIGHT,
      this.EYES_CENTER,
    ]

    this.healthBar = new this.HealthBar(200, 200)
    this.status = this.STATUS_ALIVE
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
    if (!this.healthBar.isFullOfDamage()) {
      this.damage += shotDamage
      this.healthBar.setDamage(this.damage)
    } else {
      this.status = this.STATUS_DEAD
    }
  }

  isDead() {
    return this.status == this.STATUS_DEAD
  }

  isAlive() {
    return this.status == this.STATUS_ALIVE
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
        this.x = this.x - this.VELOCITY
        break

      case this.Const.RIGHT_DIRECTION:
        this.x = this.x + this.VELOCITY
        break

      case this.Const.UP_DIRECTION:
        this.y = this.y - this.VELOCITY
        break

      case this.Const.DOWN_DIRECTION:
        this.y = this.y + this.VELOCITY
        break
    }

    this.moveCount = this.moveCount + this.VELOCITY

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
    return this.imgIndex != this.EYES_CLOSED
  }

  _moveEyesInSequence() {
    this.changeEyesTime++

    if (this.changeEyesTime > this.CHANGE_EYES_MAX_TIME) {
      this.changeEyesTime = 0
      this.indexEyesSecuence++
      if (this.indexEyesSecuence == this.eyesSequence.length) {
        this.indexEyesSecuence = 0
      }

      this.imgIndex = this.eyesSequence[this.indexEyesSecuence]
    }
  }

  _setRandomTimeMaxForClosingEyes() {
    this.randomCloseEyes = this.Random.integerBetween(
      this.MIN_TIME_TO_CLOSE,
      this.MAX_TIME_TO_CLOSE,
    )
  }

  _changeEyes() {
    if (this._hasOpenEyes()) {
      this.closeEyesTime++

      if (this.closeEyesTime > this.randomCloseEyes) {
        this.closeEyesTime = 0
        this._setRandomTimeMaxForClosingEyes()
        this.imgIndexBeforeEyesClosed = this.imgIndex
        this.imgIndex = this.EYES_CLOSED
      }

      this._moveEyesInSequence()
    } else {
      this.extendClosedEyesTime++

      if (this.extendClosedEyesTime > this.EXTEND_CLOSED_EYES_MAX_TIME) {
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
