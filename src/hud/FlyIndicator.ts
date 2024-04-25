import { P5 } from '../utils/P5'
import { Position } from '../utils/types'

export class FlyIndicator {
  static MAX_TIME_ALIVE: number = 100
  static MOVE_INCREMENT: number = 1

  #position: Position
  #isActive: boolean = true
  #aliveTime: number = 0
  #text: string = ''
  constructor(position: Position, text: string) {
    this.#position = { ...position }
    this.#text = text
  }

  get isActive() {
    return this.#isActive
  }

  get position(): Position {
    return this.#position
  }

  draw() {
    P5.p5.text(this.#text, this.#position.x, this.#position.y)
  }

  update() {
    this.#aliveTime++
    if (this.#aliveTime > FlyIndicator.MAX_TIME_ALIVE) {
      this.#isActive = false
    } else {
      const newY = this.#position.y - FlyIndicator.MOVE_INCREMENT
      this.#position = { x: this.#position.x, y: newY }
    }
  }
}
