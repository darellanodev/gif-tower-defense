import { ConstType } from './types'
import { Image } from 'p5'

export class MagicUFO {
  img: Image
  startX: number
  startY: number
  orders: number[]
  Const: ConstType
  x: number
  y: number
  currentDirection: number
  moveCount: number
  indexOrder: number

  constructor(
    img: Image,
    startX: number,
    startY: number,
    orders: number[],
    Const: ConstType,
  ) {
    this.img = img
    this.startX = startX
    this.startY = startY
    this.orders = orders
    this.Const = Const

    this.x = this.startX
    this.y = this.startY
    this.moveCount = 0
    this.indexOrder = 0
    this.currentDirection = this.orders[this.indexOrder]
  }

  update() {
    switch (this.currentDirection) {
      case this.Const.LEFT_DIRECTION:
        this.x = this.x - this.Const.MAGIC_FIREBALL_SPEED
        break

      case this.Const.RIGHT_DIRECTION:
        this.x = this.x + this.Const.MAGIC_FIREBALL_SPEED
        break

      case this.Const.UP_DIRECTION:
        this.y = this.y - this.Const.MAGIC_FIREBALL_SPEED
        break

      case this.Const.DOWN_DIRECTION:
        this.y = this.y + this.Const.MAGIC_FIREBALL_SPEED
        break
    }

    this.moveCount = this.moveCount + this.Const.MAGIC_FIREBALL_SPEED

    if (this.moveCount === this.Const.TILE_SIZE) {
      this.moveCount = 0
      this.indexOrder++
      if (this.indexOrder == this.orders.length) {
        // reach the end tile
      } else {
        this.currentDirection = this.orders[this.indexOrder]
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
    image(this.img, this.x, this.y)
  }
}
