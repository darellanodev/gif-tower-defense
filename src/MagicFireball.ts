import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Const } from './Const'
import { ConstDirection } from './ConstDirection'

export class MagicFireball {
  static SPEED = 10
  static FIREBALLS = 3
  static DAMAGE = 500

  #img: Image
  #startX: number
  #startY: number
  #orders: number[]

  #x: number
  #y: number
  #currentDirection: number
  #moveCount: number = 0
  #indexOrder: number = 0
  #touchedEnemiesIds: number[]
  #status: number

  constructor(img: Image, startX: number, startY: number, orders: number[]) {
    this.#img = img
    this.#startX = startX
    this.#startY = startY
    this.#orders = orders

    this.#x = this.#startX
    this.#y = this.#startY

    this.#currentDirection = this.#orders[this.#indexOrder]

    this.#touchedEnemiesIds = []
    this.#status = Const.MAGIC_STATUS_ALIVE
  }

  update() {
    switch (this.#currentDirection) {
      case ConstDirection.LEFT:
        this.#x = this.#x - MagicFireball.SPEED
        break

      case ConstDirection.RIGHT:
        this.#x = this.#x + MagicFireball.SPEED
        break

      case ConstDirection.UP:
        this.#y = this.#y - MagicFireball.SPEED
        break

      case ConstDirection.DOWN:
        this.#y = this.#y + MagicFireball.SPEED
        break
    }

    this.#moveCount = this.#moveCount + MagicFireball.SPEED

    if (this.#moveCount === Const.TILE_SIZE) {
      this.#moveCount = 0
      this.#indexOrder++
      if (this.#indexOrder == this.#orders.length) {
        // reach the end tile
        this.#status = Const.MAGIC_STATUS_DEAD
      } else {
        this.#currentDirection = this.#orders[this.#indexOrder]
      }
    }
  }

  checkCollision(enemy: Enemy) {
    if (enemy.isDead() || enemy.isWinner()) {
      return false
    }

    const found = this.#touchedEnemiesIds.find((id) => id === enemy.id)
    if (found !== undefined) {
      return false
    }

    const fireballPos = this.#indexOrder
    const enemyPos = enemy.getOrderPosition()
    const distanceBetween = Math.abs(fireballPos - enemyPos)

    if (fireballPos >= enemyPos && distanceBetween < 1) {
      return true
    }

    return false
  }

  setToIgnoreList(enemy: Enemy) {
    this.#touchedEnemiesIds.push(enemy.id)
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(MagicFireball.DAMAGE)
  }

  isAlive() {
    return this.#status == Const.MAGIC_STATUS_ALIVE
  }

  getX() {
    return this.#x
  }

  getY() {
    return this.#y
  }

  draw() {
    image(this.#img, this.#x, this.#y)
  }
}
