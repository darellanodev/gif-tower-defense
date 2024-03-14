import { Image } from 'p5'
import { Position } from './types'
import { Tile } from './Tile'

export class TileEnd extends Tile {
  #img: Image

  constructor(img: Image, position: Position) {
    super(position)
    this.#img = img
    this.position = { ...position }
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }
}
