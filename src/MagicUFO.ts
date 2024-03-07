import { Image } from 'p5'
import { Const } from './Const'

export class MagicUFO {
  static SPEED = 10
  static UFOS = 3

  img: Image
  startX: number
  startY: number
  orders: number[]

  x: number
  y: number
  currentDirection: number
  moveCount: number = 0
  indexOrder: number = 0

  constructor(img: Image, startX: number, startY: number, orders: number[]) {
    this.img = img
    this.startX = startX
    this.startY = startY
    this.orders = orders

    this.x = this.startX
    this.y = this.startY
    this.currentDirection = this.orders[this.indexOrder]
  }

  update() {
    switch (this.currentDirection) {
      case Const.LEFT_DIRECTION:
        this.x = this.x - MagicUFO.SPEED
        break

      case Const.RIGHT_DIRECTION:
        this.x = this.x + MagicUFO.SPEED
        break

      case Const.UP_DIRECTION:
        this.y = this.y - MagicUFO.SPEED
        break

      case Const.DOWN_DIRECTION:
        this.y = this.y + MagicUFO.SPEED
        break
    }

    this.moveCount = this.moveCount + MagicUFO.SPEED

    if (this.moveCount === Const.TILE_SIZE) {
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
