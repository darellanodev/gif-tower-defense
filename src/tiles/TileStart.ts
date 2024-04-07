import { Image } from 'p5'
import { Position } from '../utils/types'
import { Tile } from './Tile'
import { P5 } from '../utils/P5'

export class TileStart extends Tile {
  #img: Image | null
  #startDirection: number

  constructor(img: Image | null, position: Position, startDirection: number) {
    super(position)
    this.#img = img
    this.#startDirection = startDirection
  }

  draw() {
    if (this.#img) {
      P5.p5.image(this.#img, this.position.x, this.position.y)
    }
  }

  getStartDirection() {
    return this.#startDirection
  }
}
