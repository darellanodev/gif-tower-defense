import { Const } from './Const'
import { ConstDirection } from './ConstDirection'
import { Enemy } from './Enemy'

export class Magic {
  static SPEED = 10

  startX: number
  startY: number
  x: number
  y: number
  #orders: number[]

  #currentDirection: number
  #moveCount: number = 0
  #indexOrder: number = 0
  #touchedEnemiesIds: number[]
  #status: number

  constructor(startX: number, startY: number, orders: number[]) {
    this.startX = startX
    this.startY = startY
    this.#orders = orders

    this.x = this.startX
    this.y = this.startY

    this.#currentDirection = this.#orders[this.#indexOrder]

    this.#touchedEnemiesIds = []
    this.#status = Const.MAGIC_STATUS_ALIVE
  }

  update() {
    switch (this.#currentDirection) {
      case ConstDirection.LEFT:
        this.x = this.x - Magic.SPEED
        break

      case ConstDirection.RIGHT:
        this.x = this.x + Magic.SPEED
        break

      case ConstDirection.UP:
        this.y = this.y - Magic.SPEED
        break

      case ConstDirection.DOWN:
        this.y = this.y + Magic.SPEED
        break
    }

    this.#moveCount = this.#moveCount + Magic.SPEED

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
    if (enemy.dead || enemy.winner) {
      return false
    }

    const found = this.#touchedEnemiesIds.find((id) => id === enemy.id)
    if (found !== undefined) {
      return false
    }

    const fireballPos = this.#indexOrder
    const enemyPos = enemy.orderPosition
    const distanceBetween = Math.abs(fireballPos - enemyPos)

    if (fireballPos >= enemyPos && distanceBetween < 1) {
      return true
    }

    return false
  }

  setToIgnoreList(enemy: Enemy) {
    this.#touchedEnemiesIds.push(enemy.id)
  }

  isAlive() {
    return this.#status == Const.MAGIC_STATUS_ALIVE
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }
}
