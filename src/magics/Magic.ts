import { Obj } from '../Obj'
import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'
import { Enemy } from '../enemies/Enemy'
import { Position } from '../utils/types'

export class Magic extends Obj {
  static SPEED = 10

  startPosition: Position
  #orders: number[]

  #currentDirection: number
  #moveCount: number = 0
  #indexOrder: number = 0
  #touchedEnemiesIds: number[]
  #status: number

  constructor(startPosition: Position, orders: number[]) {
    super(startPosition)
    this.startPosition = { ...startPosition }
    this.#orders = orders

    this.#currentDirection = this.#orders[this.#indexOrder]

    this.#touchedEnemiesIds = []
    this.#status = Const.MAGIC_STATUS_ALIVE
  }

  _updatePosition() {
    switch (this.#currentDirection) {
      case ConstDirection.LEFT:
        this.position.x = this.position.x - Magic.SPEED
        break

      case ConstDirection.RIGHT:
        this.position.x = this.position.x + Magic.SPEED
        break

      case ConstDirection.UP:
        this.position.y = this.position.y - Magic.SPEED
        break

      case ConstDirection.DOWN:
        this.position.y = this.position.y + Magic.SPEED
        break
    }
  }

  _updateMoveCount() {
    this.#moveCount = this.#moveCount + Magic.SPEED
  }

  _updateOrders() {
    if (this.#moveCount === Const.TILE_SIZE) {
      this.#moveCount = 0
      if (this.endReached) {
        this._reachTheEndTile()
      } else {
        this.#currentDirection = this.nextOrderDirection
      }
    }
  }

  get nextOrderDirection() {
    this.#indexOrder++
    return this.#orders[this.#indexOrder]
  }

  get endReached() {
    return this.#indexOrder == this.#orders.length
  }

  _reachTheEndTile() {
    this.#indexOrder++
    this.#status = Const.MAGIC_STATUS_DEAD
  }

  update() {
    this._updatePosition()
    this._updateMoveCount()
    this._updateOrders()
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
}
