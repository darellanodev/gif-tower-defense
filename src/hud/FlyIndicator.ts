import { Position } from '../utils/types'

export class FlyIndicator {
  static MAX_TIME_ALIVE: number = 100

  #initialPosition: Position
  #isActive: boolean = true
  #aliveTime: number = 0
  constructor(position: Position) {
    this.#initialPosition = { ...position }
  }

  get isActive() {
    return this.#isActive
  }

  update() {
    this.#aliveTime++
    if (this.#aliveTime > FlyIndicator.MAX_TIME_ALIVE) {
      this.#isActive = false
    }
  }
}
