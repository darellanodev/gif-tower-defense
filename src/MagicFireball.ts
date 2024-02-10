import { ConstType } from './types'
import { Image } from 'p5'
import { Enemy } from './Enemy'

export class MagicFireball {
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
  touchedEnemiesIds: number[]
  status: number

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

    this.touchedEnemiesIds = []
    this.status = this.Const.MAGIC_STATUS_ALIVE
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
        this.status = this.Const.MAGIC_STATUS_DEAD
      } else {
        this.currentDirection = this.orders[this.indexOrder]
      }
    }
  }

  checkCollision(enemy: Enemy) {
    if (enemy.isDead() || enemy.isWinner()) {
      return false
    }

    const found = this.touchedEnemiesIds.find((id) => id === enemy.id)
    if (found !== undefined) {
      return false
    }

    const fireballPos = this.indexOrder
    const enemyPos = enemy.getOrderPosition()
    const distanceBetween = Math.abs(fireballPos - enemyPos)

    if (fireballPos >= enemyPos && distanceBetween < 1) {
      return true
    }

    return false
  }

  setToIgnoreList(enemy: Enemy) {
    this.touchedEnemiesIds.push(enemy.id)
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(this.Const.MAGIC_FIREBALL_DAMAGE)
  }

  isAlive() {
    return this.status == this.Const.MAGIC_STATUS_ALIVE
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
