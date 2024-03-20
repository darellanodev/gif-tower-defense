import { Image } from 'p5'
import { Position } from './types'
import { Tile } from './Tile'

export class TileStart extends Tile {
  #img: Image
  #startDirection: number

  constructor(img: Image, position: Position, startDirection: number) {
    super(position)
    this.#img = img
    this.#startDirection = startDirection
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }

  getStartDirection() {
    return this.#startDirection
  }
}
