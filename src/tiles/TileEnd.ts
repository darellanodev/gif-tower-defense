import { Image } from 'p5'
import { Position } from '../utils/types'
import { Tile } from './Tile'
import { P5 } from '../utils/P5'

export class TileEnd extends Tile {
  #img: Image | null

  constructor(img: Image | null, position: Position) {
    super(position)
    this.#img = img
    this.position = { ...position }
  }

  draw() {
    if (this.#img) {
      P5.p5.image(this.#img, this.position.x, this.position.y)
    }
  }
}
