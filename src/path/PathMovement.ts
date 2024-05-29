import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'
import { Position } from '../types/position'

export class PathMovement {
  #position: Position
  #orders: number[]
  #currentDirection: number
  #indexOrder: number = 0
  #speed: number
  #moveCount: number = 0
  #isAlive: boolean

  constructor(position: Position, orders: number[], speed: number) {
    this.#position = { ...position }
    this.#orders = orders

    this.#currentDirection = this.#orders[this.#indexOrder]
    this.#speed = speed
    this.#isAlive = true
  }

  get position() {
    return this.#position
  }

  #updatePosition() {
    switch (this.#currentDirection) {
      case ConstDirection.LEFT:
        this.#position.x = this.#position.x - this.#speed
        break

      case ConstDirection.RIGHT:
        this.#position.x = this.#position.x + this.#speed
        break

      case ConstDirection.UP:
        this.#position.y = this.#position.y - this.#speed
        break

      case ConstDirection.DOWN:
        this.#position.y = this.#position.y + this.#speed
        break
    }
  }

  #updateMoveCount() {
    this.#moveCount = this.#moveCount + this.#speed
  }

  #updateOrders() {
    if (this.#moveCount === Const.TILE_SIZE) {
      this.#moveCount = 0
      if (this.endReached) {
        this.#reachTheEndTile()
      } else {
        this.#currentDirection = this.nextOrderDirection
      }
    }
  }

  update() {
    this.#updatePosition()
    this.#updateMoveCount()
    this.#updateOrders()
  }

  get nextOrderDirection() {
    this.#indexOrder++
    return this.#orders[this.#indexOrder]
  }

  get indexOrder() {
    return this.#indexOrder
  }

  get endReached() {
    return this.#indexOrder == this.#orders.length
  }

  get isAlive() {
    return this.#isAlive
  }

  #reachTheEndTile() {
    this.#indexOrder++
    this.#isAlive = false
  }
}
