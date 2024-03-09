import { Image } from 'p5'
import { Position } from './types'

export class StartTile {
  #img: Image
  #position: Position
  #startDirection: number

  constructor(img: Image, position: Position, startDirection: number) {
    this.#img = img
    this.#position = { ...position }
    this.#startDirection = startDirection
  }

  draw() {
    image(this.#img, this.#position.x, this.#position.y)
  }

  getPosition() {
    return this.#position
  }

  getStartDirection() {
    return this.#startDirection
  }
}
