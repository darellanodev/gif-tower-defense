import { TILE_SIZE } from '../../constants/tile'
import { DIRECTION } from '../../constants/direction'
import { Position } from '../../types/position'
import { JumpStep } from '../../types/jumpStep'
import { ENEMY_JUMP_SPEED } from '../../constants/enemy'

export class PathMovement {
  #position: Position
  #orders: number[]
  #currentDirection: number
  #indexOrder: number = 0
  #baseSpeed: number
  #speedFactors: number[]
  #jumps: (JumpStep | null)[]
  #moveCount: number = 0
  #isAlive: boolean
  #startPosition: Position

  constructor(
    position: Position,
    orders: number[],
    speed: number,
    speedFactors: number[] = [],
    jumps: (JumpStep | null)[] = [],
  ) {
    this.#startPosition = { ...position }
    this.#position = { ...position }
    this.#orders = orders

    this.#currentDirection = this.#orders[this.#indexOrder]
    this.#baseSpeed = speed
    this.#speedFactors = speedFactors
    this.#jumps = jumps
    this.#isAlive = true
  }

  get position() {
    return this.#position
  }

  get #currentJump(): JumpStep | null {
    return this.#jumps[this.#indexOrder] ?? null
  }

  get isJumping() {
    return this.#currentJump !== null
  }

  // number of tiles of the jump in progress (0 when it is not jumping)
  get jumpDistance() {
    return this.#currentJump?.length ?? 0
  }

  // how much of the jump is done, from 0 to 1 (null when it is not jumping)
  get jumpProgress(): number | null {
    const jump = this.#currentJump
    if (jump === null) {
      return null
    }
    return (jump.step + this.#moveCount / TILE_SIZE) / jump.length
  }

  // While it jumps the speed is fixed. Otherwise the speed factor of the current order multiplies the base
  // speed (1 when there is no factor)
  get currentSpeed() {
    if (this.isJumping) {
      return ENEMY_JUMP_SPEED
    }
    return this.#baseSpeed * (this.#speedFactors[this.#indexOrder] ?? 1)
  }

  #updatePosition() {
    switch (this.#currentDirection) {
      case DIRECTION.LEFT:
        this.#position.x = this.#position.x - this.currentSpeed
        break

      case DIRECTION.RIGHT:
        this.#position.x = this.#position.x + this.currentSpeed
        break

      case DIRECTION.UP:
        this.#position.y = this.#position.y - this.currentSpeed
        break

      case DIRECTION.DOWN:
        this.#position.y = this.#position.y + this.currentSpeed
        break
    }
  }

  #updateMoveCount() {
    this.#moveCount = this.#moveCount + this.currentSpeed
  }

  #updateOrders() {
    if (this.#moveCount !== TILE_SIZE) {
      return
    }
    this.#moveCount = 0
    if (this.endReached) {
      this.#reachTheEndTile()
      return
    }
    this.#indexOrder++
    this.#currentDirection = this.nextOrderDirection
  }

  update() {
    this.#updatePosition()
    this.#updateMoveCount()
    this.#updateOrders()
  }

  get nextOrderDirection() {
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

  get moveCount() {
    return this.#moveCount
  }

  get currentDirection() {
    return this.#currentDirection
  }

  set moveCount(value: number) {
    this.#moveCount = value
  }

  #reachTheEndTile() {
    this.#indexOrder++
    this.#isAlive = false
  }

  reInit() {
    this.#moveCount = 0
    this.#indexOrder = 0
    this.#currentDirection = this.#orders[this.#indexOrder]
    this.#position = { ...this.#startPosition }
    this.#isAlive = true
  }
}
